/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NotesView = require('./notesView')
const NotesModel = require('./notesModel')

describe ('NotesView', () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync('./index.html');
  });

  it ('gets the list of notes from the model', () => {
    const notesModel = new NotesModel()
    notesModel.addNote('Hello World')

    const notesView = new NotesView(notesModel)
    notesView.displayNotes()
    expect(document.querySelectorAll('.note')[0].textContent).toEqual('Hello World')
    expect(document.querySelectorAll('.note').length).toEqual(1)
  })

  it ('sets the user input as a new note', () => {
    const notesModel = new NotesModel()
    const input = document.querySelector('#note-input');
    input.value = 'MegaNote'
    notesModel.addNote(input.value)
    const notesView = new NotesView(notesModel)
    
    const addNoteButton = document.querySelector('#add-note-button');
    addNoteButton.click()
    
    expect(document.querySelector('.note').textContent).toEqual('MegaNote')
  })
})