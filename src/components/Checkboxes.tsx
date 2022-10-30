import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { Field, FieldInputProps, useForm } from "react-final-form";
import checked from "../assets/images/components/checked.png";
import unchecked from "../assets/images/components/unchecked.png";
import { ConfigContext, configType } from "./Configuration";

const Checkboxes = () => {
  const checkedStyle = {
    minWidth: 17,
    maxWidth: 17,
    minHeight: 17,
    maxHeight: 17,
    backgroundImage: `url(${checked})`,
    mx: "0.2rem",
  }
  const uncheckedStyle = {
    minWidth: 17,
    maxWidth: 17,
    minHeight: 17,
    maxHeight: 17,
    backgroundImage: `url(${unchecked})`,
    mx: "0.2rem",
  }
  const checkboxLabelStyle = {
    fontFamily: "RuneScape07",
    color: "#F7F800",
    textShadow: "1px 1px #000000",
    fontSize: "0.8rem",
  }

  const form = useForm();
  const handleHideUsernameClick = (input: FieldInputProps<any, HTMLElement>) => {
    input.value && form.change("user", "");
    input.onChange(!input.value);
  }
  const handleRememberUsernameClick = (input: FieldInputProps<any, HTMLElement>) => {
    input.onChange(!input.value);
  }
  const config: configType = useContext(ConfigContext) as configType;
  
  return(
    <Box display="flex" justifyContent="center" mt="0.5rem">
      <Box display="flex" mr="0.7rem">
        <Field
          name="rememberUsername"
          initialValue={config.rememberUsername}
        >
          {({input}) => {
            return(
              <Button 
                sx={ input.value ? checkedStyle : uncheckedStyle }
                onClick={() => handleRememberUsernameClick(input)}
              />
            );
          }}
        </Field>
        <Typography sx={checkboxLabelStyle}>
          Remember username
        </Typography>
      </Box>
      <Box display="flex" ml="0.7rem">
        <Field
          name="hideUsername"
          initialValue={config.hideUsername}
        >
          {({input}) => {
            return(
              <Button 
                sx={ input.value ? checkedStyle : uncheckedStyle }
                onClick={() => handleHideUsernameClick(input)}
              />
            );
          }}
        </Field>
        <Typography sx={checkboxLabelStyle}>
          Hide username
        </Typography>
      </Box>
    </Box>
  );
}
export default Checkboxes;