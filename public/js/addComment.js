const addCommentHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#add-comment').value.trim();
    const postId = event.target.getAttribute('post-id');

    if (comment) {
        const response = await fetch('/api/comments/', {
            method: 'POST',
            body: JSON.stringify({ comment, postId }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace(`/post/${post_id}`);
        } else {
            alert('Error');
        }
    }
};

document
    .querySelector('.add-comment-form')
    .addEventListener('submit', addCommentHandler);