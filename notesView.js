const NotesModel = require("./notesModel")

class NotesView {

  constructor(model, client) {
    this.model = model
    this.client = client
    this.buttonNote = document.querySelector('#add-note-button')
    this.mainContainerEl = document.querySelector('#main-container');

    this.buttonNote.addEventListener('click', () => {
      let note = document.querySelector('#note-input')
      if (note.value.length > 0) {
        this.addNotesToApi(note.value)
        // model.addNote(note.value)
        // this.displayNotes()
      }
    })
  }
  
  displayNotes() {
    const existingNotes = document.querySelectorAll('.note')
    existingNotes.forEach((note) => {note.remove()})
    console.log(this.model.getNotes())
    this.model.getNotes().forEach((note) => {
      let div = document.createElement('div')
      div.textContent = note
      div.classList.add('note')
      this.mainContainerEl.append(div)
      document.querySelector('#note-input').value = ''
    })
  }
  
  addNotesToApi(noteValue) {
    this.client.createNote(noteValue).then(() => {
      this.displayNotesFromApi()
    })
  }

  displayNotesFromApi() {
    this.client.loadNotes(
      (noteData) => {
      this.model.setNotes(noteData)
      this.displayNotes()
    })
  }
}

module.exports = NotesView;