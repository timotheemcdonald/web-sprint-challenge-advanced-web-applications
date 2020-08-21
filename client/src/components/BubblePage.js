import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  const getColors = () => {
  axios
  .get("http://localhost:5000/api/colors")
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
  }, []);


  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;

