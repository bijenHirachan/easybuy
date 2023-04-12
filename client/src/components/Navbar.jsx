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
  InputGroup,
  InputLeftElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { RxCaretDown } from "react-icons/rx";
import logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { SiGnuprivacyguard } from "react-icons/si";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineSearch } from "react-icons/ai";
import { CgProfile, CgProductHunt } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/userActions";
import { useEffect, useState } from "react";
import Search from "./Search";
import { MdOutlinePerson } from "react-icons/md";

const Navbar = ({ isAuthenticated, user }) => {
  const dispatch = useDispatch();

  const [total, setTotal] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { message } = useSelector((state) => state.user);

  const { cartItems, wishlist } = useSelector((state) => state.cart);

  const logoutHandler = async () => {
    await dispatch(logout());
  };

  const navigate = useNavigate();

  useEffect(() => {
    const items = cartItems.map((item) => item.quantity);
    const totalItems = items.reduce((sum, num) => {
      return sum + num;
    }, 0);
    setTotal(totalItems);
  }, [cartItems]);

  useEffect(() => {
    dispatch({ type: "clearSearchProducts" });
  }, [onClose]);

  useEffect(() => {
    if (message) {
      navigate("/");
    }
  }, [message]);

  return (
    <>
      <Box display={["none", "block"]}>
        <HStack justifyContent={["space-between"]} alignItems={["center"]}>
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
          <HStack
            color={"black100"}
            borderRadius={4}
            paddingX={2}
            paddingY={2}
            cursor={"pointer"}
            border={"1px solid rgba(83, 78, 97, 0.25)"}
            onClick={onOpen}
          >
            <AiOutlineSearch color="black75" />

            <Box w={48} color={"black75"}>
              Search
            </Box>
          </HStack>
          <Modal scrollBehavior="inside" onClose={onClose} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalBody mt={10}>
                <Search onClose={onClose} />
              </ModalBody>
            </ModalContent>
          </Modal>
          {/* <Box>
          <InputGroup>
            <InputLeftElement
              color={"black100"}
              pointerEvents={"none"}
              children={<AiOutlineSearch />}
            />
            <Input
              width={"400px"}
              placeholder="Search"
              size="md"
              focusBorderColor="primary.dark"
            />
          </InputGroup>
        </Box> */}
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

            <Box position={"relative"}>
              <Link to={"/wishlist"}>
                <IconButton
                  color={"black100"}
                  variant={"link"}
                  zIndex={2}
                  icon={<AiOutlineHeart fontSize={24} />}
                />
                {wishlist && wishlist.length > 0 && (
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
                    <span>{wishlist.length}</span>
                  </Box>
                )}
              </Link>
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
            {user && user.role === "admin" && (
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
            )}

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

      <Box display={["block", "none"]}>
        <HStack justifyContent={["space-between"]} alignItems={["center"]}>
          <Box>
            <Link to={"/"}>
              <Image
                boxSize="150px"
                objectFit="contain"
                src={logo}
                alt="easy-buy"
              />
            </Link>
          </Box>

          <Modal scrollBehavior="inside" onClose={onClose} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalBody mt={10}>
                <Search onClose={onClose} />
              </ModalBody>
            </ModalContent>
          </Modal>

          <HStack alignItems={"center"}>
            <Box>
              <Menu>
                <MenuButton
                  as={IconButton}
                  color={"black100"}
                  icon={<AiOutlineUser fontSize={24} />}
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

            <Box position={"relative"}>
              <Link to={"/wishlist"}>
                <IconButton
                  color={"black100"}
                  variant={"link"}
                  zIndex={2}
                  icon={<AiOutlineHeart fontSize={24} />}
                />
                {wishlist && wishlist.length > 0 && (
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
                    <span>{wishlist.length}</span>
                  </Box>
                )}
              </Link>
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
        <HStack
          color={"black100"}
          borderRadius={4}
          paddingX={2}
          paddingY={2}
          cursor={"pointer"}
          border={"1px solid rgba(83, 78, 97, 0.25)"}
          onClick={onOpen}
        >
          <AiOutlineSearch color="black75" />

          <Box w={48} color={"black75"}>
            Search
          </Box>
        </HStack>

        <Box mt={6} borderBottom={"1px solid #dbd9e1"} pb={2}>
          <HStack>
            {user && user.role === "admin" && (
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
            )}

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
    </>
  );
};

export default Navbar;
