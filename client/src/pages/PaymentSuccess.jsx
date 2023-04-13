import { Button, Image, VStack } from "@chakra-ui/react";
import success from "../assets/success.jpg";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { emptyCart } from "../redux/actions/cartActions";

const PaymentSuccess = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(emptyCart());
  }, []);

  return (
    <VStack py={16} gap={6}>
      <Image src={success} />
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

export default PaymentSuccess;
