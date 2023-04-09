import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { fileUploadCSS } from "../pages/Register";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, loadProducts } from "../redux/actions/productActions";

const fileUploadStyle = {
  "&::file-selector-button": fileUploadCSS,
};

const CreateProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const dispatch = useDispatch();

  const toast = useToast();

  const { error, message } = useSelector((state) => state.product);

  const imageChangeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      setImagePreview(reader.result);
      setImage(file);
    };
  };

  const createProductHandler = async (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("price", price);
    myForm.append("inStock", inStock);
    myForm.append("file", image);

    await dispatch(createProduct(myForm));
    dispatch(loadProducts());
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
      setDescription("");
      setPrice("");
      setInStock("");
      setImage("");
      setImagePreview("");
      dispatch({ type: "clearMessage" });
    }
  }, [error, message]);

  return (
    <HStack my={6} justifyContent={"center"}>
      <form onSubmit={createProductHandler}>
        <VStack gap={2} w={"400px"}>
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
          <FormControl>
            <FormLabel fontSize={"sm"} color={"black100"} htmlFor="description">
              Descrition
            </FormLabel>
            <Textarea
              focusBorderColor="primary.light"
              id="description"
              placeholder="Enter description"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize={"sm"} color={"black100"} htmlFor="price">
              Price
            </FormLabel>
            <Input
              focusBorderColor="primary.light"
              id="price"
              placeholder="Enter price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize={"sm"} color={"black100"} htmlFor="instock">
              In Stock
            </FormLabel>
            <Input
              focusBorderColor="primary.light"
              id="instock"
              placeholder="Enter quantity"
              type="number"
              value={inStock}
              onChange={(e) => setInStock(e.target.value)}
            />
          </FormControl>
          <FormControl>
            {imagePreview && (
              <HStack justifyContent={"center"}>
                <Image boxSize={20} objectFit={"contain"} src={imagePreview} />
              </HStack>
            )}

            <FormLabel fontSize={"sm"} color={"black100"} htmlFor="poster">
              Poster
            </FormLabel>
            <Input
              accept="image/*"
              focusBorderColor="primary.light"
              id="poster"
              placeholder="Enter quantity"
              type="file"
              css={fileUploadStyle}
              onChange={imageChangeHandler}
            />
          </FormControl>
        </VStack>
        <Button
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

export default CreateProduct;
