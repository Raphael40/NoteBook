class NotesView {
  constructor(model) {
    this.model = model
    this.buttonNote = document.querySelector('#add-note-button')
    this.mainContainerEl = document.querySelector('#main-container');

    this.buttonNote.addEventListener('click', () => {
      let note = document.querySelector('#note-input')
      model.addNote(note.value)
      this.displayNotes()
    })
  }

  displayNotes() {
    this.model.getNotes().forEach((note) => {
      let div = document.createElement('div')
      div.textContent = note
      div.classList.add('note')
      this.mainContainerEl.append(div)
    })
  }
}

module.exports = NotesView;