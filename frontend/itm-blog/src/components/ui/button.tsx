import styled, {  css } from "styled-components";

const Button = styled.a`
/* This renders the buttons above... Edit me! */
display: inline-block;
border-radius: 3px;
padding: 0.5rem 0;
margin: 0.5rem 1rem;
width: 11rem;
background: blue;
color: white;
border: 2px solid white;

/* The GitHub button is a primary button
 * edit this to target it specifically! */
${(props: any) => props.primary && css`
  background: white;
  color: black;
`}
`

export default  Button;
