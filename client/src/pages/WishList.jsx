import React from "react";
import { useSelector } from "react-redux";
import { HStack, Heading, Image, SimpleGrid, VStack } from "@chakra-ui/react";
import WishListCard from "../components/WishListCard";
import emptyCart from "../assets/emptyCart.png";

const WishList = () => {
  const { wishlist } = useSelector((state) => state.cart);

  return (
    <>
      {wishlist && wishlist.length > 0 ? (
        <SimpleGrid
          my={8}
          spacing={4}
          templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"}
        >
          {wishlist.map((item) => (
            <WishListCard key={item._id} product={item} />
          ))}
        </SimpleGrid>
      ) : (
        <HStack justifyContent={"center"}>
          <VStack color={"black100"} pt={28}>
            <Image src={emptyCart} boxSize={"200px"} />
            <Heading as={"h5"} size={"md"}>
              Wishlist is empty
            </Heading>
          </VStack>
        </HStack>
      )}
    </>
  );
};

export default WishList;
