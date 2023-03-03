import React from 'react';
import { Fragment } from 'react';

function Wrapper(props: any) {
  return (
   <Fragment>
    <h1> {props.pageHeading} </h1>
    {props.children}
   </Fragment>
  );
}

export default Wrapper;
