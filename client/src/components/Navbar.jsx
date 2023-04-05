import React from "react";
import {
  HStack,
  Box,
  Button,
  Image,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { RxCaretDown } from "react-icons/rx";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Box>
      <HStack justifyContent={"space-between"} alignItems={"center"}>
        <Box>
          <Link to={"/"}>
            <Image
              boxSize="200px"
              objectFit="contain"
              src={logo}
              alt="easy-buy"
            />
          </Link>
        </Box>
        <Box>
          <Input
            width={"400px"}
            placeholder="Search"
            size="md"
            focusBorderColor="primary.dark"
          />
        </Box>
        <HStack gap={4} alignItems={"center"}>
          <Button variant={"link"} color={"black100"}>
            Login
          </Button>
          <IconButton
            color={"black100"}
            variant={"link"}
            icon={<AiOutlineHeart fontSize={22} />}
          />
          <IconButton
            color={"black100"}
            variant={"link"}
            icon={<AiOutlineShoppingCart fontSize={22} />}
          />
        </HStack>
      </HStack>
      <Box borderBottom={"1px solid #dbd9e1"} pb={2}>
        <HStack>
          <Button
            color={"black100"}
            variant={"outline"}
            fontSize={"sm"}
            rightIcon={<RxCaretDown />}
          >
            Categories
          </Button>
          <Button
            color={"black100"}
            variant={"outline"}
            fontSize={"sm"}
            rightIcon={<RxCaretDown />}
          >
            Sort
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default Navbar;
