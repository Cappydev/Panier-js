const container = document.getElementsByClassName('courses__container')[0]; // div contenant les articles 

// On créé notre classe Article
export default class Article {

  // déclaration des attributs
  id;
  img;
  title;
  initial_price;
  price;
  mark;
  stock;
  // Ce lance à l'Instanciation de l'objet 
  constructor(course) {
    // Attribution des valeurs
    this.id = course.id;
    this.img = course.img;
    this.title = course.title;
    this.initial_price = course.initial_price;
    this.price = course.price;
    this.mark = course.mark;
    this.stock = course.stock;
    //Création de la card de l'articles 
    this.elem = document.createElement('div');
    this.elem.className = 'course__item';
    this.elem.setAttribute('data-id', this.id);
    this.elem.innerHTML = Article.template(course);
    container.appendChild(this.elem);
  }


  // Fonction qui génère la card d'un articles avec les informations données
  static template = course => `<figure class="course_img">
                                  <img src="img/courses/${course.img}">
                                </figure>
                                <div class="info__card">
                                    <h4>${course.title}</h4>
                                    <figure class="mark m_${course.mark}">
                                        <img src="img/rates.png">
                                    </figure>
                                    <p>
                                        <span class="price">${course.initial_price} €</span>
                                        <span class="discount">${course.price} €</span>
                                    </p>
                                    <p>
                                        Disponible: <span class="stock">${course.stock }</span>
                                    </p>
                                    <a href="#" class="add-to-cart" data-id="${course.id}"><i class="fa fa-cart-plus"></i>Ajouter au panier</a>
                                </div>`;


     incrementStock( amount = 1 ) {
       this.stock += amount
      this.elem.getElementsByClassName('stock')[0].textContent = this.stock;
    }
    
     decrementStock( amount = 1 ) {
       this.stock -= amount
      this.elem.getElementsByClassName('stock')[0].textContent = this.stock;
    }
}
