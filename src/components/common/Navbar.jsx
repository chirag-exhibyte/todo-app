import { useAuth } from "@/context/AuthContext";
import { Box, Button, Container, Flex, IconButton, Link } from "@chakra-ui/react";
import { IconLogout } from "@tabler/icons-react";
import React from "react";



const Navbar = () => {
  const {logout} = useAuth();
  return (
    <Box position="sticky" style={{backdropFilter :"blur(10px)"}} top={0}  zIndex={10}>

       <Container p={0} pt={5} pb={2}>
        <Box
          as="nav"
          bg={"white"}
          
          boxShadow={"sm"}
          rounded="md"
        >
          <Box px={4}>
            <Flex h={16} alignItems="center" justifyContent="space-between">
              <Box fontWeight="bold" fontSize="3xl" color="green.600">
                Hello TODO
              </Box> 
              <IconButton onClick={logout} variant={"outline"} colorScheme="red" aria-label="Logout">
                <IconLogout/>
              </IconButton> 
            </Flex>
          </Box>
        </Box>
       </Container>
    </Box>
  );
};

export default Navbar;
