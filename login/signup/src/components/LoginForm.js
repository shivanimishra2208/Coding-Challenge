import React, { useState } from "react";
import axios from "axios";
import { Button, Input, Text } from "@chakra-ui/react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const getdata = (e) => {
    const { value, name } = e.target;
    console.log(value, name);
    setInputValue(() => {
      return {
        ...inputValue,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = "https://api-dev.quicklyinc.com/auth/login";
    console.log("Sending request to:", apiUrl);

    try {
      const response = await axios.post(apiUrl, inputValue);
      console.log(response);

      localStorage.setItem("token", response.data.token);

      localStorage.setItem("user", JSON.stringify(response.data.user));

      window.location.href = "/profile";
    } catch (error) {
      console.error(error);
      alert("Invalid Credentials. Please try again!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Text fontSize={"25px"} fontWeight={500} mb={"10px"}>
        {" "}
        Login here!
      </Text>
      <Input
        placeholder="Email Address"
        name="email"
        onChange={getdata}
        type="email"
        m={"5px"}
      ></Input>

      <Input
        placeholder="password"
        name="password"
        onChange={getdata}
        type="password"
        m={"5px"}
      ></Input>
      <Button
        mt="10px"
        textAlign={"center"}
        colorScheme="whatsapp"
        type="submit"
      >
        Login
      </Button>
    </form>
  );
}
