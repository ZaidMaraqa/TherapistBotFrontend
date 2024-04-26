"use client";
import TickPlacementBars from "@/components/barChart";
import DateCalendarServerRequest from "@/components/calendarPicker";
import DatePickerOpenTo from "@/components/datePicker";
import GaugeChart from "@/components/gaugeChart/gaugeChart";
import SessionItem from "@/components/sessionItem/sessionItem";
import SidebarWithHeader from "@/components/sideBar";
import { sessions } from "../../../public/constants";
import { Typography, Box, Divider, Avatar, Button } from "@mui/material";
import Stack from "@mui/material/Stack";

export default function DashBoard() {
  return (
    <SidebarWithHeader>
      <Stack direction={"row"} sx={{ height: "100vh" }}>
        <Box sx={{ flex: 1 }}>
          <Stack sx={{ height: "100%" }}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Stack direction={"row"} alignItems="center">
                <Box sx={{ width: "100%", height: "15rem" }}>
                  <Stack spacing={3}>
                    <Box> Quick check your condition</Box>
                    <Box> Checking regular help improve your!</Box>
                    <Button variant="contained">Contained</Button>
                  </Stack>
                </Box>
                <Divider orientation="vertical" sx={{ mx: "1rem" }} />
                <Box sx={{ width: "100%", height: "15rem" }}>
                  <Stack>
                    <Box
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Stack direction={"row"}>
                        <Stack direction={"row"}>
                          <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                            sx={{ width: 50, height: 50 }}
                          />
                          <Stack>
                            <Box>kjlj</Box>
                            <Box>kjlj</Box>
                          </Stack>
                        </Stack>
                        <Box>
                          <Box>fsffs</Box>
                        </Box>
                      </Stack>
                    </Box>
                    <Box>
                      <Stack direction={"row"}>
                        <Box>adasd</Box>
                        <Box>dasdas</Box>
                      </Stack>
                    </Box>
                  </Stack>
                </Box>
              </Stack>
            </Box>
            <Divider
              orientation="horizontal"
              sx={{ my: "1rem", width: "85%" }}
            />
            <Stack direction={"row"}>
              <Box sx={{ width: "100%" }}>
                <Box>
                  <Typography
                    component="div"
                    sx={{ color: "#231E5B", fontWeight: "bold", mb: 2 }}
                    variant="h4"
                  >
                    hi
                  </Typography>
                  <Typography
                    component="div"
                    sx={{ color: "#231E5B", fontWeight: "bold", mb: 2 }}
                    variant="h6"
                  >
                    fzdsadz
                  </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <TickPlacementBars />
                </Box>
              </Box>
              <Box sx={{ width: "100%" }}>
                <Stack alignItems="center" justifyContent="center" spacing={2}>
                  <DatePickerOpenTo />
                  <GaugeChart value={5} max={20} />
                  <Box>
                    <Typography
                      fontSize={"1.3rem"}
                      align="center"
                      sx={{ color: "#231E5B" }}
                    >
                      You've taken <span style={{ fontWeight: "bold" }}>5</span>{" "}
                      out of <span style={{ fontWeight: "bold" }}>20</span>{" "}
                      sessions this month.
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </Box>
        <Box sx={{ overflow: "auto" }}>
          <Stack alignItems="center" justifyContent="center">
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                ml: 0,
                mr: "auto",
                pl: 4,
                pr: 4,
              }}
            >
              <Typography
                component="div"
                sx={{
                  color: "#231E5B",
                  fontWeight: "bold",
                  mb: 2,
                  fontSize: "1.5rem",
                }}
              >
                List of previous sessions
              </Typography>
              <DateCalendarServerRequest />
              <Stack spacing={2} sx={{ width: "100%" }}>
                <Typography
                  component="div"
                  sx={{
                    color: "#231E5B",
                    fontWeight: "bold",
                    mb: 2,
                    fontSize: "1.5rem",
                  }}
                >
                  Take themed sessions
                </Typography>
                {sessions.map((session, index) => (
                  <SessionItem
                    key={index}
                    title={session.title}
                    borderColor={session.borderColor}
                  />
                ))}
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </SidebarWithHeader>
  );
}
