"use client";

import { ASSETS } from "@/assets";
import AuthContext from "@/context/auth";
import { Button, Flex, Image, Link, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useContext } from "react";
import { AiOutlineMail } from "react-icons/ai";
import * as Yup from "yup";
import { MdLockOutline } from "react-icons/md";
import FloatingLabel from "@/components/floatingLabel/FloatingLabel";
import NavBar from "@/components/Navbars/navBar";
const validationSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const { login } = useContext(AuthContext);

  const { handleSubmit, errors, values, handleChange, handleBlur, touched, isSubmitting, setSubmitting } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema,
      onSubmit: (values) => {
        login(values.email, values.password)
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
          <Text color={"primary"} fontSize={"2.5rem"} align={"center"}>
            Welcome Back
          </Text>
          <form onSubmit={handleSubmit}>
            <FloatingLabel
              id="email"
              label="Email"
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
              id="password"
              label="Password"
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
            <Flex justifyContent={"flex-end"} py={".2rem"}>
              <Link color={'primary'} href="/forgot-password">Forgot Password?</Link>
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
                bg={"primary"}
                color={"white"}
                isLoading={isSubmitting}
                _hover={{ cursor: "pointer", opacity: "80%" }}
              >
                Log In
              </Button>
            </Flex>
          </form>

          <Text align={"center"}>
            Don't have an account? Sign up{" "}
            <Link color={"primary"} href="/sign-up">
              here
            </Link>
          </Text>
        </Flex>
      </Flex>
      <Flex
        w={"50%"}
        h={"100%"}
        position={"fixed"}
        top={0}
        right={0}
        p={"2rem"}
        display={["none", "none", "flex"]}
        objectFit={"contain"}
        justifyContent={"flex-end"}
      >
        <Image src={ASSETS.login} />
      </Flex>
    </Flex>
  );
};

export default Login;
