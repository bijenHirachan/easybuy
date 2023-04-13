import {
  Badge,
  Box,
  Button,
  HStack,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryProducts,
  loadProducts,
} from "../redux/actions/productActions";
import { getAllCategories } from "../redux/actions/categoryActions";
import { BiCategory } from "react-icons/bi";

const Products = () => {
  const { error, message, products, totalPages } = useSelector(
    (state) => state.product
  );

  const [allCategories, setAllCategories] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("");

  const [currentPage, setCurrentPage] = useState(0);

  const { categories } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProducts(currentPage));
    dispatch(getAllCategories());
  }, []);

  const prevPageHandler = async () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPageHandler = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const allCategoryHandler = () => {
    setAllCategories(true);
    dispatch(loadProducts(currentPage));
  };

  const getCategoryProductsHandler = async (category) => {
    setAllCategories(false);
    setSelectedCategory(category);
    dispatch(getCategoryProducts(category, currentPage));
  };

  useEffect(() => {
    if (allCategories) {
      dispatch(loadProducts(currentPage));
    } else {
      dispatch(getCategoryProducts(selectedCategory, currentPage));
    }
  }, [currentPage]);

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
            <MenuItem onClick={allCategoryHandler}>All</MenuItem>
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
      <HStack py={4} justifyContent={"space-between"}>
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={prevPageHandler}
          isDisabled={currentPage === 0}
        >
          Prev
        </Button>
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={nextPageHandler}
          isDisabled={currentPage === totalPages - 1}
        >
          Next
        </Button>
      </HStack>
    </Box>
  );
};

export default Products;
