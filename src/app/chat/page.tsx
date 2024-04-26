"use client";
import ChatInput from "@/components/ChatInput";
import withAuth from "@/components/PrivateRoute";
import ChatNavBar from "@/components/dialogs/Navbars/ChatNavBar";
import { Flex, Input, InputGroup, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

const ChatPage = () => {
  const [inputValue, setInputValue] = useState<string>(""); // State for the input value

  // Function to update the input value
  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  // Function to handle key press event in the input
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (inputValue.trim() !== "") {
      console.log("Sending message:", inputValue); 
      setInputValue(""); 
    }
  };

  return (
    <Flex direction={"column"} w={"100vw"} h={"100vh"}>
      <ChatNavBar />
      <Flex flex="1" p={4} overflowY="auto" direction="column" gap={3}>
        <VStack spacing={4} align="stretch">
          <Text fontSize="lg">Welcome to the chat room!</Text>
          {/* Mock chat messages */}
          <Text bg="gray.100" p={3} borderRadius="lg">
            User: Hello there!
          </Text>
          <Text p={3} borderRadius="lg" alignSelf="flex-end" bg="blue.100">
            You: Hi! How are you?
          </Text>
        </VStack>
      </Flex>
      <Flex p={4}>
        <ChatInput
          inputValue={inputValue}
          setInputValue={handleInputChange}
          handleKeyDown={handleKeyDown}
          sendMessage={sendMessage}
        />{" "}
      </Flex>
    </Flex>
  );
};

export default ChatPage;
