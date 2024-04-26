import { VStack, Text, Heading, Button, Box, HStack } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import AuthContext from "@/context/auth";

interface WelcomeSectionProps {
    onStart: () => void; 
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ onStart }) => { 
    const [show, setShow] = useState(false);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        setTimeout(() => {
            setShow(true);
        }, 100);
    }, []);

    return (
        <HStack h={'70%'} justifyContent={'center'} alignItems={'center'} spacing={6}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            >
                <VStack justifyContent={'center'} alignItems={'center'} spacing={6}>
                    <Heading as='h1' size='xl' noOfLines={1} color={'#231e5b'}>Welcome to Echo, {user?.first_name}</Heading>
                    <Box textAlign={'center'} maxW={'37.5rem'}>
                        <Text fontSize='lg'>
                            It's great to have you! Let's personalize your support journey with a
                            few quick questions.
                        </Text>
                    </Box>
                    <Button bg='#231e5b' color={'white'} borderRadius={'full'} size='lg' onClick={onStart}>
                        Start your Journey
                    </Button>
                </VStack>
            </motion.div>
        </HStack>
    );
}

export default WelcomeSection;
