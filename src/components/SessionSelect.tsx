import { Button, Typography } from "@mui/material";
import { lightdm, LightDMUser } from "nody-greeter-types";
import { Field } from "react-final-form";
import smallButton from "../assets/images/components/smallButton.png";

const SessionSelect = () => {
  const smallButtonStyle = {
    width: 100,
    height: 35,
    fontFamily: "RuneScape07",
    backgroundImage: `url(${smallButton})`,
    textTransform: "none",
    color: "#FFFFFF",
    textShadow: "1px 1px #000000",
    display: "block",
  }
  
  const userList: LightDMUser[] = lightdm?.users;
  const sessionList: string[] = lightdm?.sessions?.map(s => s.name);
  const defaultSession: string = userList?.[0]?.session ?? null;

  return(
    <Field
      name="session"
      initialValue={defaultSession}
    >
      {({input}) => {
        return(
          <Button
            type="button"
            sx={smallButtonStyle}
            onClick={ () => {
              const current = sessionList?.indexOf(input.value);
              const next = (current + 1) % sessionList?.length;
              input.onChange(sessionList?.[next])
            }}
          >
            <Typography mt="-0.35rem" overflow="hidden">
              {input.value ? input.value : "Default"}
            </Typography>
            <Typography mt="-0.35rem" fontSize="0.6rem">
              Click to switch
            </Typography>
          </Button>
        )
      }}
    </Field>
  );
};

export default SessionSelect;