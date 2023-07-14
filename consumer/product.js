class Product {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  toString() {
    return `Product ${this.id}, Name: ${this.name}`;
  }
}

module.exports = {
  Product,
};
