import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from 'react-router-dom';
import noteContext from "../Context/Notes/NoteContext";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";

const Notes = (props) => {
  const context = useContext(noteContext);
  let history = useHistory();
  const { notes, getNotes, editNote } = context;
  const [note, setNote] = useState({ id: '', edittitle: "", editdescription: "", edittag: "" });
  useEffect(() => {
    // console.log(localStorage.getItem('token'));
    if(localStorage.getItem('token') ){
      getNotes();
    }
    else{
      history.push('/login')
    }

    // eslint-disable-next-line

  }, );
  
  
  
  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id , edittitle: currentNote.title, editdescription: currentNote.description, edittag: currentNote.tag});
    // setNote(currentNote);

  };


  const ClickonUpdate = (e) => {
    
    editNote(note.id, note.edittitle, note.editdescription, note.edittag);
    refClose.current.click();
    props.showAlert("Updated Successfully", "success");
    // e.preventDefault();
    // newNote(note.title, note.description, note.tag);
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };




  return (
    <>
      <AddNote showAlert={props.showAlert} />

      {/* Modal for editing a note */}

      <button
        type="button"
        className="btn d-none btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >

        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* Update Note Form Start */}

              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="edittitle" className="form-label">
                    Title
                  </label>
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    id="edittitle"
                    name="edittitle"
                    value={note.edittitle}
                    onChange={onChange}
                    placeholder="Title Here"
                    aria-label=".form-control-lg example"
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editdescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control form-control-lg"
                    id="editdescription"
                    value={note.editdescription}
                    name="editdescription"
                    onChange={onChange}
                    aria-label="With textarea"
                    placeholder="Description Here"
                    minLength={5}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="edittag" className="form-label">
                    Tag
                  </label>
                  <input
                    className="form-control form-control-lg"
                    id="edittag"
                    type="text"
                    name="edittag"
                    value={note.edittag}
                    onChange={onChange}
                    placeholder="Tag Here"
                    aria-label=".form-control-lg example"
                    minLength={5}
                    required
                  />
                </div>

                {/* <button
                  type="submit"
                  onClick={ClickonAdd}
                  className="btn btn-success"
                >
                  Add Note
                </button> */}
              </form>

              {/* Update Note Form End */}
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn " data-bs-dismiss="modal">
                Cancel
              </button>
              <button disabled={ note.edittitle.length<5 || note.editdescription.length<5 }  onClick={ClickonUpdate} type="button" className="btn btn-primary">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
              {/* Modal Ends Here */}
      <div className="row my-3 justify-content-center ">
        <h1 className="my-3">Your Notes:</h1>
        
        

        {notes.map((note) => {
          return (
            <Noteitem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
