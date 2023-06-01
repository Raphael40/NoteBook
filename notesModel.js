class NotesModel {
  constructor() {
    this.notes = []
  }
  
  getNotes() {
    return this.notes
  }

  addNote(note) {
    this.notes.push(note)
  }

  reset() {
    this.notes.length = 0
  }

  setNotes(noteData) {
    noteData.forEach((note) => {
      this.notes.push(note)
    })
  }
}

module.exports = NotesModel;