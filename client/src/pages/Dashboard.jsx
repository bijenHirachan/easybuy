import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableContainer,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getAllUsers,
  updateUserRole,
} from "../redux/actions/userActions";
import UsersTable from "../components/UsersTable";
import ProductsTable from "../components/ProductsTable";
import { loadProducts } from "../redux/actions/productActions";
import CreateProduct from "../components/CreateProduct";
import CategoriesTable from "../components/CategoriesTable";
import CreateCategory from "../components/CreateCategory";
import FeaturedProducts from "../components/FeaturedProducts";
import OrdersTable from "../components/OrdersTable";

const Dashboard = ({ isAuthenticated, user }) => {
  const navigate = useNavigate();

  const { error, message } = useSelector((state) => state.admin);

  const dispatch = useDispatch();

  const toast = useToast();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
    if (user && user.role !== "admin") navigate("/");
    dispatch(getAllUsers());
    dispatch(loadProducts());
  }, []);

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
    }
  }, [dispatch, error, message]);

  return (
    <Box py={6}>
      <Tabs variant={"enclosed"} colorScheme="purple">
        <TabList>
          <Tab>Users</Tab>
          <Tab>Products</Tab>
          <Tab>Create Product</Tab>
          <Tab>Categories</Tab>
          <Tab>Create Category</Tab>
          <Tab>Featured Products</Tab>
          <Tab>Orders</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UsersTable />
          </TabPanel>
          <TabPanel>
            <ProductsTable />
          </TabPanel>
          <TabPanel>
            <CreateProduct />
          </TabPanel>
          <TabPanel>
            <CategoriesTable />
          </TabPanel>
          <TabPanel>
            <CreateCategory />
          </TabPanel>
          <TabPanel>
            <FeaturedProducts />
          </TabPanel>
          <TabPanel>
            <OrdersTable />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Dashboard;
