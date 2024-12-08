// fetch ('https://jsonplaceholder.typicode.com/posts')
//     .then((response) => response.json())
//     .then(json => console.log(json));

// fetch('https://jsonplaceholder.typicode.com/posts')
//     .then(response => {
//         let userArray = response;
//         response.json().then(data => {
//             let userArray = data;
//             console.dir(userArray)

//             // extraction d'un user
//             let user = userArray[0];
//             console.log(user);
//         })
//     })

try {
    // On récupère dans un appel HTTP
    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let users = await response.json();
    console.log(users);
    // Récupération des 100 users
    for (let i = 0; i < 100; i++) {
        // L'user de l'itération
        let user = users[i];
        // Crée un élément dans le DOM
        let userElement = document.createElement("p")
        // On injecte du texte dans l'élément 
        userElement.textContent = `Nom d'utilisateur : ${user.userId} titre : ${user.title} Contenu : ${user.body}`
        // On rattache l'élément au DOM
        document.body.appendChild(userElement);
    } 
} catch (err) {
    console.log("erreur sur cette partie");
}



// const loadHeader = () => {
//     fetch('https://jsonplaceholder.typicode.com/posts')
//     .then(res => {
//         return res.text()
//     })
//     .then(data => {
//         document.querySelector('#header__part').innerHTML = data;
//     })
//     console.log('header');
// }
// loadHeader();

