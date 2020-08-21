import React from "react";
import { render, screen } from "@testing-library/react";
import BubblePage from "./BubblePage.js";

const bubbleData = [
  {
    code: {hex: "#f0f8ff"},
    color: "aliceblue",
    id: 1
  },
  {
    code: {hex: "#99ddbc"},
    color: "limegreen",
    id: 2
  },
  {
    code: {hex: "#00ffff"},
    color: "aqua",
    id: 3
  }
]


test("Fetches data and renders the bubbles", () => {
  // Finish this test

  const {rerender} = render(<BubblePage colorList={[]} />)

  let episodesArray = screen.queryAllByTestId(/colors/i)
  expect(episodesArray).toHaveLength(0)

  rerender(<BubblePage colorList={bubbleData}/>)

  episodesArray = screen.getAllByTestId(/colors/i)
  expect(episodesArray).toHaveLength(3)

});
