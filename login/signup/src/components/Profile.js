import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardFooter,
  CardBody,
  CardHeader,
  Heading,
  Text,
} from "@chakra-ui/react";

export default function Profile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    // Retrieve user details from localStorage
    const userString = localStorage.getItem("user");

    if (userString) {
      try {
        const user = JSON.parse(userString);
        console.log(user);
        setUser(user);
      } catch (error) {
        console.error(error);
        alert("There was an error parsing the user data.");
      }
    } else {
      alert("No user data found in local storage.");
    }
  }, []);

  const handleLogout = () => {
    // Remove token and user details from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to login page
    window.location.href = "/";
  };

  return (
    <>
      <Card align="center">
        <CardHeader width={"100%"} padding={"30px"}>
          <Heading
            size="md"
            textAlign={"center"}
            backgroundColor={"lightcoral"}
            padding={"30px"}
          >
            Profile
          </Heading>
        </CardHeader>
        <CardBody>
          <Text fontWeight={500}>
            {" "}
            Welcome! {user.first_name} {user.last_name}
          </Text>
          <Text>Your email is {user.email}</Text>
        </CardBody>
        <CardFooter>
          <Button colorScheme="whatsapp" onClick={handleLogout}>
            Logout
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
