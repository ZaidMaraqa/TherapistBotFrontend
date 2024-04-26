"use client";
import TickPlacementBars from "@/components/barChart";
import DateCalendarServerRequest from "@/components/calendarPicker";
import DatePickerOpenTo from "@/components/datePicker";
import GaugeChart from "@/components/gaugeChart";
import SidebarWithHeader from "@/components/sideBar";
import { Typography, Box, Divider, Avatar, Button } from "@mui/material";
import Stack from "@mui/material/Stack";

export default function DashBoard() {
  return (
    <SidebarWithHeader>
      <Stack direction={"row"} sx={{ height: "100vh"}}>
        <Box sx={{ flex: 1}}>
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
            <Divider orientation="horizontal" sx={{ my: "1rem" }} />
            <Stack direction={"row"} sx={{ flex: 1, overflow: "hidden" }}>
              <Box sx={{ width: "26.9rem", height: "100%", overflow: "auto" }}>
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
                    variant="h4"
                  >
                    hi
                  </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <TickPlacementBars />
                </Box>
              </Box>
              <Box sx={{ width: "20rem", overflow: "auto" }}>
                <Stack alignItems="center" justifyContent="center" spacing={5}>
                  <DatePickerOpenTo />
                  <GaugeChart />
                  <Box>Daily progress</Box>
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </Box>
        <Box sx={{ width: "30rem", height: "100vh", overflow: "auto" }}>
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{ height: "100%" }}
          >
            <Box
              sx={{
                width: "100%",
                height: "85vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                component="div"
                sx={{ color: "#231E5B", fontWeight: "bold", mb: 2 }}
                variant="h4"
              >
                hi
              </Typography>
              <DateCalendarServerRequest />
              <Stack spacing={2} sx={{ mt: 2 }}>
                <Box
                  sx={{
                    width: "18.75rem",
                    height: "4.375rem",
                    bgcolor: "blue",
                    borderRadius: ".625rem",
                  }}
                />
                <Box
                  sx={{
                    width: "18.75rem",
                    height: "4.375rem",
                    bgcolor: "blue",
                    borderRadius: ".625rem",
                  }}
                />
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </SidebarWithHeader>
  );
}
