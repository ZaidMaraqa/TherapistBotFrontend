import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FloatingLabelProps } from "../floatingLabel/floatingLabel.interface";
import useTextDirection from '../useTextDirection';
import { useLocale } from 'next-intl';

const FloatingLabel: React.FC<FloatingLabelProps> = ({ id, label, type, formik, icon: Icon }) => {
    const [isFocused, setIsFocused] = useState(false);
  
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const error = formik.touched[id] && formik.errors[id];
    const isInvalid = Boolean(error);

    const locale = useLocale(); 
    const textDirection = useTextDirection(locale);

    const inputStyle = { 
      textAlign: textDirection === 'rtl' ? 'right' as const : 'left' as const 
    };
    const InputElement = textDirection === 'rtl' ? InputRightElement : InputLeftElement;

    const labelTransform = isFocused || formik.values[id] ? 'scale(0.875) translateY(-30px) translateX(20px)' : 'none';
    const labelStyles = textDirection === 'rtl' ? {
      position: 'absolute' as const, 
      right: '2rem',
      left: 'auto',
      top: '10px',
      transform: labelTransform,
    } : {
      position: 'absolute' as const, 
      left: '2rem',
      right: undefined,
      top: '10px',
      // transform: labelTransform,
    };

    const textStyles = { justifyContent: textDirection === 'rtl' ? 'end' : 'start' };

    return (
      <FormControl isInvalid={isInvalid} variant={'floating'} id={id} mt={4}>
        <InputGroup flexDirection="column">
          <InputElement pointerEvents="none" children={<Icon />} fontSize={'1.55rem'}/>
          <Input
            id={id}
            type={type}
            onChange={formik.handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            value={formik.values[id]}
            placeholder=" "
            border={'2px solid'}
            borderColor={'primary'}
            _hover={{ borderColor: 'primary.400' }}
            _focus={{ boxShadow: "none", borderColor: "primary" }}
            style={inputStyle}
          />
          <FormLabel htmlFor={id} style={labelStyles}>{label}</FormLabel>
        </InputGroup>
        <FormErrorMessage style={textStyles}>{error}</FormErrorMessage>
      </FormControl>
    );
};

export default FloatingLabel;
