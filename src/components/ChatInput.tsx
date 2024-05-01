import React from 'react';
import { Box, Button, InputGroup, Input, InputRightElement, InputLeftElement } from '@chakra-ui/react';
import { MdOutlineSend } from "react-icons/md";
import { useLocale } from 'next-intl';
import useTextDirection from './useTextDirection';

interface SearchInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  sendMessage: () => void;
  placeholder: string;
}

const ChatInput: React.FC<SearchInputProps> = ({
  inputValue,
  setInputValue,
  handleKeyDown,
  sendMessage,
  placeholder
}) => {

  const locale = useLocale(); 
  console.log(locale)
  const textDirection = useTextDirection(locale);

  const inputStyle = { 
    textAlign: textDirection === 'rtl' ? 'right' as const : 'left' as const 
  };
  const InputElement = textDirection === 'rtl' ? InputLeftElement : InputRightElement;

  const iconStyle = textDirection === 'rtl' ? { transform: 'rotate(180deg)' } : {};

  const elementProps = textDirection === 'rtl' ? {
    justifyContent: 'flex-start',
  } : {
    justifyContent: 'flex-end',
  };





  return (
    <Box m="1rem" w="100%" pr={0}>
      <InputGroup>
        <Input
          placeholder={placeholder}
          h="4.375rem"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          borderColor="primary"
          style={inputStyle}
          _focus={{ boxShadow: "none", borderColor: "primary" }}
          pr={'6%'}
          border={".125rem solid"}
          _placeholder={{ color: 'primary' }} 
        />
        <InputElement h="100%" w="15%" display="flex" {...elementProps}>
            <Button size="sm" onClick={sendMessage} background="transparent">
            <MdOutlineSend style={iconStyle} color="#231E5B" size="2rem" />
            </Button>
        </InputElement>
      </InputGroup>
    </Box>
  );
};




export default ChatInput;