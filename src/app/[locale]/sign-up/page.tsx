"use client";

import { ASSETS } from "@/app/[locale]/assets";
import AuthContext from "@/context/auth";
import { Box, Button, Flex, Image, Link, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useContext } from "react";
import { AiOutlineMail } from "react-icons/ai";
import * as Yup from "yup";
import { MdLockOutline } from "react-icons/md";
import { CiUser, CiCalendarDate, CiPhone } from "react-icons/ci";
import FloatingLabel from "@/components/floatingLabel/FloatingLabel";
import NavBar from "@/components/Navbars/navBar";
import { useTranslations } from "next-intl";






const SignUp = () => {
  const t  = useTranslations("Signup");


  const validationSchema = Yup.object({
    first_name: Yup.string().required(t('firstNameRequired')),
    last_name: Yup.string().required(t('LastNameRequired')),
    phone_number: Yup.string().required(t('phoneRequired')),
    email: Yup.string()
      .email(t('InvalidEmail'))
      .required(t('emailRequired')),
    password: Yup.string()
      .matches(/(?=.*[a-z])/, t('passswordLower'))
      .matches(/(?=.*[A-Z])/, t('passswordUpper'))
      .matches(/(?=.*[0-9])/, t('passwordNumber'))
      .min(8, t('passwordLength'))
      .required(t('passwordRequired')),
    passwordC: Yup.string()
      .oneOf([Yup.ref("password")], t("passwordMatch"))
      .required(t('passwordCR')),
    date_of_birth: Yup.string()
      .required(t('DOBrequired'))
  });


  const { signup } = useContext(AuthContext);

  const { handleSubmit, errors, values, handleChange, handleBlur, touched, isSubmitting, setSubmitting } =
    useFormik({
      initialValues: {
        first_name: "",
        last_name: "",
        email: "",
        date_of_birth: "",
        phone_number: "",
        country: "",
        password: "",
        passwordC: "",
      },
      validationSchema,
      onSubmit: (values) => {
        signup(values)
          .finally(() => {
            setSubmitting(false); // Ensure isSubmitting is set to false after login attempt
          });
      },
    });

  return (
    <Flex w={"100vw"} h={"100vh"} overflow={"hidden"}>
      <Flex w={["100%", "100%", "50%"]} direction={"column"}>
      <NavBar />
        <Flex
          justifyContent={"center"}
          direction={"column"}
          h={"80%"}
          gap={"1.5rem"}
          px={"1rem"}
        >
          <Box>
            <Text color={"#231E5B"} fontSize={"2rem"} align={"center"}>
              {t('title')}
            </Text>
            <Text color={"gray"} fontSize={"1rem"} align={"center"}>
              {t('subTitle')}
            </Text>
          </Box>

          <form onSubmit={handleSubmit}>
            <Flex
              direction={{ base: "column", md: "row" }}
              gap="1rem"
              mb={".5rem"}
            >
                <FloatingLabel
                  id="first_name"
                  label={t("firstName")}
                  type="text"
                  icon={CiUser}
                  formik={{
                    handleBlur,
                    handleChange,
                    values,
                    touched,
                    errors,
                  }}
                />
                <FloatingLabel
                  id="last_name"
                  label={t("lastName")}
                  type="text"
                  icon={CiUser}
                  formik={{
                    handleBlur,
                    handleChange,
                    values,
                    touched,
                    errors,
                  }}
                />
            </Flex>
            <FloatingLabel
              id="email"
              label={t("email")}
              type="email"
              icon={AiOutlineMail}
              formik={{
                handleBlur,
                handleChange,
                values,
                touched,
                errors,
              }}
            />
            <FloatingLabel
              id="date_of_birth"
              label={t("dob")}
              type="text"
              icon={CiCalendarDate}
              formik={{
                handleBlur,
                handleChange,
                values,
                touched,
                errors,
              }}
            />
            <FloatingLabel
              id="phone_number"
              label={t("phone")}
              type="text"
              icon={CiPhone}
              formik={{
                handleBlur,
                handleChange,
                values,
                touched,
                errors,
              }}
            />
            <Flex direction={{ base: "column", md: "row" }} gap="1rem">
                <FloatingLabel
                  id="password"
                  label={t("password")}
                  type="password"
                  icon={MdLockOutline}
                  formik={{
                    handleBlur,
                    handleChange,
                    values,
                    touched,
                    errors,
                  }}
                />
                <FloatingLabel
                  id="passwordC"
                  label={t("confirmPassword")}
                  type="password"
                  icon={MdLockOutline}
                  formik={{
                    handleBlur,
                    handleChange,
                    values,
                    touched,
                    errors,
                  }}
                />
            </Flex>
            <Flex
              w={"100%"}
              alignItems={"center"}
              justifyContent={"center"}
              mt={"1rem"}
            >
              <Button
                w={"30%"}
                type="submit"
                bg={"#231E5B"}
                isLoading={isSubmitting}
                color={"white"}
                _hover={{ cursor: "pointer", opacity: "80%" }}
              >
                {t('signUp')}
              </Button>
            </Flex>
          </form>

          <Text align={"center"}>
            {t('already')}{" "}
            <Link color={"#231E5B"} fontWeight={"bold"} href="/login">
              {t('here')}
            </Link>
          </Text>
        </Flex>
      </Flex>
      <Flex
        w={"50%"}
        h={"100%"}
        direction={"column"}
        position={"fixed"}
        top={"5.9375rem"}
        right={0}
        p={"1rem"}
        alignItems={"center"}
        display={["none", "none", "flex"]}
      >
        <Image
          src={ASSETS.signup}
          h={"50%"}
          w={"80%"}
          borderRadius={".625rem"}
        />
        <Text fontSize={"1.5625rem"} color={"#231E5B"} maxW={"100%"}>
          {t('place')}{" "}
          <span style={{ fontWeight: "bold" }}>{t('loved')}</span> {t('and')}{" "}
          <span style={{ fontWeight: "bold" }}>{t('supported')}</span>, {t('alone')}
        </Text>
      </Flex>
    </Flex>
  );
};

export default SignUp;
