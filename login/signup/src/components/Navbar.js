import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import SigninForm from "./SigninForm";
import LoginForm from "./LoginForm";

function Navbar() {
  return (
    <>
      <Text
        as="i"
        fontFamily={"heading"}
        fontSize={"30px"}
        display={"flex"}
        justifyContent={"center"}
        mt={"20px"}
        fontWeight={"semibold"}
      >
        Hey There! Want to Signin or Signup?
      </Text>
      <Tabs isFitted variant="soft-rounded" colorScheme="whatsapp" mt={"20px"}>
        <TabList mb="1em">
          <Tab fontWeight={500} fontSize={"20px"} color={"black"}>
            Sign Up
          </Tab>
          <Tab fontWeight={500} fontSize={"20px"} color={"black"}>
            Login
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SigninForm />
          </TabPanel>
          <TabPanel marginLeft={"700px"}>
            <LoginForm />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export default Navbar;
