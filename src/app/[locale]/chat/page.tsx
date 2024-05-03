"use client";
import ChatInput from "@/components/ChatInput";
import ChatNavBar from "@/components/Navbars/ChatNavBar";
import {
  Box,
  Center,
  Flex,
  Grid,
  HStack,
  Image,
  Spinner,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import config from "@/config";
import { ASSETS } from "@/app/[locale]/assets";
import withAuth from "@/components/PrivateRoute";
import AuthContext from "@/context/auth";
import MoodTracker from "@/components/dialogs/moodTracker";
import useToastNotification from "@/components/toast";
import CrisisSupport from "@/components/dialogs/crisisSupport";
import { useTranslations } from "next-intl";

interface Message {
  sender: "user" | "bot";
  content: string;
}

const ChatPage = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [mood, setMood] = useState<string>("");
  const t = useTranslations("Chat");
  const [ws, setWs] = useState<WebSocket | null>(null);
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToastNotification();
  const {
    isOpen: isCrisisSupportOpen,
    onOpen: onOpenCrisisSupport,
    onClose: onCloseCrisisSupport,
  } = useDisclosure();
  const {
    isOpen: isMoodModalOpen,
    onOpen: onOpenMoodModal,
    onClose: onCloseMoodModal,
  } = useDisclosure();

  const getBackgroundColor = () => {
    switch (mood) {
      case "happy":
        return "#7ABA78";
      case "sad":
        return "#FEEFAD"; 
      default:
        return "#f0f0f7"; // Default background color
    }
  };





  

  const handleIncomingMessage = (data: any) => {
    const newMessage: Message = {
      sender: "bot",
      content: data.response,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    if (data.self_harm_flag === "True") {
      onOpenCrisisSupport();
    }

    if (data.mood) {
      const normalizedMood = data.mood.toLowerCase(); // Normalize the mood to lowercase
      setMood(normalizedMood);
    }
  };


  useEffect(() => {
    let active = true;
    const webSocket = new WebSocket(config.wsUrl);

    webSocket.onopen = () => {
      console.log("WebSocket Opened");
      if (user && user.uuid) {
        webSocket.send(JSON.stringify({ uuid: user.uuid }));
      }
    };

    webSocket.onmessage = (event) => {
      setIsLoading(false);
      const data = JSON.parse(event.data);
      console.log("WebSocket Message", data);
      if (active) {
        handleIncomingMessage(data);
      }
    };

    webSocket.onerror = (error) => {
      console.log("WebSocket Error", error);
      webSocket.close();
    };

    setWs(webSocket);

    return () => {
      active = false;
      webSocket.close();
      console.log("WebSocket Closed");
    };
  }, []);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    const newUserMessage: Message = {
      sender: "user",
      content: inputValue,
    };
    setMessages([...messages, newUserMessage]);

    ws?.send(JSON.stringify({ u_message: inputValue }));

    setInputValue("");
    setIsLoading(true);
  };

  let suggestedMessages = [];
  try {
    suggestedMessages = JSON.parse(t("suggestedMessages"));
  } catch (error) {
    console.error("Failed to parse suggestedMessages:", error);
  }

  return (
    <Flex direction={"column"} w={"100vw"} h={"100vh"}>
      <ChatNavBar onMoodClick={onOpenMoodModal} />
      <>
        <MoodTracker open={isMoodModalOpen} onClose={onCloseMoodModal} />
        <CrisisSupport
          open={isCrisisSupportOpen}
          onClose={onCloseCrisisSupport}
        />
        <Flex flex="1" px={4} overflowY="auto" direction="column" gap={3}>
          <VStack spacing={4} align="stretch">
            {messages.map((message, index) => (
              <Flex
                key={index}
                borderColor={"white"}
                alignSelf={"flex-start"}
                w={"100%"}
                justifyContent={
                  message.sender === "user" ? "flex-end" : "flex-start"
                }
              >
                <HStack spacing={1.5}>
                  {message.sender === "bot" && (
                    <Box alignSelf="flex-end" minW="2.5rem" minH="2.5rem">
                      <Image
                        src={ASSETS.icons.bot}
                        w={"2.5rem"}
                        h={"2.5rem"}
                        borderRadius={"50%"}
                        alt="Atom"
                      />
                    </Box>
                  )}
                  <Box
                    fontSize={"1rem"}
                      bg={message.sender === "user" ? "primary" : "#f0f0f7"}
                    color={message.sender === "user" ? "white" : "black"}
                    p={3}
                    _hover={{ cursor: "pointer" }}
                    borderRadius="1.25rem"
                  >
                    <Text>{message.content}</Text>
                  </Box>
                </HStack>
              </Flex>
            ))}
            {isLoading && (
              <Box alignSelf="flex-start" w="50%">
                <HStack spacing={1.5}>
                  <Box alignSelf="flex-end" minW="2.5rem" minH="2.5rem">
                    <Image
                      src={ASSETS.icons.bot}
                      w={"2.5rem"}
                      h={"2.5rem"}
                      borderRadius={"50%"}
                      alt="Atom"
                    />
                  </Box>
                  <Box
                    fontSize={"1rem"}
                    bg="#f0f0f7"
                    color={"black"}
                    p={3}
                    borderRadius="1.25rem"
                  >
                    <Spinner color="black" />
                  </Box>
                </HStack>
              </Box>
            )}
          </VStack>
          {messages.length === 0 && (
            <Flex direction={"column"} h={"100%"} px={4} py={0}>
              <Center mb={4} flex={1}>
                <Text
                  fontSize={["1rem", "1rem", "1rem", "2xl"]}
                  fontWeight={300}
                >
                  {t("How")}
                </Text>
              </Center>
              <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                {suggestedMessages.map((message: string, index: number) => (
                  <Box
                    key={index}
                    p={4}
                    bg="transparent"
                    border={".125rem solid"}
                    borderColor={"primary"}
                    h={"4rem"}
                    borderRadius="1.25rem"
                    _hover={{ bg: "#e2e2e9", cursor: "pointer" }}
                    onClick={() => setInputValue(message)}
                    justifyContent="center"
                    display={"flex"}
                    alignItems={"center"}
                    fontSize={["0.6rem", "1rem", "1rem", "1rem"]}
                  >
                    <Text>{message}</Text>
                  </Box>
                ))}
              </Grid>
            </Flex>
          )}
        </Flex>
        <Flex px={4}>
          <ChatInput
            inputValue={inputValue}
            setInputValue={handleInputChange}
            handleKeyDown={handleKeyDown}
            sendMessage={sendMessage}
            placeholder={t("thought")}
          />
        </Flex>
      </>
    </Flex>
  );
};

export default withAuth(ChatPage);
