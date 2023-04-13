import { Button, Image, VStack } from "@chakra-ui/react";
import cancel from "../assets/cancel.jpg";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";

const PaymentCancel = () => {
  return (
    <VStack py={16} gap={6}>
      <Image src={cancel} boxSize={"200px"} objectFit={"contain"} />
      <Link to={"/products"}>
        <Button
          rounded={0}
          variant={"outline"}
          color={"black100"}
          leftIcon={<BiArrowBack />}
        >
          Go back to shopping
        </Button>
      </Link>
    </VStack>
  );
};

export default PaymentCancel;
