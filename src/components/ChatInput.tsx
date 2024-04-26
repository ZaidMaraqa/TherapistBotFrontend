import React from 'react';
import { Box, Button, InputGroup, Input, InputRightElement } from '@chakra-ui/react';
import { MdOutlineSend } from "react-icons/md";

interface SearchInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  sendMessage: () => void;
}

const ChatInput: React.FC<SearchInputProps> = ({
  inputValue,
  setInputValue,
  handleKeyDown,
  sendMessage
}) => {
  return (
    <Box m="1rem" w="100%" pr={0}>
      <InputGroup>
        <Input
          placeholder="Type your thoughts here..."
          h="4.375rem"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          borderColor="primary"
          _focus={{ boxShadow: "none", borderColor: "primary" }}
          pr={'6%'}
          border={".125rem solid"}
          _placeholder={{ color: 'primary' }} 
        />
        <InputRightElement h="100%" w="15%" display="flex" justifyContent="flex-end" >
            <Button size="sm" onClick={sendMessage} background="transparent">
              <MdOutlineSend color="#231E5B" size="2rem" />
            </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};




export default ChatInput;