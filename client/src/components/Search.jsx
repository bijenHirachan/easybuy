import {
  HStack,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getSearchProducts } from "../redux/actions/productActions";
import { Link } from "react-router-dom";

const Search = ({ onClose }) => {
  const [search, setSearch] = useState("");
  const { searchProducts } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  const searchProductsHandler = (e) => {
    e.preventDefault();
    dispatch(getSearchProducts(search));
  };

  return (
    <>
      <form onSubmit={searchProductsHandler}>
        <InputGroup color={"black100"}>
          <InputLeftElement children={<AiOutlineSearch />} />
          <Input
            focusBorderColor="primary.light"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
      </form>
      <VStack py={3}>
        {searchProducts &&
          searchProducts.length > 0 &&
          searchProducts.map((product) => (
            <HStack
              key={product._id}
              p={4}
              border={"1px solid rgba(83, 78, 97, 0.10)"}
              width={"full"}
              borderRadius={5}
            >
              <Image
                boxSize={8}
                objectFit={"contain"}
                src={product.poster.url}
              />
              <Link to={`/products/${product._id}`}>
                <Heading
                  color={"black100"}
                  pl={8}
                  as={"h4"}
                  size={"sm"}
                  _hover={{ textDecoration: "underline" }}
                  onClick={() => {
                    onClose();
                    dispatch({ type: "clearSearchProducts" });
                  }}
                >
                  {product.title}
                </Heading>
              </Link>
            </HStack>
          ))}
      </VStack>
    </>
  );
};

export default Search;
