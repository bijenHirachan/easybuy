import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../redux/actions/userActions";
import { useNavigate } from "react-router-dom";

export const fileUploadCSS = {
  cursor: "pointer",
  marginLeft: "-5%",
  width: "110%",
  border: "none",
  height: "100%",
  color: "#8D72E1",
  backgroundColor: "white",
};

const fileUploadStyle = {
  "&::file-selector-button": fileUploadCSS,
};

const Register = ({ isAuthenticated }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      setImagePreview(reader.result);
      setImage(file);
    };
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("password", password);
    myForm.append("file", image);

    await dispatch(register(myForm));
    setEmail("");
    setPassword("");
    setImage("");
    setImagePreview("");
    navigate("/");
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  return (
    <Box marginTop={"48px"}>
      {/* <Heading color={"black100"}>Login</Heading> */}
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <form onSubmit={handleRegister}>
          <Box display={"flex"} justifyContent={"center"}>
            <Avatar src={imagePreview} size={"2xl"} />
          </Box>
          <FormControl my={4}>
            <FormLabel fontSize={"xs"} color={"black100"} htmlFor="name">
              Name
            </FormLabel>
            <Input
              id="name"
              placeholder="Enter name"
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl my={4}>
            <FormLabel fontSize={"xs"} color={"black100"} htmlFor="email">
              Email
            </FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="abc@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl my={4}>
            <FormLabel fontSize={"xs"} color={"black100"} htmlFor="password">
              Password
            </FormLabel>
            <Input
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <FormControl my={4}>
            <FormLabel fontSize={"xs"} color={"black100"} htmlFor="avatar">
              Avatar
            </FormLabel>
            <Input
              id="avatar"
              accept="image/*"
              type="file"
              css={fileUploadStyle}
              onChange={changeImageHandler}
            />
          </FormControl>

          <FormControl my={16}>
            <Button
              type="submit"
              color={"white"}
              bg={"primary.dark"}
              _hover={{ bg: "secondary.dark", color: "white" }}
            >
              Sign Up
            </Button>
          </FormControl>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
