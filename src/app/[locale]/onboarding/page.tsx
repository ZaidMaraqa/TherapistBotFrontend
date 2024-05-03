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
import FinishOnBoardingSection from "@/components/onBoarding/finishOnboarding";

interface Mapping {
  [key: string]: string[];
}

const OnBoarding = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showFinishSection, setShowFinishSection] = useState(false);
  const { user } = useContext(AuthContext);
  const toast = useToastNotification();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const t = useTranslations("onboarding");

  const questions = [
    {
      key: "question1",
      optionsCount: 4,
    },
    {
      key: "question2",
      optionsCount: 4,
    },
    {
      key: "question3",
      optionsCount: 4,
    },
    {
      key: "question4",
      optionsCount: 4,
    },
    {
      key: "question5",
      optionsCount: 4,
    },
    {
      key: "question6",
      optionsCount: 4,
    },
    {
      key: "question7",
      optionsCount: 4,
    },
    {
      key: "question8",
      optionsCount: 4,
    },
  ];

  const questionsData = questions.map((question) => ({
    text: t(`${question.key}_text`),
    options: Array.from({ length: question.optionsCount }, (_, i) =>
      t(`${question.key}_option${i + 1}`)
    ),
  }));

  const [selectedOptions, setSelectedOptions] = useState(
    Array(questionsData.length).fill([])
  );

  const getQuestionAnswerMapping = () => {
    const mapping: Mapping = {};
    questionsData.forEach((question, index) => {
      mapping[question.text] = selectedOptions[index];
    });
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
    const questionAnswerMapping: Mapping = getQuestionAnswerMapping();

    const questionAnswerArray = Object.entries(questionAnswerMapping);

    const questions1to5: Mapping = questionAnswerArray
      .slice(0, 5)
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {} as Mapping);
    const questions6to8: Mapping = questionAnswerArray
      .slice(5)
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {} as Mapping);

    localStorage.setItem("onBoardingQuestions", JSON.stringify(questions1to5));
    localStorage.setItem("goalsQuestions", JSON.stringify(questions6to8));

    try {
      const questions1to5Response = await fetch(
        `${config.apiUrl}/update_onboarding_questions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            q_and_a: questions1to5,
            uuid: user?.uuid,
          }),
        }
      );

      const questions1to5Data = await questions1to5Response.json();

      if (!questions1to5Response.ok) {
        throw new Error(questions1to5Data.message || "Verification failed");
      }

      const questions6to8Response = await fetch(
        `${config.apiUrl}/update_onboarding_goals`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            goals: questions6to8,
            uuid: user?.uuid,
          }),
        }
      );

      const questions6to8Data = await questions6to8Response.json();

      if (!questions6to8Response.ok) {
        throw new Error(questions6to8Data.message || "Verification failed");
      }

      setShowFinishSection(true);
    } catch (error) {
      toast({
        title: "Error",
        status: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinishOnBoarding = () => {
    router.push("/speak");
  };

  const handleFinish = (options: string[]) => {
    setIsSubmitting(true);

    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = [...prevSelectedOptions];
      newSelectedOptions[currentQuestion - 1] = options;
      return newSelectedOptions;
    });
  };

  useEffect(() => {
    if (isSubmitting && user) {
      sendToServer();
    }
  }, [isSubmitting, selectedOptions]);

  return (
    <>
      <Box>
        <NavBar />
        {!showFinishSection && (
        <ProgressBar
          currentQuestion={currentQuestion}
          totalQuestions={questionsData.length}
        />
      )}
      </Box>
      <Flex alignItems="center" h="80vh" justify="center">
        {showFinishSection ? (
          <FinishOnBoardingSection onStart={handleFinishOnBoarding} />
        ) : currentQuestion === 0 ? (
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
};

export default withAuth(OnBoarding);
