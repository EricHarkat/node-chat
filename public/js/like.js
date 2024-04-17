document.addEventListener('DOMContentLoaded', function() {
    // Écouteur pour les boutons "like"
    //Ici on utilise la délégation d'evenement car comme les messages n'existent pas à la creation du DOM, on ne eput donc la ecouter les evenements des botuons
    //Délégation d'événements : Les écouteurs sont attachés au corps du document (document.body).
    //Cela permet de capturer les événements des éléments like-button et icon même s'ils sont ajoutés dynamiquement au DOM.
    document.body.addEventListener('click', function(e) {
      if (e.target.classList.contains('like-button')) {
        var iconSelector = e.target.nextElementSibling;
        iconSelector.style.display = 'block';
        e.target.style.display = 'none';
      }
    });
  
    // Écouteur pour les icônes
    document.body.addEventListener('click', function(e) {
      if (e.target.classList.contains('icon')) {
        var iconSelector = e.target.parentNode;
        var button = iconSelector.previousElementSibling;
        button.innerHTML = '<img class="icon" src="' + e.target.src + '" />';
        button.style.display = 'block';
        iconSelector.style.display = 'none';
      }
    });
  });