import { useState, useEffect } from "react";
import { VStack, Text, Button, HStack, Heading, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import useToastNotification from "../toast";
import { useTranslations } from "next-intl";

interface Question {
    text: string;
    options: any;
}

interface Props {
    question: any;
    onNext: (selectedOptions: string[]) => void;
    onPrevious: (selectedOptions: string[]) => void;
    onFinish: (selectedOptions: string[]) => void;
    isLast: boolean;
    questionNumber: number;
    totalQuestions: number;
    selectedOptions: string[];
    isSubmitting: boolean;
}

export default function Questionnaire({
    question,
    onNext,
    onPrevious,
    isLast,
    questionNumber,
    totalQuestions,
    selectedOptions,
    onFinish,
    isSubmitting,
}: Props) {
    const [selectedOptionsState, setSelectedOptionsState] = useState<string[]>([]);
    const showToast = useToastNotification();
    const t = useTranslations('onboarding');

    console.log(question);

    



    useEffect(() => {
        setSelectedOptionsState(selectedOptions);
    }, [selectedOptions]);

    const handleOptionClick = (option: string) => {
        setSelectedOptionsState(prevOptions => {
            if (prevOptions.includes(option)) {
                return prevOptions.filter(opt => opt !== option);
            } else {
                return [...prevOptions, option];
            }
        });
    };

    const handleNextClick = () => {
        if (isLast) {
            onFinish(selectedOptionsState);
        } else {
            if (selectedOptionsState.length > 0) {
                onNext(selectedOptionsState);
            } else {
                showToast({
                    title: "You Must At least choose One Option",
                    status: "error",
                });
            }
        }
    };

    const handlePreviousClick = () => {
        onPrevious(selectedOptionsState);
    };

    return (
        <VStack align="center" spacing={7} p={6}>
            <Text fontSize="lg">
                {t('question')} {questionNumber} {t('of')} {totalQuestions}
            </Text>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <VStack spacing={4}>
                    <Heading textAlign="center" as='h4' fontSize={'2rem'} fontWeight="bold" color="primary">
                        {question.text}
                    </Heading>
                    <Text textAlign="center" fontWeight="bold" color="primary" fontSize={'0.9rem'}>
                        {t('select')}
                    </Text>
                </VStack>
                <VStack mt={10} spacing={5} width="100%">
                    <Box width="40%" textAlign="center">
                        {question.options.map((option: any, index: any) => (
                            <Button
                                key={index}
                                onClick={() => handleOptionClick(option)}
                                bg={selectedOptionsState.includes(option) ? 'primary' : 'transparent'}
                                color={selectedOptionsState.includes(option) ? 'white' : 'primary'}
                                _hover={{
                                    color: 'white',
                                    bg: "primary"
                                }}
                                width="100%"
                                borderRadius="full"
                                border=".0625rem solid #231E5B"
                                padding={'1.5rem'}
                                mb={4}
                            >
                                {option}
                            </Button>
                        ))}
                    </Box>
                </VStack>
            </motion.div>
            <HStack mt={4} justifyContent={'space-between'} width={'80%'}>
                <Button
                    onClick={handlePreviousClick}
                    disabled={questionNumber === 1}
                    border={'.0625rem solid #231E5B'}
                    _hover={{
                        color: 'white',
                        bg: "primary"
                    }}
                    bg={'transparent'}
                    color={'primary'}
                    borderRadius={'full'}
                    px={'2rem'}
                    py={'1.5rem'}
                >
                    {t('previous')}
                </Button>
                <Button
                    onClick={handleNextClick}
                    disabled={selectedOptionsState.length === 0}
                    border={'.0625rem solid #231E5B'}
                    _hover={{
                        color: 'white',
                        bg: "primary"
                    }}
                    bg={'transparent'}
                    color={'primary'}
                    borderRadius={'full'}
                    px={'2rem'}
                    py={'1.5rem'}
                    isLoading={isSubmitting}
                >
                    {isLast ? t("finish") : t('next')}
                </Button>
            </HStack>
        </VStack>
    );
}
