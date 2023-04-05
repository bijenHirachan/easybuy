import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Img,
  Text,
} from "@chakra-ui/react";
import { BsCartPlus } from "react-icons/bs";
import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
  return (
    <Card border={"1px solid rgba(83, 78, 97, 0.10)"} shadow={0}>
      <CardBody p={8} display={"flex"} justifyContent={"center"}>
        <Link to={"/products/dfs"}>
          <Img
            boxSize={"200px"}
            objectFit={"contain"}
            src={item.poster.url}
            alt={item.name}
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
          {item.name}
        </Heading>
        <Text my={4} fontSize={"lg"} color={"black75"}>
          € {item.price}
        </Text>
        <Button
          color={"black100"}
          leftIcon={<BsCartPlus color="black100" />}
          width={"full"}
        >
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
