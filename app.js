const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Configuration de Twig
app.set('view engine', 'twig');
app.set('views', './views');

// Servez les fichiers statiques (nécessaire pour le client socket.io)
app.use(express.static('public'));

// Route de l'index
app.get('/', (req, res) => {
  res.render('index', { title: 'Chat en direct', message1: 'La', message2: 'en direct!', nombre : nbUser });
});


let nbUser = 0;
// Gestion des connexions WebSocket
io.on('connection', (socket) => {
  console.log('Un utilisateur s\'est connecté');
  nbUser = nbUser+1


  socket.on('disconnect', () => {
    console.log('Un utilisateur s\'est déconnecté');
    nbUser = nbUser-1
  });

  socket.on('chat message', (msg) => {
    if(msg && msg.trim() != ""){
        io.emit('chat message', {
            id: socket.id,
            msg: msg,
            nbUser: nbUser
        } );
    }
  });
});

// Remplacer app.listen par http.listen
const PORT = process.env.PORT || 3000;
http.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});