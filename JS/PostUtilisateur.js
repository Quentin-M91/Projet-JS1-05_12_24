document.addEventListener("DOMContentLoaded", async () => {
  const postId = new URLSearchParams(window.location.search).get("postId");
  const container = document.getElementById("log-post-details");

  try {
    // Fetch post, user, and comments concurrently
    const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`).then(res => res.json());
    const [comments, user] = await Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`).then(res => res.json()),
      fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`).then(res => res.json()),
    ]); 

    // Exemple pour un fetch :
    const checkResponse = (response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    };

    // Fetch user information based on post.userId


    // Create title and body elements
    const title = document.createElement("h2");
    title.textContent = post.title;

    const body = document.createElement("p");
    body.id = "contenu-post";
    body.textContent = post.body;

    const userInfo = document.createElement("p");
    const strongElement = document.createElement("strong");
    strongElement.textContent = "Posté par : ";
    userInfo.id = "auteur";
    userInfo.appendChild(strongElement);
    userInfo.appendChild(document.createTextNode(user.name));

    // Create comments list
    const commentsList = document.createElement("ul");
    comments.map(comment => {
      const commentItem = document.createElement("li");
      commentItem.textContent = `${comment.name}: ${comment.body}`;
      commentsList.appendChild(commentItem);
    });

    // Count total comments and display the number
    const commentCount = comments.reduce((count, comment) => count + 1, 0);
    const commentCountParagraph = document.createElement("p");
    commentCountParagraph.id = "compteur-coms";
    commentCountParagraph.textContent = `Total comments: ${commentCount}`;

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.id = "delete-post";
    deleteButton.innerHTML = '<i class="fa fa-trash"></i>';

    // Append elements to container
    container.appendChild(title);
    container.appendChild(body);
    container.appendChild(userInfo);
    container.appendChild(commentCountParagraph);
    container.appendChild(commentsList);
    container.appendChild(deleteButton);

    // Delete button functionality
    deleteButton.addEventListener("click", async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          container.innerHTML = 'Le post a été supprimé ! &nbsp;<i class="fa-solid fa-check"></i>';
        } else {
          container.textContent = "Le post n'a pas été supprimé !";
        }
      } catch (error) {
        container.textContent = "Une erreur est survenue lors de la suppression du post.";
      }
    });

  } catch (error) {
    container.textContent = "Impossible de charger le post.";
  }
});
