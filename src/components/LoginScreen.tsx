import { Box, Grid, Stack } from "@mui/material";
import CentralContainer from "./CentralContainer";
import Logo from "./Logo";
import background from "../assets/images/backgrounds/default.jpg";
import SessionSelect from "./SessionSelect";

const LoginScreen = () => {
  return(
    <>
      <Box sx={{
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        }}>
        <Stack sx={{
          width: 765,
          height: 503,
          backgroundImage: `url(${background})`,
          display: "flex",
          justifyContent: "space-between",
          }}
        >
          <Stack sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}>
            <Logo/>
            <CentralContainer/>
          </Stack>
          <Grid container>
            <Grid item xs={6}>
              <Box sx={{m: "0.4rem"}}>
                <SessionSelect/>
              </Box>
            </Grid>
            <Grid item xs={6}>
              {/* TODO: add music button */}
            </Grid>
          </Grid>
          
        </Stack>
      </Box>
    </>
  );
};

export default LoginScreen;