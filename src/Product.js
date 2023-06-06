class Product {
  constructor({ product, color, joke,id }) {
    this.product = product;
    this.color = color;
    this.joke = joke;
    this.id = id;
  }

  render() {
    const product = document.getElementById('product');
    product.innerHTML += `
      <div id="${this.id}" class="product">
        <div class="cart-image">
          <img class="cart-img" src="../images/product-${this.product}-${this.color}.jpg"/>
        </div>  
        <div class="cart-text">
          <div>
            <h3>${this.color} ${this.product} with joke</h3>
            <p>Joke: ${this.joke}</p>
            <button class="remove cart-btn">Remove</button>
          </div>
        </div>
      </div>
    `;

    return product;
  }
}

export default Product;