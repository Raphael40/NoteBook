// const { beforeEach } = require("node:test");
const NotesClient = require("./notesClient");

// This makes `fetch` available to our test
// (it is not by default, as normally `fetch` is only
// available within the browser)
require("jest-fetch-mock").enableMocks();

describe("Client class", () => {

  beforeEach(() => {
    fetch.resetMocks();
  });

  it("calls fetch and loads data", (done) => {
    // 1. Instantiate the class
    const client = new NotesClient();

    // 2. We mock the response from `fetch`
    // The mocked result will depend on what your API
    // normally returns — you want your mocked response
    // to "look like" as the real response as closely as
    // possible (it should have the same fields).
    fetch.mockResponseOnce(
      JSON.stringify({
        note: "Mah note",
      })
    );

    // 3. We call the method, giving a callback function.
    // When the HTTP response is received, the callback will be called.
    // We then use `expect` to assert the data from the server contain
    // what it should.
    client.loadNotes((returnedDataFromApi) => {
      expect(returnedDataFromApi.note).toBe("Mah note");

      // 4. Tell Jest our test can now end.
      done();
    });
  });

  it("Creates a new note", (done) => {
    // 1. Instantiate the class
    const client = new NotesClient();

    // 2. We mock the response from `fetch`
    // The mocked result will depend on what your API
    // normally returns — you want your mocked response
    // to "look like" as the real response as closely as
    // possible (it should have the same fields).
    fetch.mockResponseOnce(
      JSON.stringify({
        content: "My note",
      })
    );


    client.createNote("My note").then(() => {
      console.log(fetch.mock.calls)
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch.mock.calls[0][0]).toBe("http://localhost:3000/notes");
      expect(fetch.mock.calls[0][1].method).toEqual("POST");
      expect(fetch.mock.calls[0][1].body).toEqual(
        JSON.stringify({
          content: "My note",
        })
      );
    });
    done();
  });
});
