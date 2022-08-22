import { Box, Button, InputLabel, Stack, Typography } from "@mui/material";
import { Field, Form } from "react-final-form"
import { lightdm } from "nody-greeter-types";
import largeButton from "../assets/images/components/largeButton.png";

type formType = {
  user: string;
  password: string;
}

const LoginForm = () => {

  const onSubmit = async (values: formType) => {
    lightdm.cancel_authentication();
    lightdm.authenticate(values.user)
    await wait(100);
    lightdm.respond(values.password);
    await wait(1000);
    lightdm.start_session("bspwm");
  };

  const wait = async (ms: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => resolve(), ms);
    })
  }

  return(
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Stack>
            <Typography sx={{
              fontFamily: "RuneScape07",
              color: "#F7F800",
              textShadow: "1px 1px #000000",
              }}
            >
              Enter your username &#38; password.
            </Typography>
            <Box>
              <InputLabel sx={{
                fontFamily: "RuneScape07",
                display: "inline",
                color: "#FFFFFF",
                textShadow: "1px 1px #000000",
                }}
              >
                Login:
              </InputLabel>
              <Field
                name="user"
                component="input"
                type="text"
              />
            </Box>
            <Box>
              <InputLabel sx={{
                fontFamily: "RuneScape07",
                display: "inline",
                color: "#FFFFFF",
                textShadow: "1px 1px #000000",
                }}
              >
                Password:
              </InputLabel>
              <Field
                name="password"
                component="input"
                type="password"
              />
            </Box>
            <Box>
              <Button
                type="submit"
                sx={{
                  width: 147,
                  height: 41,
                  fontFamily: "RuneScape07",
                  backgroundImage: `url(${largeButton})`,
                  textTransform: "capitalize",
                  color: "#FFFFFF",
                  textShadow: "1px 1px #000000",
                }}
              >
                Login
              </Button>
              <Button
                type="submit"
                sx={{
                  width: 147,
                  height: 41,
                  fontFamily: "RuneScape07",
                  backgroundImage: `url(${largeButton})`,
                  textTransform: "capitalize",
                  color: "#FFFFFF",
                  textShadow: "1px 1px #000000",
                }}
              >
                Shutdown
              </Button>
            </Box>
            
          </Stack>
        </form>
      )}
    />
  );
}

export default LoginForm;