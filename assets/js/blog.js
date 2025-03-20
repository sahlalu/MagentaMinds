const blogContainer = document.getElementById('blog-cards-container');
const apiKey = 'AIzaSyALvMrBtPzIuQnfHSaB2D2wq3XsajiTuPg'; // Replace with your actual API Key
const blogId = '6407447980196247561'; // Your Blogger Blog ID
const apiUrl = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}`;

async function fetchBlogs() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.items) {
            blogContainer.innerHTML = data.items.map(post => {
                const postImage = post.content.match(/<img.*?src=["'](.*?)["']/)?.[1] || 'assets/images/default-image.jpg';

                return `
                    <div class="blog-card">
                        <img src="${postImage}" alt="${post.title}" class="blog-image">
                        <h3>${post.title}</h3>
                        <a href="${post.url}" target="_blank" class="read-more-btn">Read More</a>
                    </div>
                `;
            }).join('');
        } else {
            blogContainer.innerHTML = '<p>No blog posts found.</p>';
        }

    } catch (error) {
        console.error('Error fetching blog posts:', error);
        blogContainer.innerHTML = '<p>Failed to load blog posts. Please try again later.</p>';
    }
}

fetchBlogs();
