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

export default function SignIn() {
  const YupSchema = Yup.object({
    name: Yup.string().required().min(3),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(2),
  });

  function signUp(values: Object) {
    fetch("http://localhost:8080/signup", {
      method: "post",
    });
  }

  return (
    <>
      <Container>
        <Heading fontSize={50} padding={12} textAlign="center">
          Sign in
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
                //set email password object here
                //useSubmit to check serverside if user exist already etc.
                //Redirect to dashboard
                alert(JSON.stringify(values, null, 2));
              }}
            >
              {({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                  <VStack spacing={4} align="flex-start">
                    <FormControl isInvalid={!!errors.email && touched.email}>
                      <FormLabel htmlFor="email">Email Address</FormLabel>
                      <Field
                        as={Input}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        value=""
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
                        value=""
                      />
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>

                    <Button
                      bg="aquamarine"
                      type="submit"
                      colorScheme="black"
                      width="full"
                      border="none"
                    >
                      Sign in
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
