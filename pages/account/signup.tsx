import { Formik, Field } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  Text,
  Container,
  Heading,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useState } from "react";
import { useRouter } from "next/router";

type ResponseValue = {
  name: string;
  email: string;
  password: string;
};

export default function SignUp() {
  const YupSchema = Yup.object({
    name: Yup.string().required().min(3),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(2),
  });

  const router = useRouter();

  const signUp = (values: ResponseValue) => {
    console.log("call api");
    fetch("/api/signup", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
    }).then((response) => {
      console.log(response);
      router.push("/");
    });
  };

  return (
    <>
      <Container>
        <Heading fontSize={50} padding={12} textAlign="center">
          Sign up
        </Heading>
        <Flex bg="white" align="start" justify="center" w="100%" p={10}>
          <Box bg="white" color="black" rounded="md" w="100%">
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                rememberMe: false,
              }}
              validationSchema={YupSchema}
              onSubmit={(values) => {
                signUp(values);
              }}
            >
              {({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                  <VStack spacing={4} align="flex-start">
                    <FormControl isInvalid={!!errors.name && touched.name}>
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <Field
                        as={Input}
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Name"
                      />
                      <FormErrorMessage>{errors.name}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.email && touched.email}>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Field
                        as={Input}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                      />
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={!!errors.password && touched.password}
                    >
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Field
                        as={Input}
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                      />
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>

                    <Button
                      bg="aquamarine"
                      type="submit"
                      colorScheme="pink"
                      width="full"
                      border="none"
                    >
                      Sign up
                    </Button>
                  </VStack>
                </form>
              )}
            </Formik>
          </Box>
        </Flex>
      </Container>
    </>
  );
}
