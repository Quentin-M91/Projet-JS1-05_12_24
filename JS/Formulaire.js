document.getElementById('Formulaire').addEventListener('submit', function (event) {
    event.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire

    // Récupération des valeurs du formulaire
    const UserID = document.getElementById('UserID').value;
    const titre = document.getElementById('titre').value;
    const body = document.getElementById('body').value;

    let isValid = true;
    let errorMessage = '';


    if (UserID < 1 || UserID >= 100) {
        errorMessage += 'L\'ID Utilisateur ne peut pas être supérieur à 100.<br>';
        isValid = false;
    }

    if (titre.length < 1 || titre.length > 10) {
        errorMessage += 'Le titre ne doit pas dépasser 10 caractères.<br>';
        isValid = false;
    }

    if (body.length < 20) {
        errorMessage += 'Le contenu doit contenir au minimum 20 caractères.';
        isValid = false;
    }

    if (errorMessage) {
        document.getElementById('error').innerHTML = errorMessage;
        document.getElementById('error').style.display = 'block';
        document.getElementById('confirmationMessage').style.display = 'none';  // Masquer la confirmation
        return;
    }

    document.getElementById('error').style.display = 'none';

    // Objet à envoyer dans la requête POST
    const newPost = {
        UserID: parseInt(UserID),
        titre: titre,
        body: body
    };

    // Envoi de la requête POST avec Fetch API
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    })
        .then(response => response.json())
        .then(data => {
            // Affichage du message de confirmation
            document.getElementById('confirmationMessage').style.display = 'block';
            console.log('Post créé:', data);
        })
        .catch(error => {
            console.error('Erreur lors de la création du post :', error);
        });
});