const deletePost = async (event) => { 
    event.preventDefault();
        const postId = event.target.getAttribute('post-id');
        const response = await fetch(`/api/post/${postId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            document.location.replace(`/dashboard`);
        } else {
            alert('Error');
        }
};

document.querySelector('.btn-deleteost')
.addEventListener('click', deletePost);
