import {
  Flex,
  IconButton,
  Select,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { IoHappyOutline, IoLogOutOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ChangeEvent, startTransition } from "react";
import { TbMessageChatbot } from "react-icons/tb";

interface SpeakNavBarProps {
  onMoodClick: () => void;
}

const SpeakNavBar: React.FC<SpeakNavBarProps> = ({ onMoodClick }) => {
  const localeActive = useLocale();
  const t = useTranslations("SpeakNav");
  const router = useRouter();

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      window.location.pathname =
        `/${nextLocale}` + window.location.pathname.substr(3);
    });
  };

  return (
    <Flex justifyContent={"space-between"} p={4}>
      <Text
        fontSize={"2.5rem"}
        h={"20%"}
        fontWeight={"bold"}
        padding={"1.0625rem"}
        py={"0rem"}
        color={"white"}
      >
        ECHO
      </Text>
      <Flex alignItems={"center"} gap={"1rem"} direction={"row"}>
        <Select
          defaultValue={localeActive}
          onChange={onSelectChange}
          color={'white'}
          w={"fit-content"}
        >
          <option value="en">English</option>
          <option value="ar">عربي</option>
        </Select>
        <Tooltip label={t("mood")}>
          <IconButton
            bg={"none"}
            fontSize={"2.3rem"}
            _hover={{ bg: "none" }}
            onClick={onMoodClick}
            color={"white"}
            aria-label="Mood Tracker"
            icon={<IoHappyOutline />}
          />
        </Tooltip>
        <Tooltip label={t('chat')}>
          <IconButton
            bg={"none"}
            fontSize={"2.2rem"}
            _hover={{ bg: "none" }}
            color={"primary"}
            aria-label="Chat to Echo"
            icon={<TbMessageChatbot color="white"/>}
            onClick={() => router.push("/chat")}
          />
        </Tooltip>
        <Tooltip label={t('exit')}>
          <IconButton
            bg={"none"}
            fontSize={"2.5rem"}
            _hover={{ bg: "none" }}
            color={"white"}
            aria-label="Mood Tracker"
            onClick={() => router.push("/en")}
            icon={<IoLogOutOutline />}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default SpeakNavBar;
