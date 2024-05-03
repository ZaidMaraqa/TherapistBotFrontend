"use client";

import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import config from "@/config";
import {
  Button,
  Flex,
  HStack,
  PinInput,
  PinInputField,
  Text,
} from "@chakra-ui/react";
import AuthContext from "@/context/auth";
import useToastNotification from "@/components/toast";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import { useTranslations } from "next-intl";


const Otp = () => {
  const { user, authTokens } = useContext(AuthContext);
  const toast = useToastNotification();
  const router = useRouter();
  const t = useTranslations('OTP')


  const verifyOtp = async () => {
    if (!user || !authTokens ) {
      toast({
        title: t('error'),
        status: "error",
      });
      return;
    }

    const response = await fetch(`${config.apiUrl}/verify_otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uuid: user.uuid, verified: true }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Verification failed");

    toast({
      title: t('sucess'),
      description: t('sde'),
      status: "success",
    });
    Cookie.set("token", authTokens);
    router.push("/onboarding");
  };

  const { handleSubmit,setFieldValue, errors, values, handleChange, handleBlur, touched, isSubmitting, setSubmitting } =useFormik({
    initialValues: { otp: "" },
    validationSchema: Yup.object({
      otp: Yup.string()
        .required(t('required'))
        .matches(/^\d{4}$/, t('match')),
    }),
    onSubmit: (values) => {
      if (values.otp === user?.otp.toString()) {
        verifyOtp()
          .finally(() => {
            setSubmitting(false); 
          });
      } else {
        setSubmitting(false);
        toast({
          title: "Incorrect OTP.",
          position: "top-right",
          status: "error",
        });
      }
    },
  });

  const handleComplete = (value: string) => {
    setFieldValue("otp", value);
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
        mb={"10%"}
        maxH={"28.75rem"}
        maxW={"23rem"}
        alignItems={"center"}
        p={4}
        gap={"30px"}
      >
        <Text fontWeight={700} fontSize={"1.875rem"} color={"primary"}>
          {t('enter')}
        </Text>
        <Text
          fontSize={"1.25rem"}
          color={"primary"}
          align={"center"}
          flexWrap={"wrap"}
        >
          {t('descripition')}
        </Text>

        <form onSubmit={handleSubmit}>
          <HStack justifyContent={"center"}>
            <PinInput otp onComplete={handleComplete} size={"lg"}>
              <PinInputField name="otp" onChange={handleChange} />
              <PinInputField name="otp" onChange={handleChange} />
              <PinInputField name="otp" onChange={handleChange} />
              <PinInputField name="otp" onChange={handleChange} />
            </PinInput>
          </HStack>
          {touched.otp && errors.otp ? (
            <Text color="red.500">{errors.otp}</Text>
          ) : null}
          <Button type="submit" isLoading={isSubmitting} w={"100%"} mt={8} mb={4}>
            {t('Verify')}
          </Button>
        </form>
      </Flex>
    </Flex>
  );
};

export default Otp;
