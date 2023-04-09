import {
  Avatar,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getAllUsers,
  updateUserRole,
} from "../redux/actions/userActions";

const UsersTable = () => {
  const { users } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleUpdateUserRole = async (id) => {
    await dispatch(updateUserRole(id));
    dispatch(getAllUsers());
  };

  const handleUserDelete = async (id) => {
    await dispatch(deleteUser(id));
    dispatch(getAllUsers());
  };

  return (
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
  );
};

export default UsersTable;
