// Setting up our test framework
const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

// We need Pact in order to use it in our test
const { provider } = require("../pact");
const { eachLike } = require("@pact-foundation/pact").MatchersV3;

// Importing our system under test (the orderClient) and our Order model
const { Product } = require("./product"); 
const { fetchProducts } = require("./productClient");

// This is where we start writing our test
describe("Pact with Product API", () => {
  describe("given there are products", () => {
    const productProperties = {
      id: 1,
      name: "Product 1"
    };

    describe("when a call to the API is made", () => {
      before(() => {
        provider
          .given("there are products")
          .uponReceiving("a request for products")
          .withRequest({
            method: "GET",
            path: "/products",
          })
          .willRespondWith({
            body: eachLike(productProperties),
            status: 200,
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
          });
      });

      it("will receive the list of current products", () => {
        return provider.executeTest((mockserver) => {
          // The mock server is started on a randomly available port,
          // so we set the API mock service port so HTTP clients
          // can dynamically find the endpoint
          process.env.API_PORT = mockserver.port;
          return expect(fetchProducts()).to.eventually.have.deep.members([
            new Product(productProperties.id,productProperties.name),
          ]);
        });
      });
    });
  });
});