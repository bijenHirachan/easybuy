import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Input,
  Stack,
  VStack,
} from "@chakra-ui/react";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";

const Footer = () => {
  return (
    <Box height={"400px"} bg={"#3D3161"} mt={"128px"}>
      <Container maxW="container.xl" py={16}>
        <Stack flexDirection={"row"} justifyContent={"space-between"}>
          <VStack alignItems={"flex-start"}>
            <Heading as={"h4"} color={"white"} size={"sn"}>
              Subscribe to our newsletter
            </Heading>
            <HStack>
              <Input
                color={"white"}
                focusBorderColor="#8D72E1"
                placeholder="Email address"
              />
              <Button
                textTransform={"uppercase"}
                bg="#8D72E1"
                color={"white"}
                fontWeight={"bold"}
                _hover={{ bg: "#6f47e4" }}
              >
                Send
              </Button>
            </HStack>
          </VStack>
          <VStack alignItems={"flex-start"}>
            <Heading as={"h4"} color={"white"} size={"sn"}>
              Follow us on our socials
            </Heading>
            <HStack>
              <Button
                variant={"link"}
                _hover={{ color: "#8D72E1" }}
                leftIcon={<AiOutlineFacebook />}
                fontSize={32}
                color={"white"}
              />
              <Button
                variant={"link"}
                _hover={{ color: "#8D72E1" }}
                leftIcon={<AiOutlineInstagram />}
                fontSize={32}
                color={"white"}
              />
              <Button
                variant={"link"}
                _hover={{ color: "#8D72E1" }}
                leftIcon={<AiOutlineTwitter />}
                fontSize={32}
                color={"white"}
              />
            </HStack>
          </VStack>
        </Stack>

        <Heading
          position={"absolute"}
          bottom={16}
          color={"white"}
          as="h4"
          size={"sm"}
        >
          copyright &copy; www.easybuy.com
        </Heading>
      </Container>
    </Box>
  );
};

export default Footer;
