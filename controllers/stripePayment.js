const stripe = require("stripe")(process.env.STRIPE_KEY);
const uuid = require("uuid");

exports.makePayment = (req, res) => {
  const { products, token } = req.body;

  let amount = 0;
  products.map((product) => {
    amount = amount + product.price;
  });

  const idempotencyKey = uuid();
  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
      description: "a test account",
    })
    .then((customer) => {
      stripe.charges
        .create(
          {
            amount: amount,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: "a test account",
            shipping: {
              name: token.card.name,
              address: {
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                city: token.card.address_city,
                country: token.card.address_country,
                postal_code: token.card.address_zip,
              },
            },
          },
          { idempotencyKey }
        )
        .then((result) => {
          console.log("Ia m happy");
          res.status(200).json({
            result,
          });
        })
        .catch((err) => console.log("err ", err));
    })
    .catch((err) => {
      console.log("error   " + err.message);
    });
};
