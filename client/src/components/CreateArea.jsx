import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import generateID from '../services/uuid';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {
  const [note, setNote] = useState({"title": "", "content": "", "id": generateID()})
  const [open, setOpen] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    if (note.title.trim().length < 1 || note.content.trim().length < 1) {
      return
    }

    props.onAdd(note);
    setNote({"title": "", "content": "", "id": generateID()})
    document.getElementById('title-input')?.focus();
  }

  function handleChange(event) {
    const {name, value} = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      }
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='form-note'>
        <input id='title-input' name="title" placeholder="Title" value={note.title} onChange={handleChange} onFocus={() => setOpen(true)} />
        {open && 
        <>
          <textarea name="content" value={note.content} onChange={handleChange} placeholder="Take a note..." rows="3" />
          <Zoom in={true}><Fab type='submit'><AddIcon /></Fab></Zoom>
        </>
      }
      </form>
    </div>
  );
}

export default CreateArea;
