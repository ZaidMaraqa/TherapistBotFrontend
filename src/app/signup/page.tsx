"use client";

import { ASSETS } from "@/assets";
import AuthContext from "@/context/auth";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useContext } from "react";
import { AiOutlineMail } from "react-icons/ai";
import * as Yup from "yup";
import { MdLockOutline } from "react-icons/md";
import { CiUser } from "react-icons/ci";

const validationSchema = Yup.object({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .matches(/(?=.*[a-z])/, "One lowercase character")
    .matches(/(?=.*[A-Z])/, "One uppercase character")
    .matches(/(?=.*[0-9])/, "One number")
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  passwordC: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Password confirmation is required"),
});

const SignUp = () => {
  const { signup } = useContext(AuthContext);

  const { handleSubmit, errors, values, handleChange, handleBlur, touched } =
    useFormik({
      initialValues: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        passwordC: "",
      },
      validationSchema,
      onSubmit: (values) => {
        console.log(values);
        signup(values);
      },
    });

  return (
    <Flex w={"100vw"} h={"100vh"}  overflow={"hidden"}>
      <Flex w={["100%", "100%", "50%"]} direction={"column"}>
        <Flex>
          <Text
            fontSize={"2.5rem"}
            h={"20%"}
            fontWeight={"bold"}
            padding={"1.0625rem"}
            color={"#231E5B"}
          >
            Solace
          </Text>
        </Flex>
        <Flex
          justifyContent={"center"}
          direction={"column"}
          h={"80%"}
          gap={"1.5rem"}
          px={"1rem"}
        >
          <Text color={"#231E5B"} fontSize={"2.5rem"} align={"center"}>
            Welcome Back
          </Text>

          <form onSubmit={handleSubmit}>
            <Flex
              direction={{ base: "column", md: "row" }}
              gap="1rem"
              mb={".5rem"}
            >
              <Flex direction={"column"}grow={1}>
                <FormLabel> First Name</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <CiUser />
                  </InputLeftElement>
                  <Input
                    placeholder="John"
                    name="first_name"
                    onChange={handleChange}
                    value={values.first_name}
                    onBlur={handleBlur}
                    isInvalid={!!(touched.first_name && !!errors.first_name)}
                    borderWidth={"2px"}
                    borderColor={"primary"}
                    _focus={{ boxShadow: "none", borderColor: "primary" }}
                    _hover={{ borderColor: "primary" }}
                  />
                </InputGroup>
              </Flex>
              <Flex direction={"column"} grow={1}>
                <FormLabel> Last Name</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <CiUser />
                  </InputLeftElement>

                  <Input
                    placeholder="Doe"
                    name="last_name"
                    onChange={handleChange}
                    value={values.last_name}
                    onBlur={handleBlur}
                    isInvalid={!!(touched.last_name && !!errors.last_name)}
                    borderWidth={"2px"}
                    borderColor={"primary"}
                    _focus={{ boxShadow: "none", borderColor: "primary" }}
                    _hover={{ borderColor: "primary" }}
                  />
                </InputGroup>
              </Flex>
            </Flex>
            <FormLabel> Email</FormLabel>
            <InputGroup flexDir={"column"} mb={".5rem"}>
              <InputLeftElement>
                <AiOutlineMail />
              </InputLeftElement>
              <Input
                type="email"
                placeholder="test@example.com"
                name="email"
                onChange={handleChange}
                value={values.email}
                onBlur={handleBlur}
                isInvalid={!!(touched.email && !!errors.email)}
                borderColor={"#231E5B"}
                borderWidth={"2px"}
                borderRadius={".75rem"}
                _focus={{ boxShadow: "none", borderColor: "#231E5B" }}
                _hover={{ borderColor: "#231E5B" }}
              />
              <FormErrorMessage color={"red"} fontSize={"4rem"}>
                {errors.email}
              </FormErrorMessage>
            </InputGroup>
            <Flex direction={{ base: "column", md: "row" }} gap="1rem">
              <Flex direction="column" grow={1}>
                <FormLabel> Password</FormLabel>
                <InputGroup flexDir={"column"}>
                  <InputLeftElement>
                    <MdLockOutline />
                  </InputLeftElement>
                  <Input
                    type="password"
                    placeholder="*********"
                    onChange={handleChange}
                    name="password"
                    value={values.password}
                    onBlur={handleBlur}
                    isInvalid={!!(touched.password && !!errors.password)}
                    borderColor={"#231E5B"}
                    borderWidth={"2px"}
                    borderRadius={".75rem"}
                    _hover={{ borderColor: "#231E5B" }}
                    _focus={{ boxShadow: "none", borderColor: "#231E5B" }}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </InputGroup>
              </Flex>
              <Flex direction="column" grow={1}>
                <FormLabel> Password Confirmation</FormLabel>
                <InputGroup flexDir={"column"}>
                  <InputLeftElement>
                    <MdLockOutline />
                  </InputLeftElement>
                  <Input
                    placeholder="*********"
                    name="passwordC"
                    type="password"
                    onChange={handleChange}
                    value={values.passwordC}
                    onBlur={handleBlur}
                    isInvalid={!!(touched.passwordC && !!errors.passwordC)}
                    borderWidth={"2px"}
                    borderColor={"primary"}
                    _focus={{ boxShadow: "none", borderColor: "primary" }}
                    _hover={{ borderColor: "primary" }}
                  />
                </InputGroup>
              </Flex>
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
                color={"white"}
                _hover={{ cursor: "pointer", opacity: "80%" }}
              >
                Log In
              </Button>
            </Flex>
          </form>

          <Text align={"center"}>
            Already have an account? Log in{" "}
            <Link color={"#231E5B"} fontWeight={'bold'} href="/login">
              here
            </Link>
          </Text>
        </Flex>
      </Flex>
      <Flex
        w={"50%"}
        h={"100%"}
        direction={'column'}
        position={"fixed"}
        top={'5.9375rem'}
        right={0}
        p={"2rem"}
        alignItems={'center'}
        display={["none", "none", "flex"]}
      >
        <Image src={ASSETS.signup} h={'50%'} w={'80%'} borderRadius={'.625rem'} />
        <Text fontSize={'1.5625rem'} color={'#231E5B'} maxW={'77%'}>
        A place where you will be <span style={{ fontWeight: 'bold' }}>loved</span> and <span style={{ fontWeight: 'bold' }}>supported</span>, you are not alone here.

        </Text>
      </Flex>
    </Flex>
  );
};

export default SignUp;
