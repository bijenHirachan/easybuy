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

const ProductCard = ({ product }) => {
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
          {product.name}
        </Heading>
        <Text my={4} fontSize={"lg"} color={"black75"}>
          € {product.price}
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
