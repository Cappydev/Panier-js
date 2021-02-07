import COURSES from '../data/courses.js'

const storedItems = JSON.parse(localStorage.getItem('cart'))
console.log(storedItems);

if (!storedItems) {
    document.getElementById('empty').classList.remove('hidden')
    document.getElementById('cart-table').classList.add('hidden')
}
else {
    let itemsInCart = storedItems.map(item => {
        let article = COURSES.find(c => c.id === item.id)
        return { quantity: item.quantity, article }
    })

    let html = "";
    let total = 0;
    itemsInCart.forEach(item => {
        total += item.article.price * item.quantity;
        html += `<tr>
                    <td></td>
                    <td>${item.article.title}</td>
                    <td>${item.article.price}</td>
                    <td>${item.quantity}</td>
                    <td></td>
                    </tr>`;
    });
    
    html += `<tr>
                <td></td>
                <td></td>
                <th>Total</th>
                <th>${total.toFixed(2)} €</th>
            </tr>`;

    cartEl.innerHTML = html;
}
