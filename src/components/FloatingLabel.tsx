import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
} from "@chakra-ui/react";
import { IconType } from 'react-icons';

interface FloatingLabelProps {
  id: string;
  label: string;
  type: string;
  formik: {
    values: { [key: string]: any };
    handleChange: (e: React.ChangeEvent<any>) => void;
    handleBlur: (e: React.FocusEvent<any>) => void;
    touched: { [key: string]: boolean };
    errors: { [key: string]: string };
  };
  icon: IconType;
}

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
