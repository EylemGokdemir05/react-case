import React from "react";
import styled from "styled-components";

const CheckBox = styled.input`
  margin: 6px 10px 5.8px 3px;
  border-radius: 2px;
  border: solid 1px #c6c4d2;
  width: 5%;
  float: left;
`
const Container = styled.div`
  margin-bottom: 0px !important;
  margin-top: 2px;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
`
const Description = styled.p`
  padding-bottom: 1px;
  margin-top: 4px;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  text-align: left;
`

function Filter({ text, handleOnChange, selected }) {

    console.log('text, handleOnChange, selected : ',text, handleOnChange, selected )
  return (
    <Container>
        <CheckBox type="checkbox" checked={selected} onChange={handleOnChange}/>
        <Description className="column" style={{width:"33%",float:"left"}}>{text}</Description>
    </Container>
  );
}

export default Filter;
