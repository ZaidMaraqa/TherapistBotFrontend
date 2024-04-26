import {Flex, Text } from "@chakra-ui/react";


export default function NavBar() {
    return (
        <Flex>
            <Text
                fontSize={"2.5rem"}
                h={"20%"}
                fontWeight={"bold"}
                padding={"1.0625rem"}
                py={'0rem'}
                color={"#231E5B"}
            >
                ECHO
            </Text>
        </Flex>
    );
}