import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import React, { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../redux/actions/productActions";

const Products = () => {
  const { error, message, products } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProducts());
  }, []);

  return (
    <Box>
      <Heading my={8} color={"black100"}>
        Products
      </Heading>

      <SimpleGrid
        spacing={4}
        templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"}
      >
        {products &&
          products.length > 0 &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </SimpleGrid>
    </Box>
  );
};

export default Products;
