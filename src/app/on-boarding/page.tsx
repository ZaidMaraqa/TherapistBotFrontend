'use client';
import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import WelcomeSection from "../../components/onBoarding/welcome";
import ProgressBar from "../../components/onBoarding/progressBar";
import Questionnaire from "../../components/onBoarding/Questionnaire";
import { questions as questionsData } from "../../../public/constants";

export default function OnBoarding() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
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

    const handleFinish = (options: string[]) => {
        setSelectedOptions((prevSelectedOptions) => {
            const newSelectedOptions = [...prevSelectedOptions];
            newSelectedOptions[currentQuestion - 1] = options;
            return newSelectedOptions;
        });
    };

    return (
        <>
            <Box>
                <ProgressBar currentQuestion={currentQuestion} totalQuestions={questionsData.length} />
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
                    />
                )}
            </Flex>
        </>
    );
}