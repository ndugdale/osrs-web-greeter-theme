import { Box, Grid, Stack } from "@mui/material";
import { useContext } from "react";
import BackgroundSelect from "./BackgroundSelect";
import CentralContainer from "./CentralContainer";
import { ConfigContext, configType } from "./Configuration";
import Logo from "./Logo";
import MusicButton from "./MusicButton";
import ProgressBar from "./ProgressBar";
import SessionSelect from "./SessionSelect";
import RefreshButton from "./RefreshButton";

type LoginScreenProps = {
  showProgressBar: boolean,
  error: boolean,
  demoComplete: boolean,
}

const LoginScreen = ({showProgressBar, error, demoComplete}: LoginScreenProps) => {
  const config: configType = useContext(ConfigContext) as configType;
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
          backgroundImage: `url(${config.background})`,
          display: "flex",
          justifyContent: "space-between",
          }}
        >
          <Stack sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}>
            <Grid container justifyContent="center">
              <Grid item xs={2}/>
              <Grid item xs={8}>
                <Logo/>
              </Grid>
              <Grid item xs={2}>
                {(!showProgressBar && !demoComplete) && (
                  <BackgroundSelect/>
                )}
              </Grid>              
            </Grid>
            {(!showProgressBar && !demoComplete)
              ? (<CentralContainer error={error}/>)
              : (!demoComplete
                ? <ProgressBar/>
                : <RefreshButton/>
                )
            }
          </Stack>
          {(!showProgressBar && !demoComplete) && (
            <Grid container>
              <Grid item xs={6}>
                <Box sx={{m: "0.4rem"}}>
                  <SessionSelect/>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    m: "0.4rem",
                  }}
                >
                  <MusicButton/>
                </Box>
              </Grid>
            </Grid>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default LoginScreen;