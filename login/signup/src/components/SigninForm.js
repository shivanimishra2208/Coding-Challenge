import React, { useState } from "react";
import { Input, Flex, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SigninForm() {
  const history = useNavigate;

  const [inputValue, setInputValue] = useState({
    first_name: "",
    last_name: "",
    company: {},
    email: "",
    password: "",
  });

  const [data, setData] = useState([]);

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

  const setCompany = (e) => {
    setInputValue(() => {
      return {
        ...inputValue,
        company: {
          name: e.target.value,
        },
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    addData();

    const apiUrl = "https://api-dev.quicklyinc.com/auth/signup";
    console.log("Sending request to:", apiUrl);

    try {
      const response = await axios.post(apiUrl, inputValue);
      console.log(response);

      localStorage.setItem("token", response.data.token);

      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Redirect to user profile page
      window.location.href = "/profile";
    } catch (error) {
      console.error(error);
      alert("User already exist");
    }
  };

  const addData = () => {
    const { first_name, last_name, company, email, password } = inputValue;
    if (first_name === "") {
      alert("name is required");
    } else if (last_name === "") {
      alert("name is required");
    } else if (email === "") {
      alert("email is required");
    } else if (!email.includes("@")) {
      alert("Provide valid email id");
    } else if (company === "") {
      alert(" company name is required");
    } else if (password === "") {
      alert("password is required");
    } else if (password.length < 5) {
      alert("password must me greater than 5");
    } else {
      console.log("Data added succesfully");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex
        height="40vh"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        width={"50%"}
      >
        <Text fontSize={"25px"} fontWeight={500} mb={"10px"}>
          {" "}
          Signup here!
        </Text>
        <Input
          placeholder="First Name"
          name="first_name"
          onChange={getdata}
          type="first_name"
          m={"5px"}
        ></Input>
        <Input
          placeholder="Last Name"
          name="last_name"
          onChange={getdata}
          type="last_name"
          m={"5px"}
        ></Input>
        <Input
          placeholder="company"
          name="company"
          onChange={setCompany}
          type="company"
          m={"5px"}
        ></Input>
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
        <Button colorScheme="whatsapp" type="submit" mt={"10px"}>
          Submit
        </Button>
      </Flex>
    </form>
  );
}
