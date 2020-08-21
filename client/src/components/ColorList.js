import React, { useState } from "react";
import axios from "axios";

import {useParams, useHistory} from 'react-router-dom'

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const {id} = useParams()
  const history = useHistory()

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axios.put(`http://localhost:5000/api/colors/${id}`, colorToEdit)
    .then(res => {
        console.log(res, 'res in submit update form')
      // props.setUpdate(!props.update)
        history.push("/")
    })
    .catch(error => {
        console.log(error, 'this is the error')
    })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    // event.preventDefault()
    axios
    .delete(`http://localhost:5000/api/colors/${colorToEdit.id}`)
    .then((res) => {
     
      console.log(res, res.data, 'res and res.data in delete movie')
      // props.setUpdate(!props.update)
      history.push("/");
      
      // afternoon project
      // server returns the id of the deleted item
      // you will have to filter out that item from the item list
    })
    .catch((err) => console.log(err));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
