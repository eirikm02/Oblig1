let currentPage = 1;
const postsContainer = document.getElementById('posts-container');
const loader = document.getElementById('loader');

function fetchPosts(page) {
    const url = `https://jsonplaceholder.typicode.com/posts?_limit=3&_page=${page}`; 

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                data.forEach(post => createPostElement(post));
            } else {
                loader.style.display = 'none'; 
            }
        })
        .catch(error => console.error('Error fetching posts:', error));
}

function createPostElement(post) {
    const postElement = document.createElement('div');
    postElement.className = 'post';
    postElement.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
    `;
    postsContainer.appendChild(postElement);
}

function handleScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        currentPage++;
        fetchPosts(currentPage);
    }
}

fetchPosts(currentPage);

window.addEventListener('scroll', handleScroll);
