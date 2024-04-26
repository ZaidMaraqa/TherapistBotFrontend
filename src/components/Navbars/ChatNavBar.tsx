import {
  Button,
  Flex,
  Icon,
  IconButton,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { IoHappyOutline } from "react-icons/io5";
import { RiChatNewLine } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";

export default function ChatNavBar() {
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      top={0}
      zIndex={2}
      left={0}
      right={0}
      position="sticky"
      p={'1rem'}
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
        <Tooltip label="New Chat">
          <IconButton bg={'none'} fontSize={'30px'}  _hover={{ bg: 'none'}}  color={'primary'} aria-label="Mood Tracker" icon={<RiChatNewLine   />} />
        </Tooltip>
        <Tooltip label="Mood?">
          <IconButton bg={'none'} fontSize={'30px'} _hover={{ bg: 'none'}}  color={'primary'} aria-label="Mood Tracker" icon={<IoHappyOutline />} />
        </Tooltip>
        <Tooltip label="Exit Chat">
          <IconButton bg={'none'} fontSize={'30px'} _hover={{ bg: 'none'}} color={'primary'}  aria-label="Mood Tracker" icon={<IoLogOutOutline />} />
        </Tooltip>
      </Flex>
    </Flex>
  );
}
