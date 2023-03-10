function getQuote() {
    var queryURL = "https://api.themotivate365.com/stoic-quote"
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var author = document.getElementById("author");
            author.innerHTML = "-" + data.author;
            var quote = document.getElementById("quote");
            quote.innerHTML = '"' + data.quote + '"';
        })
}
getQuote();

//notes submit button 
function saveNote() {
    var saveBtn = document.getElementById("saveBtn");
    var notesInput = document.getElementById("notes-input");
    var notes = localStorage.getItem("notes");
    
    notesInput.textContent = notes;

    saveBtn.addEventListener("click", function (event) {
        event.preventDefault();

        var notesInput = document.getElementById("notes-input").value;
        
        localStorage.setItem("notes", notesInput);
    });
}
saveNote();
