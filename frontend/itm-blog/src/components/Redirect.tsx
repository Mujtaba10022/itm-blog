import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

function Redirect(props: any) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(props.url);
  }, [])
  return (
   <>
   
   </>
  );
}

export default Redirect;
