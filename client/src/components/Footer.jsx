import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  IconButton,
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
                focusBorderColor="primary.dark"
                placeholder="Email address"
              />
              <Button
                color={"white"}
                bg={"primary.dark"}
                _hover={{ bg: "secondary.dark", color: "white" }}
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
              <IconButton
                variant={"link"}
                _hover={{ color: "primary.light" }}
                icon={<AiOutlineFacebook />}
                fontSize={32}
                color={"white"}
              />
              <IconButton
                variant={"link"}
                _hover={{ color: "primary.light" }}
                icon={<AiOutlineInstagram />}
                fontSize={32}
                color={"white"}
              />
              <IconButton
                variant={"link"}
                _hover={{ color: "primary.light" }}
                icon={<AiOutlineTwitter />}
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
