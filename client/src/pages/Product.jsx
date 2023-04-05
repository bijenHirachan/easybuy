import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  Grid,
  HStack,
  Heading,
  IconButton,
  Img,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const item = {
  _id: "1yyerer",
  name: "iPad Mini",
  price: 1499,
  description:
    "8,3‑inch Liquid Retina-display met True Tone en brede kleurweergave A15 Bionic-chip met Neural Engine Touch ID voor veilige authenticatie en Apple Pay 12‑MP groothoekcamera aan de achterkant, 12‑MP ultragroothoekcamera aan de voorkant met Middelpunt",
  poster: {
    public_id: "test",
    url: "https://m.media-amazon.com/images/I/71kSWmdhvPL._AC_UL400_.jpg",
  },
  inStock: 2,
};

const Product = () => {
  const [quantity, setQuantity] = useState(1);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const [alertMsg, setAlertMsg] = useState("");

  return (
    <Stack my={16} w={"100%"} flexDirection={["column", "row"]}>
      <Box w={"50%"} p={8} display={"flex"} justifyContent={"center"}>
        <Img src={item.poster.url} alt={item.name} />
      </Box>
      <Box w={"50%"} p={8}>
        <Heading color={"black100"}>{item.name}</Heading>
        <Text my={4} fontSize={"2xl"} color={"secondary.light"}>
          € {item.price}
        </Text>
        <Text>{item.description}</Text>
        {isOpen ? (
          <Alert my={8} status="error" w={"full"}>
            <AlertIcon />
            <Box width={"full"}>
              <AlertDescription>{alertMsg}</AlertDescription>
            </Box>
            <CloseButton
              alignSelf="flex-start"
              position="relative"
              right={-1}
              top={-1}
              onClick={onClose}
            />
          </Alert>
        ) : null}
        <HStack my={8}>
          <HStack>
            <IconButton
              onClick={() => {
                if (quantity > 1) setQuantity(quantity - 1);
                else {
                  setAlertMsg(`You can't select less than 1 product.`);
                  onOpen();
                }
              }}
              icon={<AiOutlineMinus />}
            />
            <Heading color={"black100"} size={"md"}>
              {quantity}
            </Heading>
            <IconButton
              onClick={() => {
                if (quantity < item.inStock) setQuantity(quantity + 1);
                else {
                  setAlertMsg(
                    `We have only ${item.inStock} products in our stock.`
                  );
                  onOpen();
                }
              }}
              icon={<AiOutlinePlus />}
            />
          </HStack>
          <Button color={"black100"} leftIcon={<BsCartPlus color="black100" />}>
            Add to cart
          </Button>
        </HStack>
      </Box>
    </Stack>
  );
};

export default Product;
