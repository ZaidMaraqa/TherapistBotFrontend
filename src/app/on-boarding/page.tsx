"use client";
import { useContext, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import WelcomeSection from "../../components/onBoarding/welcome";
import ProgressBar from "../../components/onBoarding/progressBar";
import Questionnaire from "../../components/onBoarding/Questionnaire";
import { questions as questionsData } from "../../../public/constants";
import config from "@/config";
import AuthContext from "@/context/auth";
import useToastNotification from "@/components/toast";
import { useRouter } from "next/navigation";


export default function OnBoarding() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { user } = useContext(AuthContext);
  const toast = useToastNotification();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [selectedOptions, setSelectedOptions] = useState(
    Array(questionsData.length).fill([])
  );

  const startJourney = () => setCurrentQuestion(1);

  const goToNextQuestion = (options: string[]) => {
    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = [...prevSelectedOptions];
      newSelectedOptions[currentQuestion - 1] = options;
      return newSelectedOptions;
    });
    setCurrentQuestion((current) => current + 1);
  };

  const goToPreviousQuestion = () => {
    setCurrentQuestion((current) => current - 1);
  };

  const sendToServer = async () => {
    setIsSubmitting(true);
    if (!user) {
        toast({
          title: "Verification Error",
          description: "No user data available for verification.",
          status: "error",
        });
        return;
      }

    const response = await fetch(
      `${config.apiUrl}/update_onboarding_questions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questions: selectedOptions,
          uuid: user.uuid
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setIsSubmitting(false);
        throw new Error(data.message || "Verification failed");
      }else{
        setIsSubmitting(false);
        router.push("/");
      }
  };

  const handleFinish = (options: string[]) => {
    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = [...prevSelectedOptions];
      newSelectedOptions[currentQuestion - 1] = options;
      return newSelectedOptions;
    });
    sendToServer();

  };

  return (
    <>
      <Box>
        <ProgressBar
          currentQuestion={currentQuestion}
          totalQuestions={questionsData.length}
        />
      </Box>
      <Flex alignItems="center" h="80vh" justify="center">
        {currentQuestion === 0 ? (
          <WelcomeSection onStart={startJourney} />
        ) : (
          <Questionnaire
            question={questionsData[currentQuestion - 1]}
            onNext={goToNextQuestion}
            onPrevious={goToPreviousQuestion}
            onFinish={handleFinish}
            isLast={currentQuestion === questionsData.length}
            questionNumber={currentQuestion}
            totalQuestions={questionsData.length}
            selectedOptions={selectedOptions[currentQuestion - 1] || []}
            isSubmitting={isSubmitting}
          />
        )}
      </Flex>
    </>
  );
}
