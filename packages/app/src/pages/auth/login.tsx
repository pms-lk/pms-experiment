/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import AuthContext from "../../contexts/auth";
import NotifyContext from "../../contexts/notify";

interface LoginForm {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const auth = useContext(AuthContext);
  const notify = useContext(NotifyContext);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<LoginForm>();

  // form submit
  const onSubmit = async (values: LoginForm) => {
    window.auth.login(values).then(({ err }) => {
      if (err) {
        notify.NewAlert({
          msg: "Login Failed",
          description: err.name,
          status: "error",
        });
      } else {
        notify.NewAlert({
          msg: "Login Success",
          status: "success",
        });
      }
    });
  };

  return (
    <Center w="100vw" h="100vh">
      <Container width="350px">
        <Text align="center" paddingY="2" fontSize="lg">
          Login
        </Text>
        <Box
          backgroundColor="white"
          paddingY="2"
          paddingX="4"
          boxShadow="lg"
          rounded="lg"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                {...register("username", { required: true })}
                name="username"
                placeholder="username"
              />
              {errors.username && (
                <FormHelperText>This field is required</FormHelperText>
              )}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                {...register("password", { required: true })}
                name="password"
                placeholder="password"
                type="password"
              />
              {errors.password && (
                <FormHelperText>This field is required</FormHelperText>
              )}
            </FormControl>

            <Flex direction="column">
              <Button type="submit" m="2" colorScheme="teal">
                Login
              </Button>
              <Button m="2" size="sm">
                Forgot my password
              </Button>
            </Flex>
          </form>
        </Box>
      </Container>
    </Center>
  );
};

export default LoginPage;
