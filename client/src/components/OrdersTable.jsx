import {
  Badge,
  Button,
  Card,
  Grid,
  GridItem,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeDeliveryStatus,
  getAllOrders,
} from "../redux/actions/userActions";

const OrdersTable = () => {
  const [orderId, setOrderId] = useState("");
  const { orders, loading } = useSelector((state) => state.admin);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  const changeDeliveryStatusHandler = async (id) => {
    setOrderId(id);
    await dispatch(changeDeliveryStatus(id));
    dispatch(getAllOrders());
  };

  return (
    <VStack gap={1} w={"100%"}>
      {orders &&
        orders.length > 0 &&
        orders.map((order) => (
          <Card key={order._id} px={4} py={2} w={"full"}>
            <Grid templateColumns={"1fr 1fr 1fr"}>
              <GridItem alignItems={"flex-start"}>
                <Text
                  fontSize={"xs"}
                  color={"black100"}
                  fontWeight={"semibold"}
                >
                  {order.shipping.name}
                </Text>
                <Text
                  textDecoration={"underline"}
                  fontSize={"xs"}
                  color={"black100"}
                >
                  {order.shipping.email}
                </Text>
                <Text fontSize={"xs"} color={"black100"}>
                  {order.shipping.address?.line1}
                  {", "}
                  {order.shipping.address.postal_code}{" "}
                  {order.shipping.address.city}
                </Text>
              </GridItem>
              <GridItem display={"flex"} flexDirection={"column"} gap={1}>
                {order.products.map((product, index) => (
                  <HStack key={index}>
                    <Button
                      variant={"outline"}
                      size={"xs"}
                      rounded={0}
                      color={"black100"}
                    >
                      {product.title}
                    </Button>
                    <Button
                      variant={"outline"}
                      size={"xs"}
                      rounded={0}
                      color={"black100"}
                    >
                      {product.quantity}
                    </Button>
                  </HStack>
                ))}
              </GridItem>
              <GridItem display={"flex"} alignItems={"center"} gap={1}>
                <HStack width={"50%"}>
                  <Badge bg={"green.400"} color={"green.50"} size={"xs"}>
                    {order.payment_status}
                  </Badge>
                  <Badge
                    bg={
                      order.delivery_status === "pending"
                        ? "red.400"
                        : "green.400"
                    }
                    color={
                      order.delivery_status === "pending"
                        ? "red.50"
                        : "green.50"
                    }
                    size={"xs"}
                  >
                    {order.delivery_status}
                  </Badge>
                </HStack>

                <Button
                  isLoading={orderId === order._id && loading}
                  rounded={0}
                  color={"black100"}
                  variant={"outline"}
                  size={"xs"}
                  fontWeight={"semibold"}
                  colorScheme="purple"
                  onClick={() => changeDeliveryStatusHandler(order._id)}
                >
                  Change Status
                </Button>
              </GridItem>
            </Grid>
          </Card>
        ))}
    </VStack>
  );
};

export default OrdersTable;
