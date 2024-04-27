import {Flex, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { IoLogOutOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";


export default function SpeakNav() {
    const router = useRouter();
    return (
        <Flex justifyContent={'space-between'} p={4}>
            <Text
                fontSize={"2.5rem"}
                h={"20%"}
                fontWeight={"bold"}
                padding={"1.0625rem"}
                py={'0rem'}
                color={"white"}
            >
                ECHO
            </Text>
            <Tooltip label="Exit Speak">
          <IconButton
            bg={"none"}
            fontSize={"2.7rem"}
            _hover={{ bg: "none" }}
            color={"white"}
            aria-label="Mood Tracker"
            onClick={() => router.push("/")}
            icon={<IoLogOutOutline />}
          />
        </Tooltip>

        </Flex>
    );
}