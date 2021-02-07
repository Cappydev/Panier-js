import { articles } from "./app.js";
import {openModal} from "./popup.js";


const cartEl = document.getElementById('cartEl');
const countProduct = document.getElementById('countProduct');
const itemsInCart = []

export function addToCart(article) {

    if(article.stock == 0 ) {
        openModal(`Votre cours ${article.title} est en rupture de stock :( `, 'red', 'white')
        return false;
    }

    let id = article.id

    let item = itemsInCart.find(e => e.article.id === id);

    if (item) {
        item.quantity++; // Si oui on incrément l'article déjà présent
    } else {
        itemsInCart.push({ article, quantity: 1 }); // Si Non on met la quantité à 1
    }

    updateStorage();

    openModal(`Votre cours ${article.title} a bien été ajouter dans votre panier`);

    article.decrementStock();  
    
    refresh();
    return true;
}


export function clear() {

    for (const item of itemsInCart) {
        item.article.incrementStock(item.quantity);
    }

    itemsInCart.length = 0;
    refresh();
    localStorage.clear();
    openModal("Votre panier a bien été vider")

}

function refresh() {
    let html = "";
    let total = 0;
    let count = 0;
    itemsInCart.forEach(item => {
        total += item.article.price * item.quantity;
        count += item.quantity;
        html += `<tr>
                    <td></td>
                    <td>${item.article.title}</td>
                    <td>${item.article.price * item.quantity} €</td>
                    <td>${item.quantity}</td>
                    <td><i class="far fa-trash-alt deleteArticle" data-id="${item.article.id}"></i></td>
                </tr>`;
    });
    html += `<tr>
                <td></td>
                <td>Total</td>
                <td>${total.toFixed(2)} €</td>
                <td></td>
                <td></td>
            </tr>`;

    cartEl.innerHTML = html;
    countProduct.textContent = count;
    deleteOneProduct();
}

function deleteOneProduct() {
    /**
     * Je créé mon évènement click sur le bouton a supprimé
     * dans l'evenement je delete --
     * 
     */

    const deleteProduct = document.getElementsByClassName('deleteArticle');
    for (let i = 0; i < deleteProduct.length; i++) {

        deleteProduct[i].addEventListener('click', e => {
            e.preventDefault();
            const id = e.target.getAttribute('data-id');
            const item = itemsInCart.find(e => e.article.id === Number(id));
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                for (let i = 0; i < itemsInCart.length; i++) {
                    if (itemsInCart[i].article.id === item.article.id) {
                        itemsInCart.splice(i, 1);
                    }
                }
            }
            openModal(`Votre cours ${item.article.title} a bien été supprimer dans votre panier`);

            updateStorage();

            item.article.incrementStock();
            refresh();
        });
    }
}

export function loadCart() {
    var cartStorage = JSON.parse(localStorage.getItem('cart'));
    if (cartStorage)
    {
        cartStorage.forEach(item => {
            let article = articles.get(item.id);
            itemsInCart.push({ quantity: item.quantity, article })
            article.decrementStock(item.quantity)
        })
    }
    

    refresh();
}

function updateStorage() {
    localStorage.setItem('cart',
        JSON.stringify(itemsInCart.map((item) => { return { quantity: item.quantity, id: item.article.id } }))
    )
}
