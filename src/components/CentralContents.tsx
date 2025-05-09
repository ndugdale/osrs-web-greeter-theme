import largeButton from "../assets/images/components/largeButton.png";
import Checkboxes from "./Checkboxes";
import { ConfigContext, configType } from "./Configuration";
import SettingsContent from "./SettingsContent";
import "./styles.css";
import { Box, Button, Grid, InputLabel, Typography } from "@mui/material";
import { lightdm } from "nody-greeter-types";
import { useContext, useState } from "react";
import { Field, useFormState } from "react-final-form";

const CentralContents = ({ error }: { error: boolean }) => {
  const shutdown = () => {
    lightdm.shutdown();
  };

  const inputStyle = {
    fontFamily: "RuneScape07Bold",
    color: "#FFFFFF",
    textShadow: "1px 1px #000000",
    backgroundColor: "transparent",
    border: "none",
    caretColor: "#F7F800",
    fontSize: "1rem",
  };

  const labelStyle = {
    fontFamily: "RuneScape07Bold",
    color: "#FFFFFF",
    textShadow: "1px 1px #000000",
    display: "inline",
  };

  const labelBoxStyle = {
    mx: "4.4rem",
    height: "1rem",
    whiteSpace: "nowrap",
  };

  const largeButtonStyle = {
    width: 147,
    height: 41,
    fontFamily: "RuneScape07Bold",
    backgroundImage: `url(${largeButton})`,
    textTransform: "capitalize",
    color: "#FFFFFF",
    textShadow: "1px 1px #000000",
    borderRadius: 0,
  };

  const capsLockMessageStyle = {
    fontFamily: "RuneScape07",
    color: "#FFFFFF",
    textShadow: "1px 1px #000000",
    fontSize: "0.85rem",
  };

  const { values: formValues } = useFormState();
  const config: configType = useContext(ConfigContext) as configType;
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  ["keyup", "keydown"].forEach((type) => {
    window.addEventListener(type, (e) => {
      const event = e as KeyboardEvent;
      const capsLock = event.getModifierState("CapsLock");
      setIsCapsLockOn(capsLock);
      if (type === "keyup" && event.key === "." && event.ctrlKey) {
        setSettingsOpen(true);
      }
    });
  });

  const closeSettings = () => {
    setSettingsOpen(false);
  };

  return (
    <>
      {!settingsOpen ? (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: "1.8rem",
              mb: "0.7rem",
            }}
          >
            <Typography
              sx={{
                fontFamily: "RuneScape07Bold",
                color: "#F7F800",
                textShadow: "1px 1px #000000",
              }}
            >
              {!error
                ? `Enter your username & password.`
                : "Login failed, try again."}
            </Typography>
          </Box>
          <Box sx={labelBoxStyle}>
            <InputLabel sx={labelStyle}>Login:</InputLabel>
            <Field
              name="user"
              type={formValues.hideUsername ? "password" : "text"}
              component="input"
              initialValue={config.lastUsername}
            >
              {({ input }) => (
                <input
                  {...input}
                  style={inputStyle}
                  autoComplete="off"
                  autoFocus={config.lastUsername === ""}
                />
              )}
            </Field>
          </Box>
          <Box sx={labelBoxStyle}>
            <InputLabel sx={labelStyle}>Password:</InputLabel>
            <Field name="password" type="password">
              {({ input }) => (
                <input
                  {...input}
                  style={inputStyle}
                  autoComplete="off"
                  autoFocus={config.lastUsername !== ""}
                />
              )}
            </Field>
          </Box>
          <Checkboxes />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: "0.4rem",
              mx: "1.3rem",
            }}
          >
            <Grid container>
              <Grid item xs={6} textAlign="center">
                <Button name="login" type="submit" sx={largeButtonStyle}>
                  Login
                </Button>
              </Grid>
              <Grid item xs={6} textAlign="center">
                <Button
                  name="shutdown"
                  onClick={shutdown}
                  sx={largeButtonStyle}
                >
                  Shutdown
                </Button>
              </Grid>
            </Grid>
          </Box>
          {isCapsLockOn && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography sx={capsLockMessageStyle}>CapsLock is on</Typography>
            </Box>
          )}
        </>
      ) : (
        <SettingsContent closeSettings={closeSettings} />
      )}
    </>
  );
};

export default CentralContents;
