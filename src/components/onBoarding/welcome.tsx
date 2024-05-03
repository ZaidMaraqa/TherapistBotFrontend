import { VStack, Text, Heading, Button, Box, HStack } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import AuthContext from "@/context/auth";
import { useTranslations } from "next-intl";

interface WelcomeSectionProps {
  onStart: () => void;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ onStart }) => {
  const [show, setShow] = useState(false);
  const { user } = useContext(AuthContext);
  const t = useTranslations("Welcome");

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 100);
  }, []);

  return (
    <HStack h="70%" justifyContent="center" alignItems="center" spacing={6}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <VStack justifyContent="center" alignItems="center" spacing={6}>
          <Heading as="h1" size="xl" noOfLines={1} color="#231e5b" textTransform="capitalize">
            {t("title", { name: user?.first_name })}
          </Heading>
          <Box textAlign="center" maxW="37.5rem">
            <Text fontSize="lg">{t("subTitle")}</Text>
          </Box>
          <Button bg="#231e5b" color="white" borderRadius="full" size="lg" onClick={onStart}>
            {t("start")}
          </Button>
        </VStack>
      </motion.div>
    </HStack>
  );
};

export default WelcomeSection;