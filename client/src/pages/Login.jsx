import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/userActions";
import { useNavigate } from "react-router-dom";

const Login = ({ isAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await dispatch(login(email, password));
    setEmail("");
    setPassword("");
    navigate("/");
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  return (
    <Box marginTop={"48px"}>
      {/* <Heading color={"black100"}>Login</Heading> */}
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <form onSubmit={handleLogin}>
          <FormControl my={4}>
            <FormLabel fontSize={"xs"} color={"black100"} htmlFor="email">
              Email
            </FormLabel>
            <Input
              id="email"
              placeholder="Enter email"
              value={email}
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl my={4}>
            <FormLabel fontSize={"xs"} color={"black100"} htmlFor="password">
              Password
            </FormLabel>
            <Input
              id="password"
              placeholder="Enter password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <FormControl my={16}>
            <Button
              type="submit"
              color={"white"}
              bg={"primary.dark"}
              _hover={{ bg: "secondary.dark", color: "white" }}
            >
              Log In
            </Button>
          </FormControl>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
