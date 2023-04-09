import { Heading, VStack } from "@chakra-ui/react";
import { AiOutlineFileExclamation } from "react-icons/ai";

const PageNotFound = () => {
  return (
    <VStack color={"black100"} pt={28}>
      <AiOutlineFileExclamation fontSize={300} />
      <Heading>Page Not Found</Heading>
    </VStack>
  );
};

export default PageNotFound;
