document.addEventListener('DOMContentLoaded', function() {
    //Ici on utilise la délégation d'evenement car comme les messages n'existent pas à la creation du DOM, on ne peut donc pas ecouter les evenements des boutons
    /*Au lieu d'attacher un écouteur d'événements à chaque élément individuellement, on attache un seul écouteur à un élément parent. 
    Cet écouteur "écoute" les événements provenant de ses enfants, en utilisant le mécanisme de propagation des événements dans le DOM.*/
    document.body.addEventListener('click', function(e) {
        //L'écouteur vérifie si l'élément qui a déclenché l'événement (e.target) a la classe like-button.
        if (e.target.classList.contains('like-button')) {
            // Trouver la <div> correspondante dans la même <div> que le bouton (noeud frere)
            var iconSelector = e.target.nextElementSibling;
            if (iconSelector.style.display === 'none') {
                iconSelector.style.display = 'block';
            } else {
                iconSelector.style.display = 'none';
            }
        }
    });
  
    // Écouteur pour les icônes
    document.body.addEventListener('click', function(e) {
        //L'écouteur vérifie si l'élément cliqué a la classe icon.
        if (e.target.classList.contains('icon')) {
            //je recupere le noeud parent de du noeud contenant la class icon
            let iconSelector = e.target.parentNode;
            //je recupere le noeud frere du noeud contenant la class icon-selector dans se cas c'est le boutton qui est le frere
            let button = iconSelector.previousElementSibling;
            button.innerHTML = '<img class="icon" src="' + e.target.src + '" />';
            button.style.display = 'block';
            iconSelector.style.display = 'none';
        }
    });
  });