import React, { useState } from "react";
import Map from "../Map/Map";
import "./Home.css";
import Filter from "../Filter/Filter";
import ResultsBar from "../ResultsBar/ResultsBar";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
// import { Search2Icon } from "@chakra-ui/icons";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import fakeData from "../../fakeData";
import CreateModal from "../CreateModal/CreateModal";

import {
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
  Flex,
  HStack,
  Text,
} from "@chakra-ui/react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [findFilter, setFindFilter] = useState({
    type: "everything",
    isFound: true,
    isLost: true,
  });
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const handleLogout = (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        // // Sign-out successful.
        dispatch({ type: "LOGOUT" });
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  console.log(search);
  console.log(findFilter);
  return (
    <div>
      <Flex justifyContent="space-between" shadow="md">
        <InputGroup width="40%" ml="2%" mt="1%" size="lg" mb="1%">
          <InputLeftAddon children="🔎" />
          <Input
            type="teal"
            placeholder="Search Items ..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
        <HStack mr="1%">
          <Text fontSize="xl" fontWeight="500" mr="4%">
            {currentUser?.email}
          </Text>
          <Button
            colorScheme="blue"
            size="lg"
            mt="2%"
            mr="5%"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </HStack>
      </Flex>
      <div className="home">
        <Filter setFindFilter={setFindFilter} />
        <Map data={fakeData} />
        <ResultsBar data={fakeData} search={search} findFilter={findFilter} />
        <CreateModal />
      </div>
    </div>
  );
}
