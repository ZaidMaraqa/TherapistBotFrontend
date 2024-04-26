"use client";
import TickPlacementBars from "@/components/barChart/barChart";
import DateCalendarServerRequest from "@/components/calendarPicker";
import DatePickerOpenTo from "@/components/datePicker";
import GaugeChart from "@/components/gaugeChart/gaugeChart";
import SessionItem from "@/components/sessionItem/sessionItem";
import { sessions, dataset } from "../../../public/constants";
import { Typography, Box, Divider, Avatar, Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import ResponsiveDrawer from "@/components/sideBar/sideBar";
import { ASSETS } from "@/assets";

export default function DashBoard() {
  return (
    <ResponsiveDrawer>
      <Stack direction={"row"} sx={{ height: "100vh" }}>
        <Box>
          <Stack sx={{ height: "100%" }}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Stack direction={"row"} alignItems="center" flexGrow={1}>
                <Box
                  sx={{
                    width: "100%",
                    height: "15rem",
                    border: ".125rem solid #231E5B",
                    borderRadius: ".5rem",
                    padding: "1rem",
                    position: "relative",
                  }}
                >
                  <Stack spacing={3}>
                    <Stack direction={"row"} spacing={2} alignItems="center">
                      <Box sx={{ fontSize: "1.2rem", color: "#231E5B" }}>
                        Chat with ECHO Now<br/>
                        It will take only few minutes to feel better
                      </Box>
                      <Avatar
                        alt="ECHO"
                        src={ASSETS.icons.bot}
                        sx={{ width: 100, height: 100 }}
                      />
                    </Stack>
                    <Box sx={{ color: "#231E5B" }}>
                      Checking regularly helps improve your wellbeing!
                    </Box>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#231E5B",
                        color: "white",
                        position: "absolute",
                        bottom: "1rem",
                        left: 10,
                        right: 10,
                        transform: "none",
                        boxShadow: 'none'
                      }}
                    >
                      Chat with ECHO
                    </Button>
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
            <Divider orientation="horizontal" sx={{ my: "1rem" }} />
            <Stack direction={"row"}>
              <Box sx={{ width: "100%" }}>
                <Box>
                  <Typography
                    component="div"
                    sx={{ color: "#231E5B", fontWeight: "bold", mb: 3 }}
                    variant="h5"
                  >
                    Your Activity
                  </Typography>
                </Box>
                <Box>
                  <TickPlacementBars dataset={dataset} />
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
    </ResponsiveDrawer>
  );
}
