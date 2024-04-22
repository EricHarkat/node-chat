const USERS = {}


document.addEventListener('DOMContentLoaded', (event) => {
    var socket = io();

    document.querySelector('form').addEventListener('submit', function(e) {
      e.preventDefault(); // Empêche le formulaire d'être envoyé
      socket.emit('chat message', document.querySelector('#m').value);
      document.querySelector('#m').value = '';
      return false;
    });

    socket.on('chat message', (payload) => {
        // Recupere l'élément span contenant le nb d'users
        const nbUser= document.getElementById('nb_user')
        nbUser.innerText = payload.nbUser

        // creation d'un utlisateur avec ses propre porpiétés
        if (!USERS.hasOwnProperty(payload.id)) {
            USERS[payload.id] = {
                color: getRandomColor(),
                class : "test",
                tag : payload.tag
            }
        }

        // Ajouter le timestamp heure
        const date = new Date();
        const timeString = document.createElement('span');
        timeString.style.fontSize = 'smaller';
        timeString.style.opacity = '0.6';
        timeString.textContent = date.toLocaleString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });

        // Ajouter le timestamp jour
        const dateString = document.createElement('span');
        dateString.style.fontSize = 'smaller';
        dateString.style.opacity = '0.6';
        dateString.textContent = date.toLocaleString('fr-FR', {
            day: '2-digit',    // Afficher le jour avec deux chiffres
            month: '2-digit',  // Afficher le mois avec deux chiffres
            year: 'numeric'    // Afficher l'année avec quatre chiffres
        });


        // Créer un élément div pour le message
        const item = document.createElement('div');
        item.classList.add('message-form');
        

        // Recupere l'élément <ul> et ajout un <li> contenant l'id utilissateur
        /*for (let i of payload.users) {
            const userList = document.getElementById('userlist')
            for(let li of userList.childNodes){
                if(li.innerText==i){
                    console.log("zaza",li.innerText)
                }else{
                    
                    const li = document.createElement('li')
                    li.innerText = i
                    userList.appendChild(li)
                    console.log(userList.childNodes)
                }
            }
            
         }*/

        


        

        // Créer un élément <div> pour afficher l'id user et son tag
        const user = document.createElement('div');
        user.classList.add('row');
        const blockTag = document.createElement('div')
        blockTag.classList.add('blocktag')
        blockTag.classList.add('col-1')
        const tag = document.createElement('img')   
        tag.classList.add('tag')
        tag.src = USERS[payload.id].tag
        const colId = document.createElement('div')
        colId.classList.add('col-11');
        const rowId = document.createElement('div')
        rowId.classList.add('flex-container')
        const useridDiv = document.createElement('div')
        const userid = document.createElement('div')
        userid.classList.add('iduser')
        // Créer un conteneur <div> pour contenir la date
        const messageHour = document.createElement('div');
        // Ajouter la date au conteneur span
        messageHour.appendChild(timeString);
        messageHour.style.marginLeft = "10px"
        // Créer un conteneur <div> pour contenir la date
        const messageDate = document.createElement('div');
        // Ajouter la date au conteneur span
        messageDate.appendChild(dateString);
        messageDate.style.marginLeft = "20px"
        // Créer un noeud texte sécurisé pour le message pour eviter le inner html
        const textNodeUser = document.createTextNode(`${payload.id}`);
        userid.appendChild(textNodeUser);
        userid.style.color = USERS[payload.id].color
        // Créer un conteneur <div> pour le texte du message
        const blockText = document.createElement('div');
        const messageText = document.createElement('p');
        blockText.appendChild(messageText)
        // Appliquer un id
        messageText.id = payload.id;
        // Créer un noeud texte sécurisé pour le message pour eviter le inner html
        const textNodeMessage = document.createTextNode(`${payload.msg}`);
        // Ajouter le texte au conteneur span
        messageText.appendChild(textNodeMessage);
        blockTag.appendChild(tag)
        user.appendChild(blockTag)
        user.appendChild(colId)
        colId.appendChild(rowId)
        useridDiv.appendChild(userid)
        rowId.appendChild(useridDiv)
        rowId.appendChild(messageDate)
        rowId.appendChild(messageHour)
        colId.appendChild(blockText)


        // Créer un élément div qui va contenir les icones
        const likeBtn = document.createElement('button');
        
        // Attribution d'une class
        likeBtn.classList.add('like-button');
        likeBtn.classList.add('btn-primary');

        // Attribution d'une class
        likeBtn.innerText ="Like"

        // Créer un élément div qui va contenir les icones
        const blockIcon = document.createElement('div');

        // Attribution d'une class
        blockIcon.classList.add('icon-selector');

        // Attribution d'une propriété css 
        blockIcon.style.display = "none";

        // Créer les élément img qui contiendront les icones
        const icon1 = document.createElement('img');
        const icon2 = document.createElement('img');
        const icon3 = document.createElement('img');

        // Ajout de la class icon
        icon1.classList.add('icon');
        icon2.classList.add('icon');
        icon3.classList.add('icon');

        // Attribution du chemin des icones 
        icon1.src = "./public/icons/coeur.svg"
        icon2.src = "./public/icons/sourire.svg"
        icon3.src = "./public/icons/malheureux.svg"

        // Attribution du chemin des icones 
        icon1.dataIcon ="icon1"
        icon2.dataIcon ="icon2"
        icon3.dataIcon ="icon3"

        // Ajouter les icones dans la div
        blockIcon.appendChild(icon1);
        blockIcon.appendChild(icon2);
        blockIcon.appendChild(icon3);
        
        
        // Ajouter le span au li
        item.appendChild(user);
        item.appendChild(likeBtn);
        item.appendChild(blockIcon);

        // Ajouter le message à la liste
        document.getElementById('messages').appendChild(item);

        //alert("Nouveau message de " + payload.id + ": " + payload.msg);
        
        // Faire défiler vers le bas pour afficher le nouveau message
        window.scrollTo(0, document.body.scrollHeight);
      });
  });


// Fonction pour générer une couleur aléatoire
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 3; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}



function deleteMessage(id){
    "❌"
}
