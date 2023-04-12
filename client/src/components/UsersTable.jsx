import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Button,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getAllUsers,
  updateUserRole,
} from "../redux/actions/userActions";
import { useRef, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const UsersTable = () => {
  const { users } = useSelector((state) => state.user);

  const { loading } = useSelector((state) => state.admin);

  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelRef = useRef();

  const dispatch = useDispatch();

  const handleUpdateUserRole = async (id) => {
    await dispatch(updateUserRole(id));
    dispatch(getAllUsers());
  };

  const handleUserDelete = async (user) => {
    onOpen();
    setId(user._id);
    setName(user.name);
  };

  const submitUserDeleteHandler = async () => {
    await dispatch(deleteUser(id));
    await dispatch(getAllUsers());
    onClose();
  };

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Delete {name} ?</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                isLoading={loading}
                colorScheme="red"
                onClick={submitUserDeleteHandler}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

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
                      color="tertiary.dark"
                      icon={<AiOutlineEdit />}
                      onClick={() => handleUpdateUserRole(u._id)}
                    />

                    <IconButton
                      variant={"link"}
                      color="tertiary.dark"
                      icon={<RiDeleteBin6Line />}
                      onClick={() => handleUserDelete(u)}
                    />
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UsersTable;
