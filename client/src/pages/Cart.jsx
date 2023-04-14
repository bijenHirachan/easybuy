import {
  Box,
  Button,
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
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import emptyCart from "../assets/emptyCart.png";
import { emptyCart as clearCart } from "../redux/actions/cartActions";
import CartItem from "../components/CartItem";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import axios from "axios";
import { server } from "../redux/store";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [totalPrice, setTotalPrice] = useState(0);

  const toast = useToast();

  const dispatch = useDispatch();

  const checkoutHandler = async () => {
    if (isAuthenticated && user) {
      const { data } = await axios.post(`${server}/create-checkout-session`, {
        cartItems,
        totalPrice,
        user,
      });
      window.location.href = data.url;
    } else {
      toast({
        status: "info",
        description: "Please login first & proceed to checkout",
      });
    }
  };

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
          <VStack w={"full"}>
            <Button
              variant={"link"}
              alignSelf={"flex-start"}
              fontWeight={400}
              fontSize={"xs"}
              onClick={() => dispatch(clearCart())}
            >
              Clear CartItems
            </Button>
            <VStack
              w={"full"}
              alignItems={"flex-start"}
              borderRight={["none", "1px solid rgba(83, 78, 97, 0.25)"]}
            >
              {cartItems.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </VStack>
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
            <HStack justifyContent={"center"} py={6}>
              <Button
                onClick={checkoutHandler}
                rounded={0}
                variant={"outline"}
                color={"black100"}
                size={"lg"}
                leftIcon={<MdOutlineShoppingCartCheckout />}
              >
                Checkout
              </Button>
            </HStack>
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
