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
  Input,
  InputGroup,
  Spinner,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import config from "@/config";
import { ASSETS } from "@/assets";
import withAuth from "@/components/PrivateRoute";
import AuthContext from "@/context/auth";
import MoodTracker from "@/components/dialogs/moodTracker";

interface Message {
  sender: "user" | "bot";
  content: string;
}

const ChatPage = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const { user } = useContext(AuthContext);
  console.log(user);
  const [isOpen, setIsOpen] = useState(true);
  const [streamingMessage, setStreamingMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    isOpen: isCrisisModalOpen,
    onOpen: onOpenCrisisModal,
    onClose: onCloseCrisisModal,
  } = useDisclosure();
  const {
    isOpen: isMoodModalOpen,
    onOpen: onOpenMoodModal,
    onClose: onCloseMoodModal,
  } = useDisclosure();
  const router = useRouter();
  let ongoingMessageAccumulator = "";
  const [suggestedMessages, setSuggestedMessage] = useState([
    "I've been feeling really overwhelmed lately and don't know what to do.",
    "I'm trying to be more positive but find it challenging",
    "What can I expect from these therapy sessions?",
    "I feel like I need help but don't know where to start",
  ]);



  const handleIncomingMessage = (data: any) => {
    switch (data.message_type) {
      case "start":
        setIsLoading(true);
        ongoingMessageAccumulator = "";
        setStreamingMessage("");
        break;
      case "stream":
        setIsLoading(false);
        ongoingMessageAccumulator += data.message;
        setStreamingMessage(ongoingMessageAccumulator);
        break;
      case "end":
        const newMessage: Message = {
          sender: "bot",
          content: ongoingMessageAccumulator,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setStreamingMessage("");
        break;
      default:
        console.log("Unknown message type");
    }
  };

  useEffect(() => {
    let active = true;

    const connectWebSocket = () => {
      const webSocket = new WebSocket(config.wsUrl);

      webSocket.onopen = (event) => {
        console.log("WebSocket Open", event);
        if (user && user.uuid) {
          webSocket.send(JSON.stringify({ uuid: user.uuid }));
        }
      };

      webSocket.onmessage = (event) => {
        console.log("WebSocket Message", event);
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

      return webSocket;
    };

    if (isOpen) {
      const ws = connectWebSocket();
      setWs(ws);
    } else {
      ws?.close();
      setWs(null);
    }

    return () => {
      active = false;
      ws?.close();
    };
  }, [isOpen]);

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
  };

  return (
    <Flex direction={"column"} w={"100vw"} h={"100vh"}>
      <ChatNavBar onMoodClick={onOpenMoodModal} /> 
      <MoodTracker open={isMoodModalOpen} onClose={onCloseMoodModal} />

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
          <Flex direction={'column'} h={'100%'} px={4} py={0}>
            <Center mb={4} flex={1}>
              <Text fontSize="2xl" fontWeight={300}>
                How can I help you today?
              </Text>
            </Center>
            <Grid templateColumns="repeat(2, 1fr)" gap={2}>
              {suggestedMessages.map((message, index) => (
                <Box
                  key={index}
                  p={4}
                  bg="transparent"
                  border={'1px solid'}
                  borderColor={'primary'}
                  h={'5rem'}
                  borderRadius="1.25rem"
                  _hover={{ bg: "#e2e2e9", cursor: "pointer" }}
                  onClick={() => setInputValue(message)}
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
        />
      </Flex>
    </Flex>
  );
};

export default withAuth(ChatPage);
