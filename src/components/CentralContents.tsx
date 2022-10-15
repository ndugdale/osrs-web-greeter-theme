import { Box, Button, Grid, InputLabel, Typography } from "@mui/material";
import { Field } from "react-final-form"
import { lightdm } from "nody-greeter-types";
import largeButton from "../assets/images/components/largeButton.png";
import "./styles.css"

const CentralContents = () => {
  const shutdown = () => {
    lightdm.shutdown();
  }

  const inputStyle = {
    fontFamily: "RuneScape07",
    color: "#FFFFFF",
    textShadow: "1px 1px #000000",
    backgroundColor: "transparent",
    border: "none",
  }

  const labelStyle = {
    fontFamily: "RuneScape07",
    color: "#FFFFFF",
    textShadow: "1px 1px #000000",
    display: "inline",
  }

  const labelBoxStyle = {
    mx: "4.4rem",
    height: "1.0rem",
  }

  const largeButtonStyle = {
    width: 147,
    height: 41,
    fontFamily: "RuneScape07",
    backgroundImage: `url(${largeButton})`,
    textTransform: "capitalize",
    color: "#FFFFFF",
    textShadow: "1px 1px #000000",
  }

  return(
    <>
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        mt: "1.8rem",
        mb: "0.7rem"
      }}>
        <Typography sx={{
          fontFamily: "RuneScape07",
          color: "#F7F800",
          textShadow: "1px 1px #000000",
          }}
        >
          Enter your username &#38; password.
        </Typography>
      </Box>
      <Box sx={labelBoxStyle}>
        <InputLabel sx={labelStyle}>
          Login:
        </InputLabel>
        <Field
          name="user"
          type="text"
          component="input"
        > 
          {({input}) => (
            <input {...input} style={inputStyle} autoComplete="off"/>
          )}
        </Field>
      </Box>
      <Box sx={labelBoxStyle}>
        <InputLabel sx={labelStyle}>
          Password:
        </InputLabel>
        <Field
          name="password"
          type="password"
        >
          {({input}) => (
            <input {...input} style={inputStyle} autoComplete="off"/>
          )}
        </Field>
      </Box>
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        mt: "1.9rem",
        mx: "1.3rem",
      }}>
        <Grid container>
          <Grid item xs={6} textAlign="center">
            <Button
              name="login"
              type="submit"
              sx={largeButtonStyle}
            >
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
    </>
  );
}

export default CentralContents;