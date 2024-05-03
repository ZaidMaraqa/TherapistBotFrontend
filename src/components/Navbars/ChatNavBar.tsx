import { Flex, IconButton, Select, Text, Tooltip } from "@chakra-ui/react";
import { IoHappyOutline } from "react-icons/io5";
import { RiChatNewLine } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import RecordVoiceOverOutlinedIcon from "@mui/icons-material/RecordVoiceOverOutlined";
import { useLocale, useTranslations } from "next-intl";
import { ChangeEvent, use, useTransition } from "react";

interface ChatNavBarProps {
  onMoodClick: () => void;
}

const ChatNavBar: React.FC<ChatNavBarProps> = ({
  onMoodClick,
}) => {
  const [isPending, startTransition] = useTransition();
  const localeActive = useLocale();
  const t = useTranslations("Nav");
  const router = useRouter();

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      window.location.pathname =
        `/${nextLocale}` + window.location.pathname.substr(3);
    });
  };

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      top={0}
      zIndex={2}
      left={0}
      right={0}
      position="sticky"
      p={"1rem"}
    >
      <Text
        fontSize={"2.5rem"}
        fontWeight={"bold"}
        padding={"1.0625rem"}
        py={"0rem"}
        color={"#231E5B"}
      >
        Echo
      </Text>
      <Flex alignItems={"center"} gap={"1rem"}>
        <Select
          defaultValue={localeActive}
          onChange={onSelectChange}
          w={"fit-content"}
        >
          <option value="en">English</option>
          <option value="ar">عربي</option>
        </Select>
        <Tooltip label={t('speak')}>
          <IconButton
            bg={"none"}
            fontSize={"1.875rem"}
            _hover={{ bg: "none" }}
            color={"primary"}
            aria-label="Talk to Echo"
            icon={<RecordVoiceOverOutlinedIcon />}
            onClick={() => router.push("/speak")}
          />
        </Tooltip>
        {/* <Tooltip label="New Chat">
          <IconButton
            bg={"none"}
            fontSize={"1.6rem"}
            _hover={{ bg: "none" }}
            color={"primary"}
            aria-label="Mood Tracker"
            icon={<RiChatNewLine />}
          />
        </Tooltip> */}
        <Tooltip label={t('mood')}>
          <IconButton
            bg={"none"}
            fontSize={"1.7rem"}
            _hover={{ bg: "none" }}
            onClick={onMoodClick}
            color={"primary"}
            aria-label="Mood Tracker"
            icon={<IoHappyOutline />}
          />
        </Tooltip>
        <Tooltip label={t('exit')}>
          <IconButton
            bg={"none"}
            fontSize={"1.7rem"}
            _hover={{ bg: "none" }}
            color={"primary"}
            aria-label="Mood Tracker"
            onClick={() => router.push("/en")}
            icon={<IoLogOutOutline />}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default ChatNavBar;
