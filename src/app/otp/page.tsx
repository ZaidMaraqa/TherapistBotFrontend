'use client'

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Flex, HStack, PinInput, PinInputField, Text } from "@chakra-ui/react";

const Otp = () => {
  const formik = useFormik({
    initialValues: { otp: '' },
    validationSchema: Yup.object({
      otp: Yup.string()
        .required('OTP is required')
        .matches(/^\d{4}$/, 'OTP must be exactly 4 digits'),
    }),
    onSubmit: values => {
      console.log(values);
    },
  });

  const handleComplete = (value: string) => {
    formik.setFieldValue('otp', value);
  };

  return (
    <Flex
      h={"100vh"}
      w={"100vw"}
      justifyContent={"center"}
      bg={"white"}
      alignItems={"center"}
    >
      <Flex
        boxShadow={"lg"}
        borderRadius={"lg"}
        bg={"#FAFAFC"}
        direction={"column"}
        mb={'10%'}
        maxH={"28.75rem"}
        maxW={"23rem"}
        alignItems={"center"}
        p={4}
        gap={"30px"}
      >
        <Text fontWeight={700} fontSize={"1.875rem"} color={"primary"}>
          Enter OTP
        </Text>
        <Text fontSize={"1.25rem"} color={"primary"} align={'center'} flexWrap={'wrap'}>
          Please enter the four digit code sent to you via WhatsApp
        </Text>

        <form onSubmit={formik.handleSubmit}>
          <HStack justifyContent={"center"}>
            <PinInput otp onComplete={handleComplete} size={'lg'}>
              <PinInputField name="otp" onChange={formik.handleChange} />
              <PinInputField name="otp" onChange={formik.handleChange} />
              <PinInputField name="otp" onChange={formik.handleChange} />
              <PinInputField name="otp" onChange={formik.handleChange} />
            </PinInput>
          </HStack>
          {formik.touched.otp && formik.errors.otp ? (
            <Text color="red.500">{formik.errors.otp}</Text>
          ) : null}
          <Button type="submit" w={'100%'} mt={8} mb={4} isLoading={formik.isSubmitting}>
              Verify
          </Button>
        </form>
      </Flex>
    </Flex>
  );
};

export default Otp;
