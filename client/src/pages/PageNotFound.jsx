import { Image, VStack } from "@chakra-ui/react";
import pageNotFound from "../assets/404.jpg";

const PageNotFound = () => {
  return (
    <VStack color={"black100"} pt={28}>
      <Image src={pageNotFound} />
    </VStack>
  );
};

export default PageNotFound;
