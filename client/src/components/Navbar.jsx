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

const Navbar = ({ isAuthenticated, user }) => {
  const dispatch = useDispatch();

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
        <HStack gap={4} alignItems={"center"}>
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
