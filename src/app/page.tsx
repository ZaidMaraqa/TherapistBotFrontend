'use client'
import withAuth from "@/components/PrivateRoute";
import { Box } from "@chakra-ui/react";
const Home = () => {

  return (
    <Box>
      HI
    </Box>
  );
}

export default withAuth(Home);