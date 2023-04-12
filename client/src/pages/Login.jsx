import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/userActions";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ isAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { message, loading } = useSelector((state) => state.user);

  const handleLogin = async (e) => {
    e.preventDefault();
    await dispatch(login(email, password));
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  useEffect(() => {
    if (message) {
      navigate("/profile");
    }
  }, [message]);

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
              focusBorderColor="primary.dark"
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
              focusBorderColor="primary.dark"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Box my={4}>
            <Link to={"/forgotpassword"}>
              <Button fontSize={"sm"} variant="link" color={"black100"}>
                Forget Password?
              </Button>
            </Link>
          </Box>

          <FormControl my={8}>
            <Button
              isLoading={loading}
              type="submit"
              color={"white"}
              bg={"primary.dark"}
              _hover={{ bg: "secondary.dark", color: "white" }}
            >
              Log In
            </Button>
          </FormControl>

          <Box fontSize={"sm"} fontWeight={"semibold"} color={"black100"}>
            New User?{" "}
            <Link to={"/register"}>
              <Button fontSize={"sm"} colorScheme={"purple"} variant="link">
                Sign Up
              </Button>{" "}
            </Link>
            here
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
