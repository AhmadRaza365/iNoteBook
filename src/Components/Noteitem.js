import React, { useContext } from "react";
import noteContext from "../Context/Notes/NoteContext";

import './Header.css';

const Noteitem = (props) => {

  const context = useContext(noteContext);
  const { deleteNote } = context;

  const { note, updateNote } = props;
  return (
    <div className="col-md-3 m-3 ">
      <div className="card ">
        <div className="card-body">
          <div className=" d-flex justify-content-end " >
          <i className="fas fa-trash-alt icon" onClick={()=>{ deleteNote(note._id);
          props.showAlert("Deleted Successfully", "success");
          }} >Delete</i>
          <i className="fas fa-edit icon" onClick={()=>{updateNote(note); 
      
          }  } >Update</i>
          </div>
          <h3 className="card-title text-success ">{note.title}</h3>
          <p className="card-text">{note.description}</p>
          <h5 className="card-title  text-light bg-dark">{note.tag}</h5>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
