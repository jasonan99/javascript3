class Product {
  constructor({ product, color, joke, id }) {
    this.product = product;
    this.color = color;
    this.joke = joke;
    this.id = id;
    this.element = null;
  }

  render() {
    const productElement = document.createElement('div');
    productElement.id = this.id;
    productElement.className = 'product';

    const cartImage = document.createElement('div');
    cartImage.className = 'cart-image';
    cartImage.innerHTML = `<img class="cart-img" src="../images/product-${this.product}-${this.color}.jpg"/>`;

    const cartText = document.createElement('div');
    cartText.className = 'cart-text';
    cartText.innerHTML = `
      <div>
        <h3>${this.color} ${this.product} with joke</h3>
        <p>Joke: ${this.joke}</p>
        <button class="remove cart-btn">Remove</button>
      </div>
    `;

    productElement.appendChild(cartImage);
    productElement.appendChild(cartText);

    this.element = productElement;

    const removeBtn = this.element.querySelector('.remove');
    removeBtn.addEventListener('click', () => this.removeProduct());

    return this.element;
  }

  removeProduct() {
    this.element.remove();
    products = products.filter(product => product.id !== this.id);
  }
}

export default Product;