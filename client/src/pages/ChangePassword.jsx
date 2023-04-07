import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../redux/actions/userActions";
import { useToast } from "@chakra-ui/react";

const ChangePassword = ({ isAuthenticated }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const toast = useToast();

  const { error, message } = useSelector((state) => state.user);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    await dispatch(changePassword(oldPassword, newPassword));
  };

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated]);

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
    }
  }, [dispatch, error, message]);

  return (
    <Box marginTop={"48px"}>
      {/* <Heading color={"black100"}>Login</Heading> */}
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <form onSubmit={handleChangePassword}>
          <FormControl my={4}>
            <FormLabel fontSize={"xs"} color={"black100"} htmlFor="email">
              Old Password
            </FormLabel>
            <Input
              id="email"
              placeholder="Enter old password"
              value={oldPassword}
              type="password"
              focusBorderColor="primary.dark"
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </FormControl>

          <FormControl my={4}>
            <FormLabel fontSize={"xs"} color={"black100"} htmlFor="password">
              New Password
            </FormLabel>
            <Input
              id="password"
              placeholder="Enter new password"
              value={newPassword}
              type="password"
              focusBorderColor="primary.dark"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </FormControl>

          <FormControl my={8}>
            <Button
              type="submit"
              color={"white"}
              bg={"primary.dark"}
              _hover={{ bg: "secondary.dark", color: "white" }}
            >
              SUBMIT
            </Button>
          </FormControl>
        </form>
      </Box>
    </Box>
  );
};

export default ChangePassword;
