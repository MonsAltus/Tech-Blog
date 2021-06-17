const deletePost = async (event) => { 
    event.preventDefault();
    
        const response = await fetch(`/api/posts/${post_id}`, {
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
