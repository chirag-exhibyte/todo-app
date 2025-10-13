import { useAuth } from "@/context/AuthContext";
import { Box, Button } from "@chakra-ui/react";
import React from "react";

const Login = () => {
  const { login } = useAuth();
  return (
    <Box
      justifyContent={"center"}
      alignItems={"center"}
      display={"flex"}
      height={"100vh"}
    >
      <Button onClick={login}>Login</Button>
    </Box>
  );
};

export default Login;
