'use client'
import withAuth from "@/components/PrivateRoute";
import AuthContext from "@/context/auth";
import { Box, Button } from "@chakra-ui/react";
import { useContext } from "react";
const Home = () => {

  const { logout } = useContext(AuthContext);
  return (
    <Button onClick={logout}>
      Log out
    </Button>
  );
}

export default withAuth(Home);