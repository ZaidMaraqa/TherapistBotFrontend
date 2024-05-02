"use client";
import { useContext, useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import WelcomeSection from "../../../components/onBoarding/welcome";
import ProgressBar from "../../../components/onBoarding/progressBar";
import Questionnaire from "../../../components/onBoarding/Questionnaire";
import config from "@/config";
import AuthContext from "@/context/auth";
import useToastNotification from "@/components/toast";
import { useRouter } from "next/navigation";
import withAuth from "@/components/PrivateRoute";
import NavBar from "@/components/Navbars/navBar";
import { useTranslations } from "next-intl";

interface Mapping {
  [key: string]: string[]; // Define the value type based on what selectedOptions contains
}

const OnBoarding = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { user } = useContext(AuthContext);
  const toast = useToastNotification();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const t = useTranslations('onboarding');

  const questions = [
    {
      key: 'question1',
      optionsCount: 4
    },
    {
      key: 'question2',
      optionsCount: 4
    },
    {
      key: 'question3',
      optionsCount: 4
    },
    {
      key: 'question4',
      optionsCount: 4
    },
    {
      key: 'question5',
      optionsCount: 4
    }
  ];

  const questionsData = questions.map(question => ({
    text: t(`${question.key}_text`),
    options: Array.from({ length: question.optionsCount }, (_, i) =>
      t(`${question.key}_option${i + 1}`)
    )
  }));


  const [selectedOptions, setSelectedOptions] = useState(
    Array(questionsData.length).fill([])
  );


  const getQuestionAnswerMapping = () => {
    const mapping: Mapping = {}; 
    questionsData.forEach((question, index) => {
      mapping[question.text] = selectedOptions[index];
    });
  
    console.log(mapping);
    return mapping;
  };






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
    const questionAnswerMapping = getQuestionAnswerMapping();
    localStorage.setItem('onBoardingQuestions', JSON.stringify(questionAnswerMapping));

    try {
        const response = await fetch(`${config.apiUrl}/update_onboarding_questions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                questions: selectedOptions,
                uuid: user?.uuid
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Verification failed");
        }

        router.push("/chat");
    } catch (error) {
        toast({
            title: "Error",
            status: "error",
        });
    } finally {
        setIsSubmitting(false); // Reset the submitting state regardless of the outcome
    }
};


  const handleFinish = (options: string[]) => {
    setIsSubmitting(true); // Indicate that submission is starting

    // Update state
    setSelectedOptions((prevSelectedOptions) => {
        const newSelectedOptions = [...prevSelectedOptions];
        newSelectedOptions[currentQuestion - 1] = options;
        return newSelectedOptions;
    });
};

// useEffect to handle what happens after the state updates
useEffect(() => {
  // Only attempt to send to the server if submitting is true and the user is defined
  if (isSubmitting && user) {
      sendToServer();
  }
}, [isSubmitting, selectedOptions]); // Depend on isSubmitting and selectedOptions


  return (
    <>
      <Box>
        <NavBar />
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

export default withAuth(OnBoarding);