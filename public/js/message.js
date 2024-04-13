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

        // Cr

        // Créer un élément div pour le message
        const item = document.createElement('div');

        // Créer un élément li pour le message
        const userid = document.createElement('h6');
        
        // Créer un conteneur span pour le texte du message
        const messageText = document.createElement('span');

        // Créer un conteneur span pour le texte du message
        const messageDate = document.createElement('span');

        // Appliquer un id
        messageText.id = payload.id;

        // Appliquer une couleur
        if (!USERS.hasOwnProperty(payload.id)) {
            USERS[payload.id] = {
                color: getRandomColor()
            }
        }
        item.style.color = USERS[payload.id].color
        
        // Créer un noeud texte sécurisé pour le message
        const textNodeUser = document.createTextNode(`${payload.id}`);

        // Créer un noeud texte sécurisé pour le message
        const textNodeMessage = document.createTextNode(`${payload.msg}`);


        // Ajouter le texte au conteneur span
        userid.appendChild(textNodeUser);
        
        // Ajouter le timestamp
        const date = new Date();
        const timeString = document.createElement('span');
        timeString.style.fontSize = 'smaller';
        timeString.style.opacity = '0.6';
        timeString.textContent = date.toLocaleString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
        });

        // Ajouter la date au conteneur span
        messageDate.appendChild(timeString);
        messageDate.style.paddingRight = 

        // Ajouter le texte au conteneur span
        messageText.appendChild(textNodeMessage);
        
        // Ajouter le span au li
        item.appendChild(userid);
        item.appendChild(messageText);
        item.appendChild(messageDate);
        
        // Ajouter le message à la liste
        document.getElementById('messages').appendChild(item);
        
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
