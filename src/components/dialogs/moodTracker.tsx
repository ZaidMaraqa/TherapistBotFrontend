import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    Flex,
    Image,
    useDisclosure,
    Button,
    Input,
    VStack,
} from '@chakra-ui/react'
import React from "react";
import { ASSETS } from "@/app/[locale]/assets";

interface MoodTrackerProps {
    open: boolean;
    onClose: () => void;
}

export default function MoodTracker({ open, onClose: handleClose }: MoodTrackerProps) {
    const navigateToHelpline = () => {
        console.log('woo')
        
    };


    return (
        <Modal isOpen={open} onClose={handleClose} isCentered>
            <ModalOverlay />
            <ModalContent bg={'white'} maxW={'30%'}>
                <ModalHeader as={Flex} justifyContent={'center'} fontSize={'1.5625rem'}>Mood Tracker</ModalHeader>
                <ModalBody>
                    <VStack justifyContent={'center'} spacing={'1rem'}>
                        <Image src={ASSETS.moodgif} alt="mood" />
                        <Input 
                            variant='outline' 
                            borderColor={'primary'} 
                            placeholder='Ex: I feel happy right now' 
                            _placeholder={{ color: 'gray' }}
                            _hover={{ borderColor: 'primary' }}
                        />
                        <Button w={'100%'} colorScheme='primary' color={'white'} onClick={handleClose} mb={'0.5rem'}>Add My Mood</Button>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
