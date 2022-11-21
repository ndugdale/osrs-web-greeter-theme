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
  valuesChanged: (remember: boolean, hide: boolean, username: string) => boolean;
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
  let valuesChanged = (_0: boolean, _1: boolean, _2: string) => false;

  const [initialValues] = useState({
    background: initialBackground,
    unmuted: initialUnmuted,
    rememberUsername: initialRememberUsername,
    hideUsername: initialHideUsername,
    lastUsername: initialLastUsername,
  });

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
      valuesChanged: valuesChanged,
    }
  );

  valuesChanged = (remember, hide, username) => {
    return (
      config.background !== initialValues.background ||
      config.unmuted !== initialValues.unmuted ||
      remember !== initialValues.rememberUsername ||
      hide !== initialValues.hideUsername ||
      (remember && username !== initialValues.lastUsername)
    );
  }

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
        valuesChanged: valuesChanged,
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
      valuesChanged: valuesChanged,
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