import {
  Stack,
  Box,
  Avatar,
  VStack,
  Heading,
  Badge,
  HStack,
  Text,
  Button,
  Editable,
  EditablePreview,
  EditableInput,
  FormLabel,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loadUser,
  updateAvatar,
  updateProfile,
} from "../redux/actions/userActions";
import { fileUploadCSS } from "../pages/Register";

const fileUploadStyle = {
  "&::file-selector-button": fileUploadCSS,
};

const Profile = ({ isAuthenticated, user }) => {
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);

  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const { error, message } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile(name, email));
    dispatch(loadUser());
    setName("");
    setEmail("");
  };

  const modalOpenHandler = () => {
    setImage("");
    setImagePreview("");
    onOpen();
  };

  const changeImageHandler = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      setImagePreview(reader.result);
      setImage(file);
    };
  };

  const updateImageHandler = async (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.append("file", image);

    await dispatch(updateAvatar(myForm));
    dispatch(loadUser());
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
    }
  }, [error, message]);

  return (
    <>
      {user && (
        <Stack direction={["column", "row"]} py={16}>
          <VStack
            w={"30%"}
            alignItems={"center"}
            borderRight={"1px solid rgba(83, 78, 97, 0.50)"}
            gap={6}
          >
            <Avatar src={user.avatar.url} size={"2xl"} />
            <Button
              colorScheme="purple"
              variant={"outline"}
              onClick={modalOpenHandler}
            >
              Change Avatar
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader textAlign={"center"}>
                  Change your Avatar
                </ModalHeader>
                <ModalCloseButton />
                <form onSubmit={updateImageHandler}>
                  <ModalBody
                    padding={4}
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    gap={6}
                  >
                    <Avatar src={imagePreview} size="xl" />
                    <Input
                      type="file"
                      css={fileUploadStyle}
                      onChange={changeImageHandler}
                    />

                    <Button
                      type="submit"
                      color={"white"}
                      bg={"primary.dark"}
                      _hover={{ bg: "secondary.dark", color: "white" }}
                    >
                      Update
                    </Button>
                  </ModalBody>
                </form>
              </ModalContent>
            </Modal>
          </VStack>
          <Box w={"70%"}>
            <form onSubmit={handleUpdateProfile}>
              <VStack alignItems={"flex-start"} py={6} px={16}>
                <Editable defaultValue={user.name}>
                  <FormLabel fontSize={"sm"} color={"black100"} htmlFor="name">
                    Name
                  </FormLabel>

                  <EditablePreview color={"black100"} />
                  <EditableInput
                    id="name"
                    color={"black100"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Editable>

                <Editable defaultValue={user.email}>
                  <FormLabel fontSize={"sm"} color={"black100"} htmlFor="name">
                    Email
                  </FormLabel>

                  <EditablePreview color={"black100"} />
                  <EditableInput
                    id="email"
                    color={"black100"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Editable>
              </VStack>
              <Button
                my={6}
                mx={16}
                type="submit"
                color={"white"}
                bg={"primary.dark"}
                _hover={{ bg: "secondary.dark", color: "white" }}
              >
                Update
              </Button>
            </form>
          </Box>
        </Stack>
      )}
    </>
  );
};

export default Profile;
