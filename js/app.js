import Article from './Article.js'
import * as cart from './cart.js'
import { openModal } from './popup.js';

const localApi = false;

export let articles = new Map();


/** --------    Quantité sur les card     ------------
 * Quantité disponible 
 * - Désincrémenté la quantité disponible
 * - Actualisé l'affichage
 * - Si il en reste 0 ca ne peu pas être rajouté au panier
 */

/** Prix Total de mon panier / Prix total par quantité du produits
 * 
 * 
 */

// On récupère les cours via l'api
fetch(localApi ? 'http://localhost:8080/courses' : 'https://panierjs-api.herokuapp.com/courses').then(async res => {
    if (res.ok) {
        const COURSES = await res.json();
        for (const course of COURSES) {
            // On instancie un nouvelle objet Article, avec en paramètre les informations dans la variable course
            // On push dans le tableau "articles" le nouvelle objet "article" créé
            articles.set(course.id, new Article(course));
        }


        // On récupère tout les bouton "Ajouter au panier"
        const addCart = document.getElementsByClassName('add-to-cart');
        // Pour chaque bouton 
        for (let i = 0; i < addCart.length; i++) {
            // On ajoute un événement click 
            addCart[i].addEventListener('click', e => {
                // on annule l'action par défault
                e.preventDefault();
                // On récupère l'id de l'article dans l'attribut data-id
                const id = +e.target.getAttribute('data-id');

                if (cart.addToCart(articles.get(id))) {
                    // lancement de l'animation avec le card à animer en paramètre
                    animate(e.target.parentNode.parentNode);
                }
            });
        }

        // RÉCUPÉRER LES DONNEES DU LOCALSTORAGE
        cart.loadCart();
    }
    else
        throw new Error();
}).catch(err => {
    openModal("Impossible de charger les cours", 'red', 'white');
})



// On récupère le bouton qui sert à vider le panier
const deleteAllProduct = document.getElementById('empty-cart');
// on ajoute un événement click
deleteAllProduct.addEventListener('click', e => {
    // on annule l'action par défault
    e.preventDefault();
    // On vide l'objet cart
    cart.clear()
});




// création de l'animation pour ajouter un article au panier
const animate = card => {
    const body = document.body;
    const bodyRect = body.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const cartRect = document.getElementById('img-cart').getBoundingClientRect();

    const animateCard = card.cloneNode(true);
    animateCard.style.position = 'absolute';
    animateCard.style.top = cardRect.top - bodyRect.top + 'px';
    animateCard.style.left = cardRect.left - bodyRect.left + 'px';
    animateCard.style.width = card.offsetWidth + 'px';
    animateCard.style.height = card.offsetHeight + 'px';

    body.appendChild(animateCard);

    card.style.visibility = 'hidden';
    card.style.transform = 'scale(0)';



    animateCard.animate([
        // keyframes
        {},
        {
            border: '1px solid rgba(0,0,0,.25)',
            left: cartRect.left - bodyRect.left + 'px',
            top: cartRect.top - bodyRect.top + 'px',
            transform: 'scale(.1) translateY(-450%) translateX(-450%)',

        },
        {
            border: '1px solid rgba(0,0,0, 0)',
            opacity: '1',
            left: cartRect.left - bodyRect.left + 'px',
            top: cartRect.top - bodyRect.top + 'px',
            transform: 'scale(.1)  translateY(-450%) translateX(-450%)',
        },
        {
            opacity: '0',
            left: cartRect.left - bodyRect.left + 'px',
            top: cartRect.top - bodyRect.top + 'px',
            transform: 'scale(.1)  translateY(-450%) translateX(-450%)',
        },
    ], { duration: 1500 });

    setTimeout(() => {
        card.style.transition = '.5s';
        card.style.visibility = 'visible';
        card.style.transform = 'scale(1)';
        setTimeout(() => card.style.transition = '0s', 300);
    }, 300);

    setTimeout(() => animateCard.parentNode.removeChild(animateCard), 1500);
}