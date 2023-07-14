const request = require("superagent");
const { Product } = require("./product");

const hostname = "127.0.0.1"

const fetchProducts = () => {
  return request.get(`http://${hostname}:${process.env.API_PORT}/products`).then(
    (res) => {
      return res.body.reduce((acc, o) => {
        acc.push(new Product(o.id, o.name));
        return acc;
      }, []);
    },
    (err) => {
      console.log(err)
      throw new Error(`Error from response: ${err.body}`);
    }
  );
};

module.exports = {
  fetchProducts,
};
