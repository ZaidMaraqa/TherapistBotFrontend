import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    Flex,
    Image,
    Button,
    Text,
    VStack,
} from '@chakra-ui/react'
import React from "react";
import { ASSETS } from "@/app/[locale]/assets";

interface CrisisSupportProps {
    open: boolean;
    onClose: () => void;
}

export default function CrisisSupport({ open, onClose: handleClose }: CrisisSupportProps) {
    const navigateToHelpline = () => {
        window.open("https://findahelpline.com/", "_blank");
    };


    return (
        <Modal isOpen={open} onClose={handleClose} isCentered>
            <ModalOverlay />
            <ModalContent bg={'white'} maxW={'30%'}>
                <ModalHeader as={Flex} justifyContent={'center'} fontSize={'1.5625rem'}>Crisis Detector</ModalHeader>
                <ModalBody>
                    <VStack justifyContent={'center'} spacing={'1.25rem'}>
                        <Image src={ASSETS.crisisgif} alt="love" style={{ height: '9.375rem' }} />
                        <Text>
                            You're not alone, and your feelings matter. This is a difficult moment, but help is available, and things can get better.
                        </Text>
                        <Button w={'100%'} colorScheme='primary' color={'white'} onClick={navigateToHelpline} mb={'0.5rem'}>Call HelpLine</Button>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
