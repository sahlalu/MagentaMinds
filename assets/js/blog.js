async function fetchBlogs() {
    try {
        const response = await fetch('http://localhost:1337/api/blogs?populate=*');
        const data = await response.json();

        console.log(data);  // Debugging to inspect the data structure

        const blogContainer = document.getElementById('blog-cards-container');
        blogContainer.innerHTML = '';

        data.data.forEach(blog => {
            const { Title, Content, slug, Date } = blog.attributes;

            // Extract text from Content array
            const contentText = Content.map(section => {
                return section.children.map(child => child.text).join(' ');
            }).join(' ');

            // Display only first 100 characters for preview
            const previewContent = contentText.substring(0, 100) + '...';

            const blogCard = document.createElement('div');
            blogCard.classList.add('blog-card');

            blogCard.innerHTML = `
                <div class="blog-content">
                    <h3 class="blog-title">${Title}</h3>
                    <p class="blog-description">${previewContent}</p>
                    <p class="blog-date">${new Date(Date).toDateString()}</p>
                    <a href="blog-details.html?slug=${slug}" class="blog-link">Read More</a>
                </div>
            `;

            blogContainer.appendChild(blogCard);
        });
    } catch (error) {
        console.error('Error fetching blog data:', error);
    }
}

// Call the function when the page loads
window.onload = fetchBlogs;
