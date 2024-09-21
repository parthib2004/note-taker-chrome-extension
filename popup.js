document.getElementById("saveNote").addEventListener("click", saveNote);

function saveNote() {
    const noteInput = document.getElementById("noteInput");
    const note = noteInput.value.trim();

    if (note) {
        // Add note to the list
        const noteList = document.getElementById("noteList");
        const li = document.createElement("li");
        li.textContent = note;

        // Create a delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = () => {
            noteList.removeChild(li);
            saveNotes();
        };
        li.appendChild(deleteBtn);
        noteList.appendChild(li);

        // Clear the input
        noteInput.value = '';

        // Save notes to local storage
        saveNotes();
    }
}

function saveNotes() {
    const notes = [];
    const noteList = document.getElementById("noteList").children;

    for (let li of noteList) {
        notes.push(li.firstChild.textContent); // Get note text
    }

    // Save to local storage
    chrome.storage.local.set({ notes });
}

// Load notes on startup
function loadNotes() {
    chrome.storage.local.get("notes", (data) => {
        if (data.notes) {
            data.notes.forEach(note => {
                const noteList = document.getElementById("noteList");
                const li = document.createElement("li");
                li.textContent = note;

                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Delete";
                deleteBtn.onclick = () => {
                    noteList.removeChild(li);
                    saveNotes();
                };
                li.appendChild(deleteBtn);
                noteList.appendChild(li);
            });
        }
    });
}

// Call loadNotes on page load
loadNotes();
