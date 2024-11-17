const notesContainer = document.querySelector(".notesContainer");
const createBtn = document.querySelector(".btn");

function showNotes() {
    if (localStorage.getItem("notes")) {
        notesContainer.innerHTML = localStorage.getItem("notes");
        const noteWrappers = notesContainer.querySelectorAll('.note-wrapper');
        noteWrappers.forEach(wrapper => {
            const inputBox = wrapper.querySelector('.input-box');
            const img = wrapper.querySelector('img');
            adjustDeleteButtonPosition(inputBox, img);
            window.addEventListener('resize', () => adjustDeleteButtonPosition(inputBox, img));
        });
    }
}

showNotes();

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", () => {
    let noteWrapper = document.createElement('div');
    noteWrapper.className = 'note-wrapper';
    let inputBox = document.createElement("p");
    let img = document.createElement("img");

    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "images/delete.png";
    noteWrapper.appendChild(inputBox);
    noteWrapper.appendChild(img);
    notesContainer.appendChild(noteWrapper);

    inputBox.addEventListener('input', updateStorage);
    adjustDeleteButtonPosition(inputBox, img);

    window.addEventListener('resize', () => adjustDeleteButtonPosition(inputBox, img));

    updateStorage();
});

function adjustDeleteButtonPosition(inputBox, img) {
    const dimensions = inputBox.getBoundingClientRect();
    img.style.position = 'absolute';
    img.style.left = (dimensions.width - 30) + 'px';
    img.style.bottom = '24px';
}

notesContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    } else if (e.target.tagName === "P") {
        let notes = document.querySelectorAll(".input-box");
        notes.forEach(nt => {
            nt.onkeyup = function () {
                updateStorage();
            };
        });
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});