import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getAllUsers,
  updateUserRole,
} from "../redux/actions/userActions";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const Dashboard = ({ isAuthenticated, user }) => {
  const navigate = useNavigate();

  const [selectedUser, setSelectedUser] = useState("");

  const { users } = useSelector((state) => state.user);

  const { error, message } = useSelector((state) => state.admin);

  const toast = useToast();

  const dispatch = useDispatch();

  const handleUpdateUserRole = async (id) => {
    await dispatch(updateUserRole(id));
    dispatch(getAllUsers());
  };

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
    if (user && user.role !== "admin") navigate("/");
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    if (error) {
      toast({
        description: error,
        status: "error",
      });
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast({
        description: message,
        status: "success",
      });
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message]);

  const handleUserDelete = async (id) => {
    await dispatch(deleteUser(id));
    dispatch(getAllUsers());
  };

  return (
    <Box>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Avatar</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users &&
              users.length > 0 &&
              users.map((u) => (
                <Tr key={u._id}>
                  <Td>
                    <Avatar size={"sm"} src={u.avatar.url} />
                  </Td>
                  <Td>{u.name}</Td>
                  <Td>{u.email}</Td>
                  <Td>{u.role}</Td>
                  <Td>
                    <IconButton
                      variant={"link"}
                      colorScheme="green"
                      icon={<AiOutlineEdit />}
                      onClick={() => handleUpdateUserRole(u._id)}
                    />

                    <IconButton
                      variant={"link"}
                      colorScheme="red"
                      icon={<AiOutlineDelete />}
                      onClick={() => handleUserDelete(u._id)}
                    />
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Dashboard;
