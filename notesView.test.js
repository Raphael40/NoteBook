/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NotesModel = require('./notesModel')
const NotesClient = require('./notesClient')
const NotesView = require('./notesView')

require('jest-fetch-mock').enableMocks()

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

  it('adds multiple notes', () => {
    const model = new NotesModel();
    const view = new NotesView(model);

    const input = document.querySelector('#note-input');
    input.value = 'NOTE';

    expect(document.querySelectorAll('.note').length).toEqual(0)
    const button = document.querySelector('#add-note-button');
    button.click();

    expect(document.querySelectorAll('.note').length).toEqual(1)

    input.value = 'NOTE'
    button.click();

    expect(document.querySelectorAll('.note').length).toEqual(2)
  });

  it ('fetches data from the api', (done) => {
    const model = new NotesModel();
    const client = new NotesClient();
    const view = new NotesView(model, client);

    fetch.mockResponseOnce(JSON.stringify(
      ["This note is coming from the server"]
    ));

    view.displayNotesFromApi(() => {
      expect(document.querySelector('.note').textContent).toEqual('This note is coming from the server')
      done()
    });

  })
})