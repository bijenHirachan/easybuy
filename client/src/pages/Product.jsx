import {
  Box,
  Button,
  HStack,
  Heading,
  IconButton,
  Img,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions/cartAction";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../redux/actions/productActions";

const Product = () => {
  const [quantity, setQuantity] = useState(1);

  const toast = useToast();

  const params = useParams();

  const { singleProduct: product } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  const addToCartHandler = (item) => {
    dispatch(addToCart(item, quantity));
  };

  useEffect(() => {
    dispatch(getSingleProduct(params.id));
  }, [dispatch, params.id]);

  return (
    // <>
    //   {product && (
    //     <Stack my={16} w={"100%"} flexDirection={["column", "row"]}>
    //       <Box w={"50%"} p={8} display={"flex"} justifyContent={"center"}>
    //         <Img src={product.poster.url} alt={product.name} />
    //       </Box>
    //       <Box w={"50%"} p={8}>
    //         <Heading color={"black100"}>{product.name}</Heading>
    //         <Text my={4} fontSize={"2xl"} color={"secondary.light"}>
    //           € {product.price}
    //         </Text>
    //         <Text>{product.description}</Text>

    //         <HStack my={8}>
    //           <HStack>
    //             <IconButton
    //               onClick={() => {
    //                 if (quantity > 1) setQuantity(quantity - 1);
    //                 else {
    //                   toast({
    //                     description: "You can't select less than 1 product",
    //                     status: "info",
    //                   });
    //                 }
    //               }}
    //               icon={<AiOutlineMinus />}
    //             />
    //             <Heading color={"black100"} size={"md"}>
    //               {quantity}
    //             </Heading>
    //             <IconButton
    //               onClick={() => {
    //                 if (quantity < product.inStock) setQuantity(quantity + 1);
    //                 else {
    //                   toast({
    //                     description: `Only ${product.inStock} items are available`,
    //                     status: "info",
    //                   });
    //                 }
    //               }}
    //               icon={<AiOutlinePlus />}
    //             />
    //           </HStack>
    //           <Button
    //             color={"black100"}
    //             leftIcon={<BsCartPlus color="black100" />}
    //             onClick={() => addToCartHandler(product)}
    //           >
    //             Add to cart
    //           </Button>
    //         </HStack>
    //       </Box>
    //     </Stack>
    //   )}
    // </>
    <>
      {product && (
        <Stack my={16} w={"100%"} flexDirection={["column", "row"]}>
          <Box
            w={["100%", "50%"]}
            p={8}
            display={"flex"}
            justifyContent={"center"}
          >
            <Img
              src={product.poster.url}
              alt={product.name}
              boxSize={["200px", "300px"]}
              objectFit={"contain"}
            />
          </Box>
          <Box w={["100%", "50%"]} p={8}>
            <Heading textAlign={["center", "left"]} color={"black100"}>
              {product.title}
            </Heading>
            <Text
              textAlign={["center", "left"]}
              my={4}
              fontSize={"2xl"}
              color={"tertiary.dark"}
            >
              € {product.price}
            </Text>
            <Text textAlign={["center", "left"]}>{product.description}</Text>

            <HStack my={16} justifyContent={["center", "flex-start"]}>
              <HStack>
                <IconButton
                  onClick={() => {
                    if (quantity > 1) setQuantity(quantity - 1);
                    else {
                      toast({
                        description: "You can't select less than 1 product",
                        status: "info",
                      });
                    }
                  }}
                  icon={<AiOutlineMinus />}
                />
                <Heading color={"black100"} size={"md"}>
                  {quantity}
                </Heading>
                <IconButton
                  onClick={() => {
                    if (quantity < product.inStock) setQuantity(quantity + 1);
                    else {
                      toast({
                        description: `Only ${product.inStock} items are available`,
                        status: "info",
                      });
                    }
                  }}
                  icon={<AiOutlinePlus />}
                />
              </HStack>
              <Button
                color={"black100"}
                leftIcon={<BsCartPlus color="black100" />}
                onClick={() => addToCartHandler(product)}
              >
                Add to cart
              </Button>
            </HStack>
          </Box>
        </Stack>
      )}
    </>
  );
};

export default Product;
