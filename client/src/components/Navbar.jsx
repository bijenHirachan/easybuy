import React from "react";
import { HStack, Box, Button, Image, Input, VStack } from "@chakra-ui/react";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { RxCaretDown } from "react-icons/rx";

const Navbar = () => {
  return (
    <Box>
      <HStack justifyContent={"space-between"} alignItems={"center"}>
        <Box>
          <Image boxSize="200px" objectFit="contain" src="./logo.svg" alt="" />
        </Box>
        <Box>
          <Input
            width={"400px"}
            placeholder="Search"
            size="md"
            focusBorderColor="#8D72E1"
          />
        </Box>
        <HStack gap={4} alignItems={"center"}>
          <Button variant={"link"}>Login</Button>
          <Button variant={"link"}>
            <AiOutlineHeart fontSize={22} />
          </Button>
          <Button variant={"link"}>
            <AiOutlineShoppingCart fontSize={22} />
          </Button>
        </HStack>
      </HStack>
      <Box borderBottom={"1px solid #dbd9e1"} pb={2}>
        <HStack>
          <Button
            variant={"outline"}
            fontSize={"sm"}
            rightIcon={<RxCaretDown />}
          >
            Categories
          </Button>
          <Button
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
