document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("posts-container");

    try {
        const posts = await fetch("https://jsonplaceholder.typicode.com/posts").then(res => res.json());
        for (const post of posts) {
            const user = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`).then(res => res.json());
            const postElement = document.createElement("article");
            postElement.classList.add("product-item");

            const title = document.createElement("h3");
            title.textContent = post.title;
            postElement.appendChild(title);

            const body = document.createElement("p");
            body.textContent = post.body;
            postElement.appendChild(body);

            const username = document.createElement("p");
            username.textContent = `User ID: ${user.id}`;
            postElement.appendChild(username);

            const userLink = document.createElement("a");
            userLink.textContent = "Page 2 - Utilisateur";
            userLink.href = `../HTML/user-posts.html?userId=${post.userId}`;
            userLink.classList.add("button");
            postElement.appendChild(userLink);

            const postLink = document.createElement("a");
            postLink.textContent = "Page 3 - Le post de l'user";
            postLink.href = `../HTML/post-utilisateur.html?postId=${post.id}`;
            postLink.classList.add("button");
            postElement.appendChild(postLink);

            container.appendChild(postElement);
        }
    } catch (error) {

        container.textContent = "Une erreur s'est produite lors du chargement des posts.";
        console.error(error);
    }
});
