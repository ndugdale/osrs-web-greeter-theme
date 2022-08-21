import { useEffect } from 'react';
import LoginScreen from './components/LoginScreen';

function App() {

  useEffect(() => {
    document.body.style.backgroundColor = "black";
  },[]);
  
  return(
    <LoginScreen/>
  );
}

export default App;
