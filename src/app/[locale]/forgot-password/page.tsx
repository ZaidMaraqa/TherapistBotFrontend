'use client'
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Flex, Text } from "@chakra-ui/react";
import FloatingLabel from "@/components/floatingLabel/FloatingLabel";
import { CiPhone } from "react-icons/ci";

const ForgotPass = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);

  // Define base schema for phone number
  const baseSchema = {
    number: Yup.string()
      .required("Phone number is required")
      .matches(/^\+[1-9]\d{1,14}$/, "Invalid phone number format. Please include the country code."),
  };

  // Extend base schema with OTP if OTP has been sent
  const schema = isOtpSent ? {
    ...baseSchema,
    otp: Yup.string().required("OTP is required"),
  } : baseSchema;

  const formik = useFormik({
    initialValues: { number: "", otp: "" },
    validationSchema: Yup.object(schema),
    onSubmit: (values) => {
      if (!isOtpSent) {
        console.log("Sending OTP to:", values.number);
        setIsOtpSent(true);  // Simulate sending OTP
      } else {
        console.log("Submitted OTP:", values.otp);
        // Handle OTP verification
      }
    },
  });

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
        maxH={"28.75rem"}
        maxW={"23rem"}
        alignItems={"center"}
        p={4}
        gap={"30px"}
      >
        <Text fontWeight={700} fontSize={"1.875rem"} color={"primary"}>
          {isOtpSent ? "Enter OTP" : "Verify Phone Number"}
        </Text>
        <Text fontSize={"1.25rem"} color={"primary"} align={"center"} flexWrap={"wrap"}>
          {isOtpSent ? "Please enter the OTP sent to your phone" : "Please enter your phone number to receive an OTP via WhatsApp"}
        </Text>

        <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
          {!isOtpSent && (
            <FloatingLabel
              id="number"
              label="Phone Number"
              type="text"
              icon={CiPhone}
              formik={formik}
            />
          )}
          {isOtpSent && (
            <FloatingLabel
              id="otp"
              label="OTP"
              type="text"
              formik={formik}
              icon={CiPhone}
            />
          )}
          <Button
            type="submit"
            w={"100%"}
            mt={8}
            mb={4}
            // isLoading={formik.isSubmitting}
          >
            {isOtpSent ? "Verify OTP" : "Send OTP"}
          </Button>
        </form>
      </Flex>
    </Flex>
  );
};

export default ForgotPass;

