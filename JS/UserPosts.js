document.addEventListener("DOMContentLoaded", async () => {
    const postList = document.getElementById("post-list");
    const userId = new URLSearchParams(window.location.search).get("userId");

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        const posts = await response.json();

        postList.innerHTML = posts.length
            ? posts.map(post => `
                <div class="product-item">
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                </div>
            `).join("")
            : "<p>Aucun message trouvé pour cet utilisateur.</p>";
    } catch {
        postList.innerHTML = "<p>Erreur de chargement.</p>";
    }
});
