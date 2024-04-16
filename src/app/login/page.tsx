"use client";

import { ASSETS } from "@/assets";
import AuthContext from "@/context/auth";
import {
  Button,
  Flex,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useContext} from "react";
import { AiOutlineMail } from "react-icons/ai";
import * as Yup from "yup";
import { MdLockOutline } from "react-icons/md";

const validationSchema = Yup.object({
  email: Yup.string().required("email is required"),
  password: Yup.string().required("password is required"),
});

const Login = () => {
  const { login } = useContext(AuthContext);

  const { handleSubmit, errors, values, handleChange, handleBlur, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema,
      onSubmit: (values) => {
        login(values.email, values.password);
      },
    });


  return (
    <Flex w={"100vw"} h={"100vh"} bg={"#FAFAFC"} overflow={"hidden"}>
      <Flex w={["100%", '100%', '50%']} direction={"column"}>
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
                borderWidth={'2px'}
                borderColor={'primary'}
                _focus={{ boxShadow: "none", borderColor: 'primary' }}
                _hover={{ borderColor: "primary" }}
              />
            <FormErrorMessage color={'red'} fontSize={'4rem'}>
                {errors.email}
              </FormErrorMessage>
            </InputGroup>
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
                borderWidth={'2px'}
                borderColor={'primary'}
                _focus={{ boxShadow: "none", borderColor: 'primary' }}
                _hover={{ borderColor: "primary" }}
              />
              <FormErrorMessage>
                {errors.password}
              </FormErrorMessage>
            </InputGroup>
            <FormErrorMessage>
                {errors.password}
              </FormErrorMessage>
            <Flex justifyContent={"flex-end"} py={".2rem"}>
              <Link>Forgot Password?</Link>
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
                _hover={{ cursor: "pointer", opacity: "80%" }}
              >
                Log In
              </Button>
            </Flex>
          </form>

          <Text align={'center'}>
            Don't have an account? Log In <Link color={'primary'} href="/signup">here</Link>
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
        display={['none', 'none', 'flex']}
        objectFit={"contain"}
        justifyContent={"flex-end"}
      >
        <Image src={ASSETS.login} />
      </Flex>
    </Flex>
  );
};

export default Login;
