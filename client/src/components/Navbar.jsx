import {
  HStack,
  Box,
  Button,
  Image,
  Input,
  IconButton,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Badge,
} from "@chakra-ui/react";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { RxCaretDown } from "react-icons/rx";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { SiGnuprivacyguard } from "react-icons/si";
import { RiLockPasswordLine } from "react-icons/ri";
import { CgProfile, CgProductHunt } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/userActions";
import { useEffect, useState } from "react";

const Navbar = ({ isAuthenticated, user }) => {
  const dispatch = useDispatch();

  const [total, setTotal] = useState(0);

  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const items = cartItems.map((item) => item.quantity);
    const totalItems = items.reduce((sum, num) => {
      return sum + num;
    }, 0);
    setTotal(totalItems);
  }, [cartItems]);

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
        <HStack gap={4} alignItems={"center"}>
          <Box>
            <Menu>
              <MenuButton
                as={IconButton}
                color={"black100"}
                icon={<Avatar size={"xs"} />}
                variant={"link"}
              />

              {isAuthenticated ? (
                <MenuList alignItems={"flex-start"} gap={1}>
                  <Link to={"/changepassword"}>
                    <MenuItem>
                      <HStack>
                        <RiLockPasswordLine /> <Text>Change Password</Text>
                      </HStack>
                    </MenuItem>
                  </Link>

                  <Link to={"/profile"}>
                    <MenuItem>
                      <HStack>
                        <CgProfile /> <Text>Profile</Text>
                      </HStack>
                    </MenuItem>
                  </Link>

                  <MenuItem onClick={logoutHandler}>
                    <HStack>
                      <BiLogOut /> <Text>Logout</Text>
                    </HStack>
                  </MenuItem>
                </MenuList>
              ) : (
                <MenuList alignItems={"flex-start"} gap={1}>
                  <Link to="/register">
                    <MenuItem>
                      <HStack>
                        <SiGnuprivacyguard /> <Text>Sign Up</Text>
                      </HStack>
                    </MenuItem>
                  </Link>

                  <Link to="/login">
                    <MenuItem>
                      <HStack>
                        <BiLogIn /> <Text>Login</Text>
                      </HStack>
                    </MenuItem>
                  </Link>
                </MenuList>
              )}
            </Menu>
          </Box>

          <Box>
            <IconButton
              color={"black100"}
              variant={"link"}
              icon={<AiOutlineHeart fontSize={24} />}
            />
          </Box>

          <Box position={"relative"}>
            <Link to={"/cart"}>
              <IconButton
                color={"black100"}
                variant={"link"}
                zIndex={2}
                icon={<AiOutlineShoppingCart fontSize={24} />}
              />
              {total > 0 && (
                <Box
                  rounded={"full"}
                  position={"absolute"}
                  zIndex={-10}
                  bg={"error"}
                  color={"white"}
                  fontSize={10}
                  top={3}
                  left={6}
                  w={"20px"}
                  h={"20px"}
                  fontWeight={"bold"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  opacity={0.9}
                >
                  <span>{total}</span>
                </Box>
              )}
            </Link>
          </Box>
        </HStack>
      </HStack>
      <Box borderBottom={"1px solid #dbd9e1"} pb={2}>
        <HStack>
          <Link to={"/dashboard"}>
            <Button
              color={"black100"}
              variant={"outline"}
              fontSize={"sm"}
              leftIcon={<CgProductHunt fontSize={16} />}
            >
              Dashboard
            </Button>
          </Link>
          <Link to={"/products"}>
            <Button
              color={"black100"}
              variant={"outline"}
              fontSize={"sm"}
              leftIcon={<CgProductHunt fontSize={16} />}
            >
              Products
            </Button>
          </Link>

          {/* <Button
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
          </Button> */}
        </HStack>
      </Box>
    </Box>
  );
};

export default Navbar;
