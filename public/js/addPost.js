const newPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title-input').value.trim();
    const content = document.querySelector('#content-input').value.trim();

    if (title && description) {
        // If both fields have data use api post route.
        const response = await fetch('/api/posts/', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace(`/dashboard`);
        } else {
            alert('Error');
        }
    }
};

document
    .querySelector('.add-post-form')
    .addEventListener('click', newPostHandler);
