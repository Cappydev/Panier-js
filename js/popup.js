let container = document.getElementById('popup-container');


export function openModal(textShow, customBg = false, customColor = false) {

    let pop = document.createElement('div');
    pop.classList.add('overlay');
    pop.innerHTML = template(textShow);

    if (customBg) {
        pop.childNodes[1].style.background = customBg;
    }

    if (customColor) {
        pop.childNodes[1].style.color = customColor;
    }

    let popShow = container.appendChild(pop);

    setTimeout(() => closeModal(popShow), 3000);
}

export function closeModal(pop) {
    pop.style.transform = 'scale(0)';
    setTimeout(() => pop.remove(), 300);
}

const template = text => `
                    <div id="popup" class="popup"> 
                        <p>
                            ${text}
                        </p>
                    </div>
                       `;