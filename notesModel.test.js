const NotesModel = require("./notesModel");

describe("NotesModel", () => {
  it("has a method getNotes that returns []", () => {
    const model = new NotesModel();

    expect(model.getNotes()).toEqual([]);
  });

  it("has a method addNote that adds note to the list", () => {
    const model = new NotesModel();
    model.addNote("Buy milk");
    model.addNote("Go to the gym");

    expect(model.getNotes()[0]).toEqual("Buy milk");
    expect(model.getNotes()[1]).toEqual("Go to the gym");
  });

  it("has a method reset that removes all notes from the list", () => {
    const model = new NotesModel();
    model.addNote("Buy milk");
    model.addNote("Go to the gym");
    model.reset();

    expect(model.getNotes()).toEqual([]);
  });
});
