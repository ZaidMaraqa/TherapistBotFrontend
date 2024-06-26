import React from "react";
import { Box, Stack, IconButton } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { SessionItemProps } from "../sessionItem/sessionitem.interface";

const SessionItem: React.FC<SessionItemProps> = ({ title, borderColor }) => {
  return (
    <Box
      sx={{
        height: "4rem",
        borderRadius: ".625rem",
        borderLeft: `.3rem solid ${borderColor}`,
        borderTop: ".0625rem solid #e0e0e0",
        borderRight: ".0625rem solid #e0e0e0",
        borderBottom: ".0625rem solid #e0e0e0",
        backgroundColor: "white",
      }}
    >
      <Stack
        direction={"row"}
        justifyContent="space-between"
        alignItems="center"
        sx={{
          height: "100%",
          paddingLeft: "1rem",
          paddingRight: "1rem",
        }}
      >
        <Box sx={{ color: "#333" }}>{title}</Box>
        <Box>
          <IconButton aria-label="arrow-right" sx={{ color: "#616161" }}>
            <ArrowRightIcon/>
          </IconButton>
        </Box>
      </Stack>
    </Box>
  );
};

export default SessionItem;