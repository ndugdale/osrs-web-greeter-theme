import BackgroundSelect from "./BackgroundSelect";
import CentralContainer from "./CentralContainer";
import { ConfigContext, configType } from "./Configuration";
import LoginScreenRunes from "./LoginScreenRunes";
import Logo from "./Logo";
import MusicButton from "./MusicButton";
import ProgressBar from "./ProgressBar";
import RefreshButton from "./RefreshButton";
import SessionSelect from "./SessionSelect";
import { Box, Grid, Stack } from "@mui/material";
import { useContext, useEffect } from "react";
import { useForm, useFormState } from "react-final-form";

type LoginScreenProps = {
  showProgressBar: boolean;
  error: boolean;
  demoComplete: boolean;
};

const LoginScreen = ({
  showProgressBar,
  error,
  demoComplete,
}: LoginScreenProps) => {
  const { values: formValues } = useFormState();
  const form = useForm();
  const config: configType = useContext(ConfigContext) as configType;
  const scaleUpperLimit = 5.0;
  const scaleLowerLimit = 0.5;

  useEffect(() => {
    // @ts-ignore
    const initialValue = document.body.style.zoom;

    // Change zoom level on mount
    const zoom =
      config.scale !== "" &&
      Number(config.scale) >= scaleLowerLimit &&
      Number(config.scale) <= scaleUpperLimit
        ? (Number(config.scale) * 100).toString() + "%"
        : "100%";
    if (config.scale === "") {
      form.change("scale", "1.0");
    }
    // @ts-ignore
    document.body.style.zoom = zoom;
    const middle =
      (document.body.scrollHeight / 2) * (Number(config.scale) - 1);
    window.scrollTo(0, middle);
    form.change("hideBackgroundSelect", config.hideBackgroundSelect);
    form.change("hideSessionSelect", config.hideSessionSelect);

    return () => {
      // Restore default value
      // @ts-ignore
      document.body.style.zoom = initialValue;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Stack
          sx={{
            width: 765,
            height: 503,
            backgroundImage: `url(${config.background})`,
            display: "flex",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <LoginScreenRunes />
          <Stack
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              zIndex: 1,
            }}
          >
            <Grid container justifyContent="center">
              <Grid item xs={2} />
              <Grid item xs={8}>
                <Logo />
              </Grid>
              <Grid item xs={2}>
                {!showProgressBar && !demoComplete && (
                  <BackgroundSelect
                    visibility={
                      !formValues.hideBackgroundSelect ? "visible" : "hidden"
                    }
                  />
                )}
              </Grid>
            </Grid>
            {!showProgressBar && !demoComplete ? (
              <CentralContainer error={error} />
            ) : !demoComplete ? (
              <ProgressBar />
            ) : (
              <RefreshButton />
            )}
          </Stack>
          {!showProgressBar && !demoComplete && (
            <Grid container>
              <Grid item xs={6}>
                <Box sx={{ m: "0.4rem" }}>
                  <SessionSelect
                    visibility={
                      !formValues.hideSessionSelect ? "visible" : "hidden"
                    }
                  />
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
                  <MusicButton />
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
