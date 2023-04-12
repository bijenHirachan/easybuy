import {
  Grid,
  HStack,
  Heading,
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
import { useEffect, useState } from "react";
import emptyCart from "../assets/emptyCart.png";
import CartItem from "../components/CartItem";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      total += cartItems[i].price * cartItems[i].quantity;
    }
    setTotalPrice(total);
  }, [cartItems]);

  return (
    <>
      {cartItems && cartItems.length > 0 ? (
        <Grid py={6} templateColumns={["1fr", "1fr 1fr"]}>
          <VStack
            alignItems={"flex-start"}
            borderRight={["none", "1px solid rgba(83, 78, 97, 0.25)"]}
          >
            {cartItems.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </VStack>
          <TableContainer px={6} py={16}>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Product</Th>
                  <Th>Qty</Th>
                  <Th>Subtotal</Th>
                </Tr>
              </Thead>
              <Tbody>
                {cartItems &&
                  cartItems.map((item) => (
                    <Tr key={item._id}>
                      <Td>
                        {item.title}
                        <br />
                        <Text mt={2} fontSize={"xs"}>
                          € {item.price}
                        </Text>
                      </Td>
                      <Td>{item.quantity}</Td>
                      <Td>€ {item.quantity * item.price}</Td>
                    </Tr>
                  ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th textAlign={"right"} pr={16} colSpan={3}>
                    Total: {totalPrice.toFixed(2)}
                  </Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Grid>
      ) : (
        <HStack justifyContent={"center"}>
          <VStack color={"black100"} pt={28}>
            <Image src={emptyCart} boxSize={"200px"} />
            <Heading as={"h5"} size={"md"}>
              Shopping Cart is empty
            </Heading>
          </VStack>
        </HStack>
      )}
    </>
  );
};

export default Cart;
