import { Progress } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
    currentQuestion: number;
    totalQuestions: number;
}

export default function ProgressBar({ currentQuestion, totalQuestions }: ProgressBarProps) {
    const progress = (currentQuestion / totalQuestions) * 100;

    return (
        <motion.div 
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }} 
        >
            <Progress value={progress} size='sm' />
        </motion.div>
    );
}
