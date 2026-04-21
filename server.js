const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const products = [
  { id: 1, name: "Modern Sofa", category: "sofa", price: 1200 },
  { id: 2, name: "Classic Sofa", category: "sofa", price: 900 },
  { id: 3, name: "Wooden Table", category: "table", price: 500 }
];

app.get('/products', (req, res) => {
  const search = req.query.search?.toLowerCase();

  if (!search) {
    return res.json(products);
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search) ||
    p.category.toLowerCase().includes(search)
  );

  res.json(filtered);
});

app.get('/', (req, res) => {
  res.send("Home Advisor API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
