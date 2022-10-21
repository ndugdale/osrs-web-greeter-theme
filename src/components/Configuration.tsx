import React, { useEffect, useState } from "react";
import defaultBackground from "../assets/images/backgrounds/default.jpg";

export const ConfigContext = React.createContext({});
export interface configType {
  background: string;
  updateBackground: (increment: boolean) => void;
}

const Configuration = ({children}: any) => {
  const importAll = (r: any) => {
    return r.keys().map(r);
  }
  const backgrounds = importAll(require.context(
    '../assets/images/backgrounds',
    false,
    /\.(png|jpe?g|svg)$/
  ));

  const initialBackground = localStorage.getItem('background') ?? defaultBackground;
  let updateBackground = (_: boolean) => {};
  const [config, setConfig] = useState<configType>(
    {
      background: initialBackground,
      updateBackground: updateBackground,
    }
  );

  updateBackground = (increment: boolean) => {
    const index = backgrounds.indexOf(config.background);
    const newIndex = increment 
      ? (index+1)%backgrounds.length
      : (index-1)%backgrounds.length < 0
        ? backgrounds.length-1
        : (index-1)%backgrounds.length;
    const newBackground = backgrounds[newIndex];
    localStorage.setItem("background", newBackground);
    setConfig({...config, background: newBackground});
  }

  useEffect(() => {
    setConfig({...config, updateBackground: updateBackground});
  }, [config.background])

  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
}

export default Configuration;