import {
  Box,
  Grid,
  HStack,
  Heading,
  IconButton,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <Grid py={6} templateColumns={"1fr 1fr"}>
      <VStack
        alignItems={"flex-start"}
        borderRight={"1px solid rgba(83, 78, 97, 0.25)"}
      >
        {cartItems &&
          cartItems.map((item) => (
            <HStack
              key={item._id}
              border={"1px solid rgba(83, 78, 97, 0.25)"}
              px={4}
              py={2}
              w={"98%"}
              justifyContent={"space-between"}
            >
              <Image
                boxSize={"100px"}
                objectFit={"contain"}
                src={item.poster.url}
              />
              <VStack p={4} alignItems={"flex-end"}>
                <Heading>{item.title}</Heading>
                <Text mb={6}>€ {item.price}</Text>
                <HStack pt={6}>
                  <IconButton size={"xs"} icon={<AiOutlineMinus />} />
                  <Text>10</Text>
                  <IconButton size={"xs"} icon={<AiOutlinePlus />} />
                </HStack>
              </VStack>
            </HStack>
          ))}
      </VStack>
      <TableContainer px={6}>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Product</Th>
              <Th>Price</Th>
              <Th>Quantity</Th>
              <Th>Subtotal</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cartItems &&
              cartItems.map((item) => (
                <Tr key={item._id}>
                  <Td>{item.title}</Td>
                  <Td>€ {item.price}</Td>
                  <Td>{item.quantity}</Td>
                  <Td>€ {item.quantity * item.price}</Td>
                </Tr>
              ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th textAlign={"right"} colSpan={3}>
                Total: 100
              </Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default Cart;
