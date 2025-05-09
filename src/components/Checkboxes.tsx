import checked from "../assets/images/components/checked.png";
import unchecked from "../assets/images/components/unchecked.png";
import { ConfigContext, configType } from "./Configuration";
import { Box, Button, FormControlLabel } from "@mui/material";
import { useContext } from "react";
import { Field, FieldInputProps, useForm } from "react-final-form";

const Checkboxes = () => {
  const checkedStyle = {
    minWidth: 17,
    maxWidth: 17,
    minHeight: 17,
    maxHeight: 17,
    backgroundImage: `url(${checked})`,
    mx: "0.2rem",
  };
  const uncheckedStyle = {
    minWidth: 17,
    maxWidth: 17,
    minHeight: 17,
    maxHeight: 17,
    backgroundImage: `url(${unchecked})`,
    mx: "0.2rem",
  };
  const checkboxLabelStyle = {
    fontFamily: "RuneScape07Small",
    color: "#F7F800",
    textShadow: "1px 1px #000000",
    fontSize: "1rem",
    lineHeight: 1.2,
  };

  const form = useForm();
  const handleHideUsernameClick = (
    input: FieldInputProps<any, HTMLElement>,
  ) => {
    input.value && form.change("user", "");
    input.onChange(!input.value);
  };
  const handleRememberUsernameClick = (
    input: FieldInputProps<any, HTMLElement>,
  ) => {
    input.onChange(!input.value);
  };
  const config: configType = useContext(ConfigContext) as configType;

  return (
    <Box display="flex" justifyContent="center" mt="0.5rem">
      <Box display="flex" mr="0.6rem">
        <Field name="rememberUsername" initialValue={config.rememberUsername}>
          {({ input }) => (
            <FormControlLabel
              label="Remember username"
              sx={{ ml: "12px", mr: "6px" }}
              componentsProps={{ typography: { sx: checkboxLabelStyle } }}
              control={
                <Button
                  sx={input.value ? checkedStyle : uncheckedStyle}
                  onClick={() => handleRememberUsernameClick(input)}
                />
              }
            />
          )}
        </Field>
      </Box>
      <Box display="flex" ml="0.6rem">
        <Field name="hideUsername" initialValue={config.hideUsername}>
          {({ input }) => (
            <FormControlLabel
              label="Hide username"
              componentsProps={{ typography: { sx: checkboxLabelStyle } }}
              control={
                <Button
                  sx={input.value ? checkedStyle : uncheckedStyle}
                  onClick={() => handleHideUsernameClick(input)}
                />
              }
            />
          )}
        </Field>
      </Box>
    </Box>
  );
};
export default Checkboxes;
