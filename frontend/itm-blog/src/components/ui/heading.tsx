import React from 'react';
import ReactDOM from 'react-dom';


function Heading(props: any) {
  console.log('HEADING----');

  return (
    
   <>
   {props.showPara &&
    <p> WElcome</p>
   }
   </>
  );
}

export default React.memo(Heading);