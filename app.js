const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const fs = require('fs');
const path = require('path');

// Configuration de Twig
app.set('view engine', 'twig');
app.set('views', './views');

// Servez les fichiers statiques (nécessaire pour le client socket.io)
app.use('/public', express.static(path.join(__dirname, 'public')));

// Route de l'index
app.get('/', (req, res) => {
  res.render('index', { title: 'Chat en direct', message1: 'La', message2: 'en direct!', nombre : nbUser, listUsers : users });
});

let users = []
let nbUser = 0;

//fonction qui supprime un utilisateur
function removeUser(array, id){
    const index = array.indexOf(id)
    if (index > -1) {
        array.splice(index, 1);
    }
}
const filenames = fs.readdirSync(__dirname); 
filenames.forEach(file => { 
    console.log(file); 
  }); 




// Fonction qui retourne une image aléatoire du dossier 'tag'
function getRandomImage(folderPath) {
    // Lire le contenu du dossier
    const files = fs.readdirSync(folderPath);
  
    // Filtrer uniquement les fichiers qui sont des images (basé sur les extensions communes)
    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|gif)$/i.test(path.extname(file))
    );
  
    if (imageFiles.length === 0) {
      throw new Error("Aucune image trouvée dans le dossier.");
    }
  
    // Sélectionner une image au hasard
    const randomIndex = Math.floor(Math.random() * imageFiles.length);
    const randomImage = imageFiles[randomIndex];
  
    return path.join(folderPath, randomImage); // Retourne le chemin complet de l'image
}

const imageFolderPath = './public/tag' // Remplacez par le chemin de votre dossier
try {
  const randomImage = getRandomImage(imageFolderPath);
  console.log('Image aléatoire:', randomImage);
} catch (error) {
  console.error(error.message);
}

// Gestion des connexions WebSocket
io.on('connection', (socket) => {
    console.log(`l\'utilisateur ${socket.id} s\'est connecté`);
    nbUser = nbUser + 1
    users.push(socket.id)
    console.log('la liste des utlisateurs est : ', users)

  socket.on('disconnect', () => {
    console.log(`l\'utilisateur ${socket.id} s\'est déconnecté`);
    nbUser = nbUser-1
    removeUser(users,socket.id)
    console.log(users)
  });

  socket.on('chat message', (msg) => {
    if(msg && msg.trim() != ""){
        io.emit('chat message', {
            id: socket.id,
            msg: msg,
            tag:getRandomImage(imageFolderPath),
            nbUser: nbUser,
            users: users
        } );
    }
  });
});

// Remplacer app.listen par http.listen
const PORT = process.env.PORT || 3000;
http.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});