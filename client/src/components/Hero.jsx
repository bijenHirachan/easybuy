import React from "react";
import { Box, Grid, GridItem, Heading, Image, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Badge = ({ price }) => (
  <span
    style={{
      background: "#E04F4F",
      color: "white",
      fontWeight: "bold",
      padding: "5px 10px",
      position: "absolute",
      right: "16px",
      bottom: "16px",
      zIndex: 2,
    }}
  >
    {`€ ${price}`}
  </span>
);

const Hero = () => {
  return (
    <Box marginTop={"48px"}>
      <Heading textAlign={"center"} color={"black100"}>
        Featured Products
      </Heading>
      <Grid templateColumns={"repeat(3, 1fr)"} gap={"8px"} marginTop={"32px"}>
        <GridItem position={"relative"} border={"1px solid #dbd9e1"} p={"8px"}>
          <Link to={"/products/safd"}>
            <Image
              boxSize={"400px"}
              objectFit={"contain"}
              src="https://m.media-amazon.com/images/I/71ufHRvvHaL._AC_UL400_.jpg"
            />
          </Link>
          <Badge price={"39,99"} />
        </GridItem>
        <GridItem position={"relative"} border={"1px solid #dbd9e1"} p={"8px"}>
          <Image
            boxSize={"400px"}
            objectFit={"contain"}
            src="https://m.media-amazon.com/images/I/812MHd5rzgL._AC_UL400_.jpg"
          />
          <Badge price={"59,99"} />
        </GridItem>
        <GridItem position={"relative"} border={"1px solid #dbd9e1"} p={"8px"}>
          <Image
            boxSize={"400px"}
            objectFit={"contain"}
            src="https://m.media-amazon.com/images/I/71-HHDXgzaL._AC_UL400_.jpg"
          />
          <Badge price={"35,99"} />
        </GridItem>
      </Grid>
      <Stack bg={"primary.dark"} my={"8px"} py={"16px"}>
        <Heading as={"h4"} size={"sm"} color={"white"} textAlign={"center"}>
          SALE upto 50%. Hurry up! Offer valid until 24th February
        </Heading>
      </Stack>
      <Grid gap={"8px"} templateColumns={"repeat(3, 1fr)"}>
        <GridItem
          border={"1px solid #dbd9e1"}
          p={"8px"}
          colSpan={2}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Heading color={"secondary.light"}>Big Summer Sale!</Heading>
          <Heading color={"error"}>20% Offer on all books</Heading>
        </GridItem>
        <GridItem position={"relative"} border={"1px solid #dbd9e1"} p={"8px"}>
          <Image
            boxSize={"400px"}
            objectFit={"contain"}
            src="https://m.media-amazon.com/images/I/812MHd5rzgL._AC_UL400_.jpg"
          />
          <Badge price={"5,99"} />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Hero;
