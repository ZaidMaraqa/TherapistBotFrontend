"use client";
import ChatInput from "@/components/ChatInput";
import ChatNavBar from "@/components/Navbars/ChatNavBar";
import {
  Box,
  Center,
  Flex,
  Grid,
  HStack,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  VStack,
  useDisclosure,
  Slide,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import config from "@/config";
import { ASSETS } from "@/assets";
import withAuth from "@/components/PrivateRoute";
import AuthContext from "@/context/auth";
import MoodTracker from "@/components/dialogs/moodTracker";
import { FaMicrophone } from "react-icons/fa";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import { Button } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import useToastNotification from "@/components/toast";
import CrisisSupport from "@/components/dialogs/crisisSupport";

interface Message {
  sender: "user" | "bot";
  content: string;
}

interface HeadphonesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: () => void;
}

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const HeadphonesModal: React.FC<HeadphonesModalProps> = ({
  isOpen,
  onClose,
  onStart,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <Slide in={isOpen} direction="bottom">
        <ModalContent bg={"white"}>
          <ModalHeader
            as={Flex}
            justifyContent={"center"}
            fontSize={"1.5625rem"}
            color={"primary"}
          >
            Wear Headphones
          </ModalHeader>
          <ModalBody>
            <VStack justifyContent={"center"} spacing={"1.25rem"}>
              <Box
                as={HeadphonesIcon}
                sx={{ fontSize: 128, color: "#231E5B" }}
                animation={`${fadeIn} 0.5s ease-in-out`}
              />
              <Text color="#231E5B" textAlign={"center"}>
                For a better speech-to-speech experience, please wear
                headphones.
              </Text>
              <Button
                w={"100%"}
                colorScheme="primary"
                color={"white"}
                onClick={onStart}
                mb={"0.5rem"}
                bg="#231E5B"
                _hover={{ bg: "#231E5B" }}
              >
                Start
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Slide>
    </Modal>
  );
};

const ChatPage = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const { user } = useContext(AuthContext);
  console.log(user);
  const [isOpen, setIsOpen] = useState(true);
  const [streamingMessage, setStreamingMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRequestingMicPermission, setIsRequestingMicPermission] =
    useState(false);
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
  const router = useRouter();
  let ongoingMessageAccumulator = "";
  const [suggestedMessages, setSuggestedMessage] = useState([
    "I've been feeling really overwhelmed lately and don't know what to do.",
    "I'm trying to be more positive but find it challenging",
    "What can I expect from these therapy sessions?",
    "I feel like I need help but don't know where to start",
  ]);
  const [isSpeechMode, setIsSpeechMode] = useState(false);
  const {
    isOpen: isHeadphonesModalOpen,
    onOpen: onOpenHeadphonesModal,
    onClose: onCloseHeadphonesModal,
  } = useDisclosure();

  const toggleSpeechMode = () => {
    if (!isSpeechMode) {
      onOpenHeadphonesModal();
    } else {
      setIsSpeechMode(false);
    }
  };

  const startSpeechMode = () => {
    setIsSpeechMode(true);
    onCloseHeadphonesModal();
  };

  const handleStartSpeech = () => {
    setIsRequestingMicPermission(true);
    getMicPermission();
  };

  const getMicPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      startSpeechMode();
    } catch (err) {
      toast({
        title: "Permission Error",
        description: "Error getting microphone permission",
        status: "error",
      });
      setIsSpeechMode(false);
    }
  };

  const handleIncomingMessage = (data: any) => {
    const newMessage: Message = {
      sender: "bot",
      content: data.response, // Only displaying the response part
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    if (data.self_harm_flag === "True") {
      onOpenCrisisSupport(); // Trigger crisis support modal if flag is true
    }
  };

  useEffect(() => {
    let active = true;

    const connectWebSocket = () => {
      const webSocket = new WebSocket(config.wsUrl);

      webSocket.onopen = (event) => {
        if (user && user.uuid) {
          webSocket.send(JSON.stringify({ uuid: user.uuid }));
        }
      };

      webSocket.onmessage = (event) => {
        console.log("WebSocket Message", event);
        const data = JSON.parse(event.data);
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
    setIsLoading(true);
  };

  return (
    <Flex direction={"column"} w={"100vw"} h={"100vh"}>
      <ChatNavBar
        onMoodClick={onOpenMoodModal}
        onSpeechClick={toggleSpeechMode}
      />
      {isSpeechMode ? (
        <Flex
          flex="1"
          direction="column"
          align="center"
          justify="center"
          bg="rgba(255, 255, 255, 0.8)"
          backdropFilter="blur(10px)"
        >
          <IconButton
            icon={<FaMicrophone />}
            aria-label="Start Speech"
            size="lg"
            colorScheme="primary"
            color="white"
            isRound
            onClick={handleStartSpeech}
            isLoading={isRequestingMicPermission}
          />
          <Text mt={4} fontSize="xl">
            Click the microphone to start talking with Echo
          </Text>
        </Flex>
      ) : (
        <>
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
              <Flex direction={"column"} h={"100%"} px={4} py={0}>
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
                      border={".125rem solid"}
                      borderColor={"primary"}
                      h={"4rem"}
                      borderRadius="1.25rem"
                      _hover={{ bg: "#e2e2e9", cursor: "pointer" }}
                      onClick={() => setInputValue(message)}
                      justifyContent="center"
                      display={"flex"}
                      alignItems={"center"}
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
        </>
      )}
      <HeadphonesModal
        isOpen={isHeadphonesModalOpen}
        onClose={onCloseHeadphonesModal}
        onStart={startSpeechMode}
      />
    </Flex>
  );
};

export default ChatPage;
