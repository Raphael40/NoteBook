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
    this.notes = noteData
  }
}

module.exports = NotesModel;