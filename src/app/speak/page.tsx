"use client";
import AuthContext from "@/context/auth";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
  keyframes,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import SpeakNav from "@/components/Navbars/speakNav";

const SpeakPage = () => {
  const { user } = useContext(AuthContext);
  const [isRecording, setIsRecording] = useState(false);
  const [ws, setWs] = useState<WebSocket | null>(null);


  const breatheAnimation = keyframes`
  from {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
  }
  to {
    box-shadow: 0 0 20px 20px rgba(0, 0, 0, 0);
  }
`;

  useEffect(() => {
    const websocket = new WebSocket("ws://localhost:8000/speech_bot");

    websocket.onopen = () => {
        if (user && user.uuid) {
          websocket.send(JSON.stringify({ uuid: user.uuid }));
        }
      console.log("Connected to the server");
    };

    websocket.onmessage = (event) => {
      console.log("Received:", event.data);
    };

    websocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    websocket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, [user]);

  const fadeIn = keyframes`
    0% { opacity: 0; transform: scale(0.8);}
    100% { opacity: 1; transform: scale(1);}
  `;

  const stopRecording = () => {
    setIsRecording(false);
  };

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        setIsRecording(true);

        mediaRecorder.ondataavailable = (e) => {
          ws?.send(e.data);
        };

        mediaRecorder.onstop = () => {
          setIsRecording(false);
          stream.getTracks().forEach((track) => track.stop());
        };
      })
      .catch((err) => {
        console.error("Error accessing the microphone:", err);
      });
  };

  return (
    <Flex
      direction={"column"}
      w={"100vw"}
      bgGradient="linear(to-b, #231e5b, white)"
      h={"100vh"}
    >
      <SpeakNav />
      <Flex
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        flex={1}
      >
        <VStack justifyContent={"center"} spacing={"1.25rem"}>
          <Text color="white" textAlign={"center"}>
            For a better speech-to-speech experience, please wear headphones.
          </Text>
          <Button
            w={"12rem"}
            bgGradient="linear(to-r, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('/speak.png')"
            h={"12rem"}
            backgroundSize="cover"
            borderRadius="full"
            boxShadow={isRecording ? "0 0 8px 2px red" : "none"}
            onClick={isRecording ? stopRecording : startRecording}
            mb={"0.5rem"}
            animation={`${breatheAnimation} 1.5s ease-in-out infinite alternate`}
            zIndex={2}
            _hover={{
                bgGradient: "linear(to-r, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('/speak.png')"
              }}          >
            {/* {isRecording ? "Stop" : "Start"} */}
          </Button>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default SpeakPage;
