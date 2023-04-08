import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import { Container } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/actions/userActions";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ChangePassword from "./pages/ChangePassword";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";

function App() {
  const dispatch = useDispatch();

  const { isAuthenticated, user, error, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: "clearError" });
    dispatch({ type: "clearMessage" });
  }, [dispatch, error, message]);

  return (
    <Router>
      <Container maxW="container.xl">
        <Navbar isAuthenticated={isAuthenticated} user={user} />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Product />} />
          <Route
            path="/login"
            element={<Login isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/register"
            element={<Register isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/changepassword"
            element={<ChangePassword isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/profile"
            element={<Profile user={user} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/forgotpassword"
            element={<ForgotPassword isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/resetpassword/:token"
            element={<ResetPassword isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/dashboard"
            element={
              <Dashboard isAuthenticated={isAuthenticated} user={user} />
            }
          />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
