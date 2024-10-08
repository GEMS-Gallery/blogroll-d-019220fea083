import { backend } from 'declarations/backend';

const entriesContainer = document.getElementById('entries');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const submitButton = document.getElementById('submit');

async function loadEntries() {
    const entries = await backend.getEntries();
    entriesContainer.innerHTML = '';
    entries.forEach(entry => {
        const entryElement = document.createElement('div');
        entryElement.className = 'entry';
        entryElement.innerHTML = `
            <h2>${entry.title}</h2>
            <p>${entry.content}</p>
            <small>Posted on: ${new Date(Number(entry.timestamp) / 1000000).toLocaleString()}</small>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            <button class="delete-btn" data-id="${entry.id}">Delete</button>
        `;
        entriesContainer.appendChild(entryElement);
    });

    // Add event listeners for delete buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', async (e) => {
            const id = Number(e.target.getAttribute('data-id'));
            const deleted = await backend.deleteEntry(id);
            if (deleted) {
                await loadEntries();
            }
        });
    });
}

submitButton.addEventListener('click', async () => {
    const title = titleInput.value;
    const content = contentInput.value;
    if (title && content) {
        await backend.addEntry(title, content);
        titleInput.value = '';
        contentInput.value = '';
        await loadEntries();
    }
});

loadEntries();
