const deletePost = async (event) => { 
    event.preventDefault();
        const postId = event.target.getAttribute('post-id');
        const response = await fetch(`/api/post/${post_id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            document.location.replace(`/dashboard`);
        } else {
            alert('Error');
        }
};

document.querySelector('.btn-deletePost')
.addEventListener('click', deletePost);
