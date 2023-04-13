import {
  Button,
  HStack,
  Heading,
  IconButton,
  Image,
  Text,
  Tooltip,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { addToCart, removeFromCart } from "../redux/actions/cartActions";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const toast = useToast();

  const increaseOneItem = (item) => {
    if (item.quantity < item.inStock) {
      dispatch(addToCart(item, item.quantity + 1));
    } else {
      toast({
        description: `Only ${item.inStock} items left in our stock`,
      });
    }
  };

  const decreaseOneItem = (item) => {
    if (item.quantity > 1) {
      dispatch(addToCart(item, item.quantity - 1));
    } else {
      toast({
        description: `You can't add less than 1 item`,
      });
    }
  };

  const removeFromCartHandler = (item) => {
    dispatch(removeFromCart(item));
  };
  return (
    <HStack
      key={item._id}
      border={"1px solid rgba(83, 78, 97, 0.25)"}
      px={4}
      py={2}
      w={"98%"}
      justifyContent={"space-between"}
    >
      <Image boxSize={"100px"} objectFit={"contain"} src={item.poster.url} />
      <VStack p={4} alignItems={"flex-end"}>
        <Heading as={"h4"} size={"md"} color={"black100"}>
          {item.title}
        </Heading>
        <Text color={"primary.dark"}>€ {item.price}</Text>

        <HStack pt={6}>
          <IconButton
            onClick={() => decreaseOneItem(item)}
            size={"xs"}
            icon={<AiOutlineMinus />}
          />
          <Text>{item.quantity}</Text>
          <IconButton
            onClick={() => increaseOneItem(item)}
            size={"xs"}
            icon={<AiOutlinePlus />}
          />
          <Tooltip label="Remove from cart">
            <IconButton
              onClick={() => removeFromCartHandler(item)}
              size={"md"}
              color={"tertiary.dark"}
              variant={"link"}
              icon={<RiDeleteBin6Line />}
            >
              Remove
            </IconButton>
          </Tooltip>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default CartItem;
