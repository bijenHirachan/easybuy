import React, { useEffect } from "react";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Image,
  SimpleGrid,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

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

const BoxSkeleton = () => (
  <>
    <Skeleton
      boxSize={"200px"}
      objectFit={"contain"}
      position={"absolute"}
      top={0}
      bottom={0}
      right={0}
      left={0}
      margin={"auto"}
    />

    <Skeleton
      style={{
        background: "#E04F4F",
        color: "white",
        fontWeight: "bold",
        padding: "5px 10px",
        position: "absolute",
        right: "16px",
        bottom: "16px",
        zIndex: 2,
        width: "42px",
        height: "34px",
      }}
    />
  </>
);

const Hero = () => {
  const { loading, featuredProducts } = useSelector((state) => state.product);

  return (
    <>
      {loading ? (
        <Box marginTop={"48px"}>
          <Heading textAlign={"center"} color={"black100"}>
            Featured Products
          </Heading>
          <Grid
            my={6}
            h={["1200px", "600px"]}
            templateRows={["repeat(5, 1fr)", "repeat(2, 1fr)"]}
            templateColumns={["1fr", "repeat(6, 1fr)"]}
            gap={2}
          >
            <GridItem
              colSpan={[1, 2]}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              border={"1px solid #dbd9e1"}
              position={"relative"}
            >
              <BoxSkeleton />
            </GridItem>
            <GridItem
              colSpan={[1, 2]}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              border={"1px solid #dbd9e1"}
              position={"relative"}
            >
              <BoxSkeleton />
            </GridItem>
            <GridItem
              colSpan={[1, 2]}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              border={"1px solid #dbd9e1"}
              position={"relative"}
            >
              <BoxSkeleton />
            </GridItem>
            <GridItem
              colSpan={[1, 4]}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              border={"1px solid #dbd9e1"}
              gap={2}
            >
              <Heading size={"lg"} color={"primary.dark"}>
                Hurry up
              </Heading>
              <Heading color={"error"}>Sale upto 50%</Heading>
            </GridItem>
            <GridItem
              colSpan={[1, 2]}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              border={"1px solid #dbd9e1"}
              position={"relative"}
            >
              <BoxSkeleton />
            </GridItem>
          </Grid>
        </Box>
      ) : (
        <>
          {featuredProducts && featuredProducts.length > 0 && (
            <Box marginTop={"48px"}>
              <Heading textAlign={"center"} color={"black100"}>
                Featured Products
              </Heading>
              <Grid
                my={6}
                h={["1200px", "600px"]}
                templateRows={["repeat(5, 1fr)", "repeat(2, 1fr)"]}
                templateColumns={["1fr", "repeat(6, 1fr)"]}
                gap={2}
              >
                <GridItem
                  colSpan={[1, 2]}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  border={"1px solid #dbd9e1"}
                  position={"relative"}
                >
                  <Link to={`/products/${featuredProducts[0]._id}`}>
                    <Image
                      boxSize={"150px"}
                      objectFit={"contain"}
                      src={featuredProducts[0].poster.url}
                    />
                  </Link>

                  <Badge price={featuredProducts[0].price} />
                </GridItem>
                <GridItem
                  colSpan={[1, 2]}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  border={"1px solid #dbd9e1"}
                  position={"relative"}
                >
                  <Link to={`/products/${featuredProducts[1]._id}`}>
                    <Image
                      boxSize={"150px"}
                      objectFit={"contain"}
                      src={featuredProducts[1].poster.url}
                    />
                  </Link>

                  <Badge price={featuredProducts[1].price} />
                </GridItem>
                <GridItem
                  colSpan={[1, 2]}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  border={"1px solid #dbd9e1"}
                  position={"relative"}
                >
                  <Link to={`/products/${featuredProducts[2]._id}`}>
                    <Image
                      boxSize={"150px"}
                      objectFit={"contain"}
                      src={featuredProducts[2].poster.url}
                    />
                  </Link>
                  <Badge price={featuredProducts[2].price} />
                </GridItem>
                <GridItem
                  colSpan={[1, 4]}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  border={"1px solid #dbd9e1"}
                  gap={2}
                >
                  <Heading size={"lg"} color={"primary.dark"}>
                    Hurry up
                  </Heading>
                  <Heading color={"error"}>Sale upto 50%</Heading>
                </GridItem>
                <GridItem
                  colSpan={[1, 2]}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  border={"1px solid #dbd9e1"}
                  position={"relative"}
                >
                  <Link to={`/products/${featuredProducts[3]._id}`}>
                    <Image
                      boxSize={"150px"}
                      objectFit={"contain"}
                      src={featuredProducts[3].poster.url}
                    />
                  </Link>

                  <Badge price={featuredProducts[3].price} />
                </GridItem>
              </Grid>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default Hero;
