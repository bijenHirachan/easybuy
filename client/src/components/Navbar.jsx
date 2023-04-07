import {
  HStack,
  Box,
  Button,
  Image,
  Input,
  IconButton,
  Avatar,
  VStack,
  useDisclosure,
  SlideFade,
} from "@chakra-ui/react";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { RxCaretDown } from "react-icons/rx";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { SiGnuprivacyguard } from "react-icons/si";
import { RiLockPasswordLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/userActions";

const Navbar = ({ isAuthenticated, user }) => {
  const dispatch = useDispatch();

  const { isOpen, onToggle } = useDisclosure();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Box>
      <HStack justifyContent={"space-between"} alignItems={"center"}>
        <Box>
          <Link to={"/"}>
            <Image
              boxSize="200px"
              objectFit="contain"
              src={logo}
              alt="easy-buy"
            />
          </Link>
        </Box>
        <Box>
          <Input
            width={"400px"}
            placeholder="Search"
            size="md"
            focusBorderColor="primary.dark"
          />
        </Box>
        <HStack gap={4} alignItems={"center"} position={"relative"}>
          <IconButton
            color={"black100"}
            icon={<Avatar size={"xs"} />}
            onClick={onToggle}
            variant={"link"}
          />

          <Box position={"absolute"} top={8} right={32}>
            <SlideFade in={isOpen}>
              <Box
                p={4}
                border={"1px solid rgba(83, 78, 97, 0.3)"}
                borderRadius={4}
              >
                {isAuthenticated ? (
                  <VStack alignItems={"flex-start"} gap={1}>
                    <Button
                      onClick={logoutHandler}
                      variant={"link"}
                      leftIcon={<BiLogOut />}
                      color={"black100"}
                    >
                      Logout
                    </Button>
                    <Button
                      color={"black100"}
                      leftIcon={<RiLockPasswordLine />}
                      variant={"link"}
                      onClick={onToggle}
                    >
                      Change Password
                    </Button>
                    <Button
                      color={"black100"}
                      leftIcon={<CgProfile />}
                      variant={"link"}
                      onClick={onToggle}
                    >
                      Update Profile
                    </Button>
                  </VStack>
                ) : (
                  <VStack alignItems={"flex-start"} gap={1}>
                    <Link to="/login">
                      <Button
                        leftIcon={<BiLogIn />}
                        variant={"link"}
                        color={"black100"}
                        onClick={onToggle}
                      >
                        Login
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button
                        leftIcon={<SiGnuprivacyguard />}
                        variant={"link"}
                        color={"black100"}
                        onClick={onToggle}
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </VStack>
                )}
              </Box>
            </SlideFade>
          </Box>

          <IconButton
            color={"black100"}
            variant={"link"}
            icon={<AiOutlineHeart fontSize={22} />}
          />
          <IconButton
            color={"black100"}
            variant={"link"}
            icon={<AiOutlineShoppingCart fontSize={22} />}
          />
        </HStack>
      </HStack>
      <Box borderBottom={"1px solid #dbd9e1"} pb={2}>
        <HStack>
          <Button
            color={"black100"}
            variant={"outline"}
            fontSize={"sm"}
            rightIcon={<RxCaretDown />}
          >
            Categories
          </Button>
          <Button
            color={"black100"}
            variant={"outline"}
            fontSize={"sm"}
            rightIcon={<RxCaretDown />}
          >
            Sort
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default Navbar;
