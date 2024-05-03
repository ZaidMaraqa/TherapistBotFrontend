import { VStack, Text, Heading, Button, Box } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import AuthContext from "@/context/auth";
import { useTranslations } from "next-intl";
import Confetti from "react-confetti";

interface FinishOnBoardingSectionProps {
  onStart: () => void;
}

const FinishOnBoardingSection: React.FC<FinishOnBoardingSectionProps> = ({
  onStart,
}) => {
  const [show, setShow] = useState(false);
  const { user } = useContext(AuthContext);
  const t = useTranslations("FinishOnBoardingMessage");

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <Box position="relative" h="100vh" w="100%" overflow="hidden">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={200}
        recycle={false}
      />
      <VStack
        h="100%"
        justifyContent="center"
        alignItems="center"
        spacing={6}
        zIndex={1}
        position="relative"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0.8 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <VStack
            justifyContent="center"
            alignItems="center"
            spacing={6}
            textAlign="center"
          >
            <Heading
              as="h1"
              size="xl"
              noOfLines={1}
              color="#231e5b"
              textTransform="capitalize"
            >
              {t("title", { name: user?.first_name })}
            </Heading>
            <Box maxW="37.5rem">
              <Text fontSize="lg">{t("subTitle")}</Text>
            </Box>
            <Button
              bg="#231e5b"
              color="white"
              borderRadius="full"
              size="lg"
              onClick={onStart}
              mt={8}
            >
              {t("start")}
            </Button>
          </VStack>
        </motion.div>
      </VStack>
    </Box>
  );
};

export default FinishOnBoardingSection;
