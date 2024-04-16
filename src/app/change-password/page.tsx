'use client'
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Flex, Text } from "@chakra-ui/react";
import FloatingLabel from "@/components/FloatingLabel";
import { MdLockOutline } from "react-icons/md";





const ChangePassword = () => {
    const {
        handleSubmit,
        errors,
        values,
        isSubmitting,
        handleChange,
        handleBlur,
        touched,
      } = useFormik({
        initialValues: { 
            password: "",
            passwordC: ""
        },
        validationSchema: Yup.object({
            password: Yup.string()
            .matches(/(?=.*[a-z])/, "One lowercase character")
            .matches(/(?=.*[A-Z])/, "One uppercase character")
            .matches(/(?=.*[0-9])/, "One number")
            .min(8, "Password must be at least 8 characters long")
            .required("Password is required"),
          passwordC: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Password confirmation is required"),
        }),
        onSubmit: (values) => {
          console.log("Submitted Phone Number:", values);
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
            direction={"column"}
            maxH={"30.75rem"}
            maxW={"23rem"}
            alignItems={"center"}
            p={4}
            mb={'10%'}
            gap={"30px"}
          >
            <Text fontWeight={700} fontSize={"1.875rem"} color={"primary"}>
              Change Password
            </Text>
            <Text
              fontSize={"1.25rem"}
              color={"primary"}
              align={"center"}
              flexWrap={"wrap"}
            >
              Please enter your new password and confirm it
            </Text>
    
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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
              <Button
                type="submit"
                w={"100%"}
                mt={8}
                mb={4}
                isLoading={isSubmitting}
              >
                Change Password
              </Button>
            </form>
          </Flex>
        </Flex>
      );
}

export default ChangePassword;