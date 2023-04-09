import {
  Avatar,
  IconButton,
  Image,
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

const ProductsTable = () => {
  const { products } = useSelector((state) => state.product);

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
                  <Image boxSize={8} objectFit={"contain"} src={p.poster.url} />
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
                    colorScheme="green"
                    icon={<AiOutlineEdit />}
                    onClick={() => handleUpdateUserRole(p._id)}
                  />

                  <IconButton
                    variant={"link"}
                    colorScheme="red"
                    icon={<AiOutlineDelete />}
                    onClick={() => handleUserDelete(p._id)}
                  />
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ProductsTable;
