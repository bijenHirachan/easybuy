import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  loadProducts,
  updateProduct,
} from "../redux/actions/productActions";
import { useRef, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const ProductsTable = () => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState("");
  const [category, setCategory] = useState("");

  const { products, loading, error, message } = useSelector(
    (state) => state.product
  );

  const { categories } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  const cancelRef = useRef();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const {
    isOpen: isDeleteOpen,
    onClose: onDeleteClose,
    onOpen: onDeleteOpen,
  } = useDisclosure();

  const handleProductUpdate = (product) => {
    onOpen();
    setId(product._id);
    setTitle(product.title);
    setDescription(product.description);
    setPrice(product.price);
    setInStock(product.inStock);
    setCategory(product.category);
  };

  const handleDeleteProduct = (product) => {
    onDeleteOpen();
    setId(product._id);
    setTitle(product.title);
  };

  const submitUpdateProductHandler = async (e) => {
    e.preventDefault();

    await dispatch(
      updateProduct(id, title, description, price, inStock, category)
    );
    await dispatch(loadProducts());
    onClose();
  };

  const submitDeleteProductHandler = async () => {
    await dispatch(deleteProduct(id));
    await dispatch(loadProducts());

    onDeleteClose();
  };

  return (
    <>
      <AlertDialog
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Delete {title} ?</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button
                isLoading={loading}
                colorScheme="red"
                onClick={submitDeleteProductHandler}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>Update Product</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={submitUpdateProductHandler}>
            <ModalBody display={"flex"} flexDirection={"column"} gap={2}>
              <FormControl>
                <FormLabel color={"black100"} fontSize={"xs"} htmlFor="title">
                  Title
                </FormLabel>
                <Input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel
                  color={"black100"}
                  fontSize={"xs"}
                  htmlFor="description"
                >
                  Description
                </FormLabel>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel color={"black100"} fontSize={"xs"} htmlFor="price">
                  Price
                </FormLabel>
                <Input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel color={"black100"} fontSize={"xs"} htmlFor="instock">
                  In Stock
                </FormLabel>
                <Input
                  id="instock"
                  type="number"
                  value={inStock}
                  onChange={(e) => setInStock(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel
                  fontSize={"sm"}
                  color={"black100"}
                  htmlFor="category"
                >
                  Category
                </FormLabel>
                <Select
                  focusBorderColor="primary.light"
                  id="category"
                  type="number"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  color={"black100"}
                >
                  <option value={""}>None</option>
                  {categories &&
                    categories.length > 0 &&
                    categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.title}
                      </option>
                    ))}
                </Select>
              </FormControl>
              <Button
                isLoading={loading}
                type="submit"
                color={"white"}
                bg={"primary.dark"}
                _hover={{ bg: "secondary.dark", color: "white" }}
                my={4}
              >
                Update
              </Button>
            </ModalBody>
          </form>
        </ModalContent>
      </Modal>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Avatar</Th>
              <Th>Product</Th>
              <Th>Description</Th>
              <Th>Price</Th>
              <Th>In Stock</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products &&
              products.length > 0 &&
              products.map((p) => (
                <Tr key={p._id}>
                  <Td>
                    {/* <Avatar size={"sm"} src={p.poster.url} /> */}
                    <Image
                      boxSize={8}
                      objectFit={"contain"}
                      src={p.poster.url}
                    />
                  </Td>
                  <Td>{p.title}</Td>
                  <Td maxWidth={"100px"} overflow={"hidden"}>
                    {p.description}
                  </Td>
                  <Td>€ {p.price}</Td>
                  <Td>{p.inStock}</Td>
                  <Td>
                    <IconButton
                      variant={"link"}
                      color="tertiary.dark"
                      icon={<AiOutlineEdit />}
                      onClick={() => handleProductUpdate(p)}
                    />

                    <IconButton
                      variant={"link"}
                      color="tertiary.dark"
                      icon={<RiDeleteBin6Line />}
                      onClick={() => handleDeleteProduct(p)}
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

export default ProductsTable;
