import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  IconButton,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { subscribeNewsletter } from "../redux/actions/userActions";

const Footer = () => {
  const [email, setEmail] = useState("");

  const { loading, message, error } = useSelector((state) => state.newsletter);

  const dispatch = useDispatch();

  const toast = useToast();

  const newsletterSubscribeHandler = (e) => {
    e.preventDefault();
    dispatch(subscribeNewsletter(email));
  };

  useEffect(() => {
    if (error) {
      toast({
        description: error,
        status: "error",
      });
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast({
        description: message,
        status: "success",
      });
      dispatch({ type: "clearMessage" });
      setEmail("");
    }
  }, [message, error]);

  return (
    <>
      <Box
        display={["none", "block"]}
        height={"400px"}
        bg={"#3D3161"}
        mt={"128px"}
      >
        <Container maxW="container.xl" py={16}>
          <HStack justifyContent={["space-between"]} gap={6}>
            <VStack alignItems={"flex-start"}>
              <Heading as={"h4"} color={"white"} size={"sn"}>
                Subscribe to our newsletter
              </Heading>
              <form onSubmit={newsletterSubscribeHandler}>
                <HStack>
                  <Input
                    value={email}
                    color={"white"}
                    focusBorderColor="primary.dark"
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button
                    isLoading={loading}
                    type="submit"
                    color={"white"}
                    bg={"primary.dark"}
                    _hover={{ bg: "secondary.dark", color: "white" }}
                  >
                    Send
                  </Button>
                </HStack>
              </form>
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
          </HStack>

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
      <Box
        display={["block", "none"]}
        height={"400px"}
        bg={"#3D3161"}
        mt={"128px"}
      >
        <Container maxW="container.xl" py={16}>
          <VStack alignItems={"flex-start"}>
            <Heading as={"h4"} color={"white"} size={"xs"} textAlign={"center"}>
              Subscribe to our newsletter
            </Heading>
            <form
              onSubmit={newsletterSubscribeHandler}
              style={{ width: "100%" }}
            >
              <HStack w={"full"}>
                <Input
                  color={"white"}
                  type="email"
                  focusBorderColor="primary.dark"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  isLoading={loading}
                  type="submit"
                  color={"white"}
                  bg={"primary.dark"}
                  _hover={{ bg: "secondary.dark", color: "white" }}
                >
                  Send
                </Button>
              </HStack>
            </form>
          </VStack>

          <HStack w="full" my={16} justifyContent={"center"} gap={6}>
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
          <Heading color={"white"} as="h4" size={"xs"} textAlign={"center"}>
            copyright &copy; www.easybuy.com
          </Heading>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
