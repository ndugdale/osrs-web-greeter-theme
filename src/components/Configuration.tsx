import React, { useEffect, useState } from "react";
import defaultBackground from "../assets/images/backgrounds/default.jpg";

export const ConfigContext = React.createContext({});
export interface configType {
  background: string;
  updateBackground: (increment: boolean) => void;
  unmuted: boolean;
  updateUnmuted: () => void;
  rememberUsername: boolean;
  updateRememberUsername: (remember: boolean) => void;
  hideUsername: boolean;
  updateHideUsername: (hide: boolean) => void;
  lastUsername: string;
  updateLastUsername: (username: string) => void;
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
  const initialUnmuted = localStorage.getItem('unmuted') === "true";
  let updateUnmuted = () => {};
  const initialRememberUsername = localStorage.getItem('rememberUsername') === "true";
  let updateRememberUsername = (_: boolean) => {};
  const initialHideUsername = localStorage.getItem('hideUsername') === "true";
  let updateHideUsername = (_: boolean) => {};
  const initialLastUsername = localStorage.getItem('lastUsername') ?? "";
  let updateLastUsername = (_: string) => {};

  const [config, setConfig] = useState<configType>(
    {
      background: initialBackground,
      updateBackground: updateBackground,
      unmuted: initialUnmuted,
      updateUnmuted: updateUnmuted,
      rememberUsername: initialRememberUsername,
      updateRememberUsername: updateRememberUsername,
      hideUsername: initialHideUsername,
      updateHideUsername: updateHideUsername,
      lastUsername: initialLastUsername,
      updateLastUsername: updateLastUsername,
    }
  );
  const [update, setUpdate] = useState(false);

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
    setUpdate(true);
  }

  updateUnmuted = () => {
    const next = !config.unmuted;
    localStorage.setItem("unmuted", next.toString());
    setConfig({...config, unmuted: next});
    setUpdate(true);
  }

  updateRememberUsername = (remember: boolean) => {
    localStorage.setItem("rememberUsername", remember.toString());
    setConfig({...config, rememberUsername: remember});
    setUpdate(true);
  }

  updateHideUsername = (hide: boolean) => {
    localStorage.setItem("hideUsername", hide.toString());
    setConfig({...config, hideUsername: hide});
    setUpdate(true);
  }

  updateLastUsername = (username: string) => {
    localStorage.setItem("lastUsername", username);
    setConfig({...config, lastUsername: username});
    setUpdate(true);
  }

  useEffect(() => {
    if(update){
      setConfig({
        ...config,
        updateBackground: updateBackground,
        updateUnmuted: updateUnmuted,
        updateRememberUsername: updateRememberUsername,
        updateHideUsername: updateHideUsername,
        updateLastUsername: updateLastUsername,
      });
      setUpdate(false);
    }
  }, [config, update])

  useEffect(() => {
    setConfig({
      ...config,
      updateBackground: updateBackground,
      updateUnmuted: updateUnmuted,
      updateRememberUsername: updateRememberUsername,
      updateHideUsername: updateHideUsername,
      updateLastUsername: updateLastUsername,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
}

export default Configuration;