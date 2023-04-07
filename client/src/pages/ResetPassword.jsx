import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../redux/actions/userActions";
import { useToast } from "@chakra-ui/react";

const ResetPassword = ({ isAuthenticated }) => {
  const [password, setPassword] = useState("");

  const params = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const toast = useToast();

  const { error, message } = useSelector((state) => state.user);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    await dispatch(resetPassword(password, params.token));
    navigate("/login");
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/");
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
        <form onSubmit={handleResetPassword}>
          <FormControl my={4}>
            <FormLabel fontSize={"xs"} color={"black100"} htmlFor="email">
              Password
            </FormLabel>
            <Input
              id="email"
              placeholder="Enter new password"
              value={password}
              type="password"
              focusBorderColor="primary.dark"
              onChange={(e) => setPassword(e.target.value)}
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
export default ResetPassword;
