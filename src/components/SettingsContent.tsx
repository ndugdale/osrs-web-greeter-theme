import checked from "../assets/images/components/checked.png";
import cross from "../assets/images/components/cross.png";
import crossHover from "../assets/images/components/crossHover.png";
import unchecked from "../assets/images/components/unchecked.png";
import { ConfigContext, configType } from "./Configuration";
import { Box, Button, InputLabel, Typography } from "@mui/material";
import { useContext } from "react";
import { Field, FieldInputProps } from "react-final-form";

const SettingsContent = ({ closeSettings }: { closeSettings: () => void }) => {
  const config: configType = useContext(ConfigContext) as configType;

  const inputStyle = {
    fontFamily: "RuneScape07Bold",
    color: "#FFFFFF",
    textShadow: "1px 1px #000000",
    backgroundColor: "transparent",
    border: "none",
    caretColor: "#F7F800",
  };

  const labelStyle = {
    fontFamily: "RuneScape07Bold",
    color: "#FFFFFF",
    textShadow: "1px 1px #000000",
    display: "inline",
  };

  const subLabelStyle = {
    fontFamily: "RuneScape07",
    color: "#FFFFFF",
    textShadow: "1px 1px #000000",
    fontSize: "0.85rem",
  };

  const labelBoxStyle = {
    mx: "8rem",
    height: "1.0rem",
  };

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
    fontFamily: "RuneScape07",
    color: "#F7F800",
    textShadow: "1px 1px #000000",
    fontSize: "0.85rem",
  };

  const crossStyle = {
    minWidth: 26,
    maxWidth: 26,
    height: 22,
    backgroundImage: `url(${cross})`,
    "&:hover": {
      backgroundImage: `url(${crossHover})`,
    },
  };

  const scaleUpperLimit = 5.0;
  const scaleLowerLimit = 0.5;

  const handleScale = (
    input: FieldInputProps<any, HTMLElement>,
    value: string,
  ) => {
    // Change zoom level on mount
    if (
      value !== undefined &&
      Number(value) >= scaleLowerLimit &&
      Number(value) <= scaleUpperLimit
    ) {
      const zoom = (Number(value) * 100).toString() + "%";
      // @ts-ignore
      document.body.style.zoom = zoom;
      const middle = (document.body.scrollHeight / 2) * (Number(value) - 1);
      window.scrollTo(0, middle);
    }
    input.onChange(value);
    config.updateScale(
      Number(value) >= scaleLowerLimit && Number(value) <= scaleUpperLimit
        ? value
        : "",
    );
  };

  const handleHideBackgroundSelect = (
    input: FieldInputProps<any, HTMLElement>,
  ) => {
    config.updateHideBackgroundSelect(!input.value);
    input.onChange(!input.value);
  };

  const handleHideSessionSelect = (
    input: FieldInputProps<any, HTMLElement>,
  ) => {
    config.updateHideSessionSelect(!input.value);
    input.onChange(!input.value);
  };

  return (
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
            ml: "6rem",
            mr: "calc(6rem - 26px)",
            fontFamily: "RuneScape07Bold",
            color: "#F7F800",
            textShadow: "1px 1px #000000",
          }}
        >
          Settings Menu
        </Typography>
        <Button sx={crossStyle} onClick={closeSettings} />
      </Box>
      <Box sx={labelBoxStyle}>
        <InputLabel sx={labelStyle}>{"Scale Factor:\t"}</InputLabel>
        <Field name="scale" component="input" initialValue={config.scale}>
          {({ input }) => (
            <input
              {...input}
              style={inputStyle}
              autoComplete="off"
              type="number"
              onChange={(e) => handleScale(input, e.target.value)}
            />
          )}
        </Field>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: "0.5rem",
        }}
      >
        <Typography
          sx={subLabelStyle}
        >{`Scale must be between ${scaleLowerLimit} and ${scaleUpperLimit}`}</Typography>
      </Box>
      <Box display="flex" ml="6.4rem" mt="0.5rem">
        <Field
          name="hideBackgroundSelect"
          initialValue={config.hideBackgroundSelect}
        >
          {({ input }) => {
            return (
              <Button
                sx={input.value ? checkedStyle : uncheckedStyle}
                onClick={() => handleHideBackgroundSelect(input)}
              />
            );
          }}
        </Field>
        <Typography sx={checkboxLabelStyle}>Hide Background Select</Typography>
      </Box>
      <Box display="flex" ml="6.4rem" mt="0.2rem">
        <Field name="hideSessionSelect" initialValue={config.hideSessionSelect}>
          {({ input }) => {
            return (
              <Button
                sx={input.value ? checkedStyle : uncheckedStyle}
                onClick={() => handleHideSessionSelect(input)}
              />
            );
          }}
        </Field>
        <Typography sx={checkboxLabelStyle}>Hide Session Select</Typography>
      </Box>
    </>
  );
};

export default SettingsContent;
