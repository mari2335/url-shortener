const createButton = document.getElementById("button-create");
const deleteButton = document.getElementById("button-delete");
const inputUrl = document.getElementById('input-url');
const textForError = document.getElementById("error-p")
const orderedList = document.getElementById('list-url');

const checkUrlValidity = (url) => /https:\/\/.+(\.com|\.org).+/.test(url);

const createShortUrl = () => "localhost/" + generateRandomString(5);

const generateRandomString = (length) => {
    let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        let num = Math.floor(Math.random() * charset.length);
        result += charset[num];
    }
    return result;
}

const handleSave = (id) => {
    console.log("hey")
    const newUrlInput = document.getElementById(`input-${id}`)
    const newUrlValue = newUrlInput.value;
    const oldUrlValue = document.getElementById(`li-${id}`).innerText.split("-")[1].trim()

    const anchor = document.createElement('a');
    anchor.setAttribute("id", `item-${id}`);
    anchor.setAttribute("href", oldUrlValue);
    anchor.setAttribute('target', '_blank');
    anchor.innerHTML = "localhost/" + newUrlValue;

    newUrlInput.parentNode.insertBefore(anchor, newUrlInput);
    newUrlInput.parentNode.removeChild(newUrlInput);

    document.getElementById(`button-edit-${id}`).innerText = 'Edit';
}

const handleEdit = (id) => {

    const anchor = document.getElementById(`item-${id}`);
    const newInput = document.createElement('input');

    newInput.setAttribute("id", `input-${id}`)
    newInput.setAttribute('value', `${anchor.innerHTML.split("/")[1]}`)

    console.log(anchor.parentNode)
    anchor.parentNode.insertBefore(newInput, anchor);
    anchor.parentNode.removeChild(anchor);

    const bt = document.getElementById(`button-edit-${id}`);
    bt.innerText = 'Save';
}

const handleBothClicks = (id) => {
    const editButton = document.getElementById(`button-edit-${id}`)
    editButton.innerText === 'Edit' ? handleEdit(id) : handleSave(id);
}

let liTracker = 0;
createButton.addEventListener("click", () => {
    let url = inputUrl.value;

    if (checkUrlValidity(url)) {
        textForError.setAttribute("hidden", true);
        let shortUrl = createShortUrl();

        liTracker++;
        orderedList.innerHTML += `
            <li id="li-${liTracker}">
                <a id="item-${liTracker}" href=${url} target="_blank">${shortUrl}</a>
                 - ${url} - 
                <span id="count-item-${liTracker}">Clicks: 0</span>
                <button id="button-edit-${liTracker}" onclick="handleBothClicks(liTracker)">Edit</button>
            </li>
        `;
    } else {
        textForError.removeAttribute("hidden");
        textForError.innerHTML = "Please enter a valid url";
    }
})

deleteButton.addEventListener("click", () => {
    const input = inputUrl.value;

    if (input === "") {
        orderedList.innerHTML = "";
    } else {
        const lis = document.querySelectorAll("#list-url li")
        lis.forEach(li => {
            if (li.innerText.split(" - ")[1] === input) {
                li.parentNode.removeChild(li);
            }
        })
    }
})

orderedList.addEventListener("click", (e) => {

    if (e.target.tagName === 'A') {
        const anchorId = e.target.id;
        const span = document.getElementById(`count-${anchorId}`)
        console.log(span.innerText.split(" "))
        let currentCount = span.innerText.split(" ")[1];
        currentCount++;
        span.textContent = `Clicks: ${currentCount}`;
    }
})
