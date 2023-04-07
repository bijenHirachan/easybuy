import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../redux/actions/userActions";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const { error, message } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const toast = useToast();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    await dispatch(forgotPassword(email));

    setEmail("");
  };

  useEffect(() => {
    if (error) {
      toast({
        description: error,
        status: "error",
      });
    }
    if (message) {
      toast({
        description: message,
        status: "success",
      });
      navigate("/");
    }
  }, [dispatch, error, message]);

  return (
    <form onSubmit={handleForgotPassword}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        p={16}
        gap={6}
      >
        <FormControl width={"30%"}>
          <FormLabel color={"black100"} fontSize={"sm"} htmlFor="email">
            Email
          </FormLabel>
          <Input
            focusBorderColor="primary.dark"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <Button
          w={"30%"}
          type="submit"
          color={"white"}
          bg={"primary.dark"}
          _hover={{ bg: "secondary.dark", color: "white" }}
        >
          SEND
        </Button>
      </Box>
    </form>
  );
};

export default ForgotPassword;
