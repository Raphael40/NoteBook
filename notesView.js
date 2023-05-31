const NotesModel = require("./notesModel")

class NotesView {

  constructor(model, client) {
    this.model = model
    this.buttonNote = document.querySelector('#add-note-button')
    this.mainContainerEl = document.querySelector('#main-container');

    this.buttonNote.addEventListener('click', () => {
      let note = document.querySelector('#note-input')
      // console.log(note.value)
      if (note.value.length > 0) {
        model.addNote(note.value)
        this.displayNotes()
        model.reset()
      }
    })
  }
  
  displayNotes() {
    this.model.getNotes().forEach((note) => {
      let div = document.createElement('div')
      div.textContent = note
      div.classList.add('note')
      this.mainContainerEl.append(div)
      document.querySelector('#note-input').value = ''
    })
  }

  displayNotesFromApi() {
    
  }
}

module.exports = NotesView;