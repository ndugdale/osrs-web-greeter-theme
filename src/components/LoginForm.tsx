import { Box, InputLabel, Stack, Typography } from "@mui/material";
import { Field, Form } from "react-final-form"
import { lightdm } from "nody-greeter-types";

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
              }}
            >
              Enter your username &#38; password
            </Typography>
            <Box>
              <InputLabel sx={{
                fontFamily: "RuneScape07",
                display: "inline",
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
              <button id="submit-button" type="submit">Login</button>
              <button id="submit-button" type="submit">Shutdown</button>
            </Box>
            
          </Stack>
        </form>
      )}
    />
  );
}

export default LoginForm;