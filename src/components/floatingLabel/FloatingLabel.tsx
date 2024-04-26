import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
} from "@chakra-ui/react";
import {FloatingLabelProps} from "../floatingLabel/floatingLabel"

const FloatingLabel: React.FC<FloatingLabelProps> = ({ id, label, type, formik, icon: Icon }) => {
    const [isFocused, setIsFocused] = useState(false);
  
    const handleFocus = () => setIsFocused(true);
  
    const error = formik.touched[id] && formik.errors[id];
    const isInvalid = Boolean(error);
  
    return (
      <FormControl isInvalid={isInvalid} variant={'floating'} id={id} mt={4}>
        <InputGroup flexDirection="column">
          <InputLeftElement pointerEvents="none" children={<Icon />} fontSize={'1.55rem'}/>
          <Input
            id={id}
            type={type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={handleFocus}
            value={formik.values[id]}
            placeholder=" "
            border={'2px solid'}
            borderColor={'primary'}
            _hover={{ borderColor: 'primary.400' }}
            _focus={{ boxShadow: "none", borderColor: "primary" }}
          />
          <FormLabel htmlFor={id}>{label}</FormLabel>
        </InputGroup>
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    );
  };
  
  export default FloatingLabel;
