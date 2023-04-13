import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  HStack,
  IconButton,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createFeaturedProduct,
  deleteFeaturedProduct,
  getFeaturedProducts,
} from "../redux/actions/productActions";
import { RiDeleteBin6Line } from "react-icons/ri";

const FeaturedProducts = () => {
  const [product, setProduct] = useState("");
  const { products, featuredProducts, loading, error, message } = useSelector(
    (state) => state.product
  );

  const [deleteProduct, setDeleteProduct] = useState({ _id: "", title: "" });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelRef = useRef();

  const dispatch = useDispatch();

  const addFeaturedProductHandler = async (e) => {
    e.preventDefault();
    await dispatch(createFeaturedProduct(product));
    await dispatch(getFeaturedProducts());
  };

  const deleteFeaturedProductHandler = (product) => {
    setDeleteProduct(product);
    onOpen();
  };

  const submitDeleteFeaturedProductHandler = async () => {
    await dispatch(deleteFeaturedProduct(deleteProduct._id));
    await dispatch(getFeaturedProducts());
  };

  useEffect(() => {
    onClose();
  }, [error, message]);

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete {deleteProduct.title} ?
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                isLoading={loading}
                onClick={submitDeleteFeaturedProductHandler}
                colorScheme="red"
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Box my={6}>
        <form onSubmit={addFeaturedProductHandler}>
          <HStack>
            <Select
              width={"50%"}
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value={""}>----Select One----</option>
              {products &&
                products.length > 0 &&
                products.map((prod) => (
                  <option key={prod._id} value={prod._id}>
                    {prod.title}
                  </option>
                ))}
            </Select>
            <Button
              type="submit"
              color={"white"}
              bg={"primary.dark"}
              _hover={{ bg: "secondary.dark", color: "white" }}
            >
              Add
            </Button>
          </HStack>
        </form>
        <Box mt={6} bg={"tertiary.light"} color={"tertiary.dark"} px={4} py={2}>
          <Text fontSize={"sm"} fontWeight={"semibold"} textAlign={"center"}>
            Please include 4 featured products else it will not be seen on the
            hero page.
          </Text>
        </Box>
        <Table my={6}>
          <Thead>
            <Tr>
              <Th>S.N.</Th>
              <Th>Featured Product</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {featuredProducts &&
              featuredProducts.length > 0 &&
              featuredProducts.map((featProd, index) => (
                <Tr key={featProd._id}>
                  <Td>{index + 1}</Td>
                  <Td>{featProd.title}</Td>
                  <Td>
                    <IconButton
                      variant={"link"}
                      color={"tertiary.dark"}
                      icon={<RiDeleteBin6Line />}
                      onClick={() => deleteFeaturedProductHandler(featProd)}
                    />
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default FeaturedProducts;
