class Product {
  constructor({ product, color, joke }) {
    this.product = product;
    this.color = color;
    this.joke = joke;
  }

  render() {
    const product = document.getElementById('product');
    product.innerHTML += `
      <div class="product">
        <img class="cart-img" src="../images/product-${this.product}-${this.color}.jpg"/>
        <div>
          <h3>${this.color} ${this.product} with joke</h3>
          <p>Joke: ${this.joke}</p>
          <button>Remove</button>
        </div>
      </div>
    `;

    return product;
  }
}

export default Product;