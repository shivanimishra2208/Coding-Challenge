import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Profile from "./components/Profile";
import LoginForm from "./components/LoginForm";

export default function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </ChakraProvider>
  );
}
