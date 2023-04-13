import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  getAllCategories,
} from "../redux/actions/categoryActions";

const CreateCategory = () => {
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();

  const toast = useToast();

  const { error, message, loading } = useSelector((state) => state.category);

  const createCategoryHandler = async (e) => {
    e.preventDefault();
    await dispatch(createCategory(title));
    await dispatch(getAllCategories());
  };

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
      setTitle("");
      dispatch({ type: "clearMessage" });
    }
  }, [error, message]);

  return (
    <HStack my={6} justifyContent={"center"}>
      <form onSubmit={createCategoryHandler}>
        <VStack gap={2} w={["300px", "400px"]}>
          <FormControl>
            <FormLabel fontSize={"sm"} color={"black100"} htmlFor="title">
              Title
            </FormLabel>
            <Input
              focusBorderColor="primary.light"
              type="text"
              id="title"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
        </VStack>
        <Button
          isLoading={loading}
          type="submit"
          color={"white"}
          bg={"primary.dark"}
          _hover={{ bg: "secondary.dark", color: "white" }}
          mt={8}
        >
          Create
        </Button>
      </form>
    </HStack>
  );
};

export default CreateCategory;
