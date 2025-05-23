import Note from "../components/Note";
import CreateArea from "../components/CreateArea";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/styles.css"

function Home() {
  const [notes, setNotes] = useState([]);
  const {logged, setLogged} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false); // 👈 Used to manually trigger a fetch

 
  useEffect(() => {
    async function getNotes(params) {
        try {
            const response = await fetch("/api/get-notes")
            const data = await response.json();
            console.log(data)
            setNotes(data)
        } catch (err) {
            console.log(err)
        } finally {setLoading(false)}
    }
    getNotes()
  }, [refresh])


  async function addNoteAPI(note) {
    try {
        const response = await fetch("/api/add-note", {method: 'POST',  headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify(note)})
        

    } catch (err) {
        console.log(err)
    } finally {}
  }


async function addNote(note) {
  setLoading(true);
  await addNoteAPI(note);      // ✅ Wait until note is actually saved
  setRefresh(!refresh);        // or: setRefresh(prev => !prev)
  setLoading(false);
}


  async function deleteNote(note_id) {
    setLoading(true)

    try {
        const response = await fetch(`/api/delete-note?note_id=${note_id}`, {method: "DELETE",
            headers: {'Content-Type': 'application/json'}
        })
        const result = await response.json()

        if (response.ok) {
            setRefresh(prev => ! prev)
        }
        else {
            console.log(result.text)
        }

    } catch (err) {
        console.log(err)

    } finally {setLoading(false)}

    // setNotes(prevNotes => {
    //   return prevNotes.filter((note) => {
    //     return note.id !== note_id
    //   })
    // })
  }

  return (
    <div>
        {loading && <div className="overlay">
            <div className="loader" />
        </div>}

      <CreateArea onAdd={addNote} />
      {notes.map((note, index) => 
      <Note
      key={note.id}
      id={note.id}
      title={note.title}
      content={note.content}
      onDelete={deleteNote}
      />)}
    </div>
  );
}

export default Home;