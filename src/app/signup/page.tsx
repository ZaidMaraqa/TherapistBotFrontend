"use client";

import { ASSETS } from "@/assets";
import AuthContext from "@/context/auth";
import { Box, Button, Flex, Image, Link, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useContext } from "react";
import { AiOutlineMail } from "react-icons/ai";
import * as Yup from "yup";
import { MdLockOutline } from "react-icons/md";
import { CiUser, CiCalendarDate } from "react-icons/ci";
import FloatingLabel from "@/components/FloatingLabel";
import { TiWorldOutline } from "react-icons/ti";


const validationSchema = Yup.object({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  country: Yup.string().required("Country is required"),
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
  dob: Yup.string()
    .matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/([0-9]{2})$/, {
      message: "DOB must be in dd/mm/yy format",
      excludeEmptyString: true
    })
    .required("DOB is required")
});


const SignUp = () => {
  const { signup } = useContext(AuthContext);

  const { handleSubmit, errors, values, handleChange, handleBlur, touched } =
    useFormik({
      initialValues: {
        first_name: "",
        last_name: "",
        email: "",
        country: "",
        dob: "",
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
    <Flex w={"100vw"} h={"100vh"} overflow={"hidden"}>
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
          <Box>
            <Text color={"#231E5B"} fontSize={"2rem"} align={"center"}>
              Create an account
            </Text>
            <Text color={"gray"} fontSize={"1rem"} align={"center"}>
              A step towards a better emitional health.
            </Text>
          </Box>

          <form onSubmit={handleSubmit}>
            <Flex
              direction={{ base: "column", md: "row" }}
              gap="1rem"
              mb={".5rem"}
            >
              <Flex direction={"column"} grow={1}>
                <FloatingLabel
                  id="first_name"
                  label="First Name"
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
              <Flex direction={"column"} grow={1}>
                <FloatingLabel
                  id="last_name"
                  label="Last Name"
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
            </Flex>
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
              id="country"
              label="Country"
              type="text"
              icon={TiWorldOutline}
              formik={{
                handleBlur,
                handleChange,
                values,
                touched,
                errors,
              }}
            />
            <FloatingLabel
              id="dob"
              label="Date of Birth"
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
            <Flex direction={{ base: "column", md: "row" }} gap="1rem">
              <Flex direction="column" grow={1}>
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
              </Flex>
              <Flex direction="column" grow={1}>
                <FloatingLabel
                  id="passwordC"
                  label="Password Confirmation"
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
            <Link color={"#231E5B"} fontWeight={"bold"} href="/login">
              here
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
          A place where you will be{" "}
          <span style={{ fontWeight: "bold" }}>loved</span> and{" "}
          <span style={{ fontWeight: "bold" }}>supported</span>, you are not
          alone here.
        </Text>
      </Flex>
    </Flex>
  );
};

export default SignUp;
