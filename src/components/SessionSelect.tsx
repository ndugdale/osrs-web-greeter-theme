import smallButton from "../assets/images/components/smallButton.png";
import { Box, Button, Typography } from "@mui/material";
import { lightdm } from "nody-greeter-types";
import { Field, useForm } from "react-final-form";

const SessionSelect = (visibility: { visibility: string }) => {
  const smallButtonStyle = {
    width: 100,
    height: 35,
    fontFamily: "RuneScape07Bold",
    backgroundImage: `url(${smallButton})`,
    textTransform: "none",
    color: "#FFFFFF",
    textShadow: "1px 1px #000000",
    display: "block",
  };
  const form = useForm();

  // sessions for browser demo
  const devSessionNameList: string[] = [
    "bspwm",
    "sowm",
    "Plasma (X11)",
    "Plasma (Wayland)",
  ];
  const devSessionKeyList: string[] = [
    "bspwm",
    "sowm",
    "plasma",
    "plasmawayland",
  ];
  const devDefaultSessionName = devSessionNameList[0];
  const devDefaultSessionKey = devSessionKeyList[0];

  const sessionNameList: string[] =
    process.env.REACT_APP_ENV !== "dm"
      ? devSessionNameList
      : lightdm?.sessions.map((s) => s.name);
  const sessionKeyList: string[] =
    process.env.REACT_APP_ENV !== "dm"
      ? devSessionKeyList
      : lightdm?.sessions.map((s) => s.key);
  const defaultSessionName: string =
    process.env.REACT_APP_ENV !== "dm"
      ? devDefaultSessionName
      : lightdm?.sessions.filter((s) => s.key === lightdm?.users[0]?.session)[0]
          .name;
  const defaultSessionKey: string =
    process.env.REACT_APP_ENV !== "dm"
      ? devDefaultSessionKey
      : lightdm?.users[0]?.session;

  return (
    <Box sx={{ visibility: visibility }}>
      <Field name="sessionKey" initialValue={defaultSessionKey}>
        {() => {
          return <></>;
        }}
      </Field>
      <Field name="sessionName" initialValue={defaultSessionName}>
        {({ input }) => {
          return (
            <Button
              type="button"
              sx={smallButtonStyle}
              onClick={() => {
                const current = sessionNameList?.indexOf(input.value);
                const next = (current + 1) % sessionNameList?.length;
                input.onChange(sessionNameList?.[next]);
                form.change("sessionKey", sessionKeyList?.[next]);
              }}
            >
              <Typography
                mt="-0.4rem"
                overflow="hidden"
                whiteSpace="nowrap"
                sx={{
                  fontFamily: "RuneScape07Bold",
                  color: "#FFFFFF",
                  textShadow: "1px 1px #000000",
                }}
              >
                {input.value ? input.value : "Default"}
              </Typography>
              <Typography
                mt="-0.5rem"
                fontSize="0.8rem"
                sx={{
                  fontFamily: "RuneScape07",
                  color: "#FFFFFF",
                  textShadow: "1px 1px #000000",
                }}
              >
                Click to switch
              </Typography>
            </Button>
          );
        }}
      </Field>
    </Box>
  );
};

export default SessionSelect;
