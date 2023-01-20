const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function CreateStripeSession(req, res) {
  const { item } = req.body;

  if (req.method === 'POST') {
    const redirectURL =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://stripe-checkout-next-js-demo.vercel.app';

    const transformedItem = {
      quantity: item.quantity,
      price_data: {
        currency: 'usd',
        unit_amount: item.price * 100,
        product_data: {
          name: item.name,
          description: item.description,
          images: [item.image],
        },
      },
    };

    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [transformedItem],
        mode: 'payment',
        success_url: `${redirectURL}?status=success`,
        cancel_url: `${redirectURL}?status=cancel`,
        metadata: {
          images: item.image,
        },
      });

      res.json({ id: session.id });

    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }

  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

export default CreateStripeSession;
