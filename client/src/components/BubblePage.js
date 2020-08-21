import React, { useState, useEffect } from "react";
import axiosWithAuth from '../utils/axiosWithAuth'

import styled from 'styled-components'

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const CenterDiv = styled.div`
display:flex;
justify-content:center;
align-items:center;
background-color:whitesmoke;
width:30%;
margin:20px auto;
border:3px black solid;
padding:10px;
`

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  const [update, setUpdate] = useState(true)

  const getColors = () => {
  axiosWithAuth()
  .get("/api/colors")
  .then(res => {
    console.log(res, 'res in get colors on BubblePage')
    console.log(res.data, 'res.data in colors')
    setColorList(res.data)
  })
  .catch(err => {
    console.log(err.response, 'this is an error in getting colors')
  });
}

  useEffect(() => {
    getColors();
  }, [update]);


  return (
    <>
    <CenterDiv>
      <ColorList colors={colorList} updateColors={setColorList} update={update} setUpdate={setUpdate}/>
      </CenterDiv>
      <CenterDiv>
      <Bubbles colors={colorList} />
      </CenterDiv>
    </>
  );
};

export default BubblePage;

