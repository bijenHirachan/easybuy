import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  HStack,
  Heading,
  IconButton,
  Img,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsCartPlus, BsCartDash } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCart,
  removeFromCart,
  updateItemsInWishlist,
} from "../redux/actions/cartActions";

const ProductCard = ({ product }) => {
  const [inCart, setInCart] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);

  const { cartItems, wishlist } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    const exist = cartItems.find((item) => item._id === product._id);
    if (exist) {
      setInCart(true);
    } else {
      setInCart(false);
    }
  }, [cartItems]);

  useEffect(() => {
    const exist = wishlist.find((item) => item._id === product._id);
    if (exist) {
      setInWishlist(true);
    } else {
      setInWishlist(false);
    }
  }, [wishlist]);

  const addToCartHandler = () => {
    dispatch(addToCart(product, 1));
  };

  const removeFromCartHandler = () => {
    dispatch(removeFromCart(product));
  };

  const updateWishlistHandler = () => {
    dispatch(updateItemsInWishlist(product));
  };

  return (
    <Card border={"1px solid rgba(83, 78, 97, 0.10)"} shadow={0}>
      <CardBody p={8} display={"flex"} justifyContent={"center"}>
        <Link to={`/products/${product._id}`}>
          <Img
            boxSize={"200px"}
            objectFit={"contain"}
            src={product.poster.url}
            alt={product.title}
          />
        </Link>
      </CardBody>
      <CardFooter
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Heading as="h3" size={"md"} textAlign={"center"} color={"black100"}>
          {product.title}
        </Heading>

        <HStack justifyContent={"space-between"} w="full">
          <Box>
            <Text
              color={"black100"}
              my={4}
              fontSize={"lg"}
              fontWeight={"semibold"}
            >
              € {product.price}
            </Text>
          </Box>
          <HStack>
            <Tooltip
              hasArrow
              label={inWishlist ? "Remove From WishList" : "Add To WishList"}
              openDelay={500}
            >
              <IconButton
                size={"xs"}
                fontSize={"xl"}
                variant={"link"}
                color={"tertiary.dark"}
                icon={inWishlist ? <AiFillHeart /> : <AiOutlineHeart />}
                onClick={updateWishlistHandler}
                _hover={{ transform: "scale(1.2)", transition: "all 0.5s" }}
              />
            </Tooltip>
            {inCart ? (
              <Tooltip hasArrow label="Remove From Cart" openDelay={500}>
                <IconButton
                  size={"xs"}
                  fontSize={"xl"}
                  variant={"link"}
                  color={"tertiary.dark"}
                  icon={<BsCartDash color="black100" />}
                  onClick={removeFromCartHandler}
                  _hover={{ transform: "scale(1.2)", transition: "all 0.5s" }}
                />
              </Tooltip>
            ) : (
              <Tooltip hasArrow label="Add To Cart" openDelay={500}>
                <IconButton
                  size={"xs"}
                  fontSize={"xl"}
                  variant={"link"}
                  color={"tertiary.dark"}
                  icon={<BsCartPlus color="black100" />}
                  onClick={addToCartHandler}
                  _hover={{ transform: "scale(1.2)", transition: "all 0.5s" }}
                />
              </Tooltip>
            )}
          </HStack>
        </HStack>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
