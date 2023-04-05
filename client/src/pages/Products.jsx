import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import ProductCard from "../components/ProductCard";

const data = [
  {
    _id: "1evfder",
    name: "iPhone 14",
    price: 1499,
    description:
      "Het product is refurbished en is volledig functioneel. Ondersteund door de 1-jarige Amazon Renewed Garantie.",
    poster: {
      public_id: "test",
      url: "https://m.media-amazon.com/images/I/71yzJoE7WlL._AC_UL400_.jpg",
    },
    inStock: 5,
  },
  {
    _id: "1erqwer",
    name: "iPad Mini",
    price: 1499,
    description:
      "8,3‑inch Liquid Retina-display met True Tone en brede kleurweergave A15 Bionic-chip met Neural Engine Touch ID voor veilige authenticatie en Apple Pay 12‑MP groothoekcamera aan de achterkant, 12‑MP ultragroothoekcamera aan de voorkant met Middelpunt",
    poster: {
      public_id: "test",
      url: "https://m.media-amazon.com/images/I/71kSWmdhvPL._AC_UL400_.jpg",
    },
    inStock: 25,
  },
  {
    _id: "1ereiop",
    name: "Apple Macbook Pro",
    price: 1499,
    description:
      "Schitterend 16 inch Liquid Retina XDR display met extreem dynamisch bereik en een hoge contrastverhouding",
    poster: {
      public_id: "test",
      url: "https://m.media-amazon.com/images/I/61ldExf7mbL._AC_UL400_.jpg",
    },
    inStock: 0,
  },
  {
    _id: "1ellrer",
    name: "iPhone 14",
    price: 1499,
    description:
      "Het product is refurbished en is volledig functioneel. Ondersteund door de 1-jarige Amazon Renewed Garantie.",
    poster: {
      public_id: "test",
      url: "https://m.media-amazon.com/images/I/71yzJoE7WlL._AC_UL400_.jpg",
    },
    inStock: 5,
  },
  {
    _id: "1yyerer",
    name: "iPad Mini",
    price: 1499,
    description:
      "8,3‑inch Liquid Retina-display met True Tone en brede kleurweergave A15 Bionic-chip met Neural Engine Touch ID voor veilige authenticatie en Apple Pay 12‑MP groothoekcamera aan de achterkant, 12‑MP ultragroothoekcamera aan de voorkant met Middelpunt",
    poster: {
      public_id: "test",
      url: "https://m.media-amazon.com/images/I/71kSWmdhvPL._AC_UL400_.jpg",
    },
    inStock: 25,
  },
  {
    _id: "1ertrer",
    name: "Apple Macbook Pro",
    price: 1499,
    description:
      "Schitterend 16 inch Liquid Retina XDR display met extreem dynamisch bereik en een hoge contrastverhouding",
    poster: {
      public_id: "test",
      url: "https://m.media-amazon.com/images/I/61ldExf7mbL._AC_UL400_.jpg",
    },
    inStock: 0,
  },
];
const Products = () => {
  return (
    <Box>
      <Heading my={8} color={"black100"}>
        Products
      </Heading>

      <SimpleGrid
        spacing={4}
        templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"}
      >
        {data.map((item) => (
          <ProductCard key={item._id} item={item} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Products;
