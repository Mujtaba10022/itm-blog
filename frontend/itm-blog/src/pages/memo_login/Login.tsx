import React, { useCallback, useState } from 'react';
import './login.css';
import { Link } from "react-router-dom";

import Heading from '../../components/ui/heading'
import Wrapper from '../../components/Wrapper'
import styles from './Login.module.css';

function Login() {

  const [showPara, setPara] = useState(true);
  const [render, setRender] = useState(true);

  const [renderTwo, setRenderTwo] = useState(true);

  const handleRender = () => {
    setRender((render) =>  render = !render);
  }

  const handleRenderTwo = () => {
    setRenderTwo((renderTwo) =>  renderTwo = !renderTwo);
  }

  const handleToggle = useCallback(() => {
    setPara((showPara) =>  showPara = !showPara);
  }, [render]);

  return (
    <>

    <button onClick={handleRender}> Set parent state </button>

    <button onClick={handleRenderTwo}> Second state change </button>

      <Heading handleToggle={handleToggle} showPara={showPara} />

      <button onClick={handleToggle}> toggle </button>
      <Link className='anchor'  to="/signup">Signup</Link>
    </>
  );
}

export default Login;
