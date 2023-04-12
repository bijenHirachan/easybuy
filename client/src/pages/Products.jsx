import {
  Box,
  Button,
  HStack,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryProducts,
  loadProducts,
} from "../redux/actions/productActions";
import { getAllCategories } from "../redux/actions/categoryAction";
import { BiCategory } from "react-icons/bi";

const Products = () => {
  const { error, message, products } = useSelector((state) => state.product);

  const { categories } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProducts());
    dispatch(getAllCategories());
  }, []);

  const getCategoryProductsHandler = async (category) => {
    dispatch(getCategoryProducts(category));
  };

  return (
    <Box>
      <HStack justifyContent={"space-between"}>
        <Heading my={8} color={"black100"}>
          Products
        </Heading>
        <Menu>
          <MenuButton as={Button} rightIcon={<BiCategory />}>
            Categories
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => dispatch(loadProducts())}>All</MenuItem>
            {categories &&
              categories.length > 0 &&
              categories.map((cat) => (
                <MenuItem
                  onClick={() => getCategoryProductsHandler(cat._id)}
                  key={cat._id}
                >
                  {cat.title}
                </MenuItem>
              ))}
          </MenuList>
        </Menu>
      </HStack>

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
