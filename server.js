const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const catalog = [
  {
    id: "P001",
    name: "Harlow Mid-Century Sofa",
    price: 1299,
    color: "Slate Grey",
    category: "Sofa",
    stock: "In Stock",
    dimensions: '84"W x 35"D x 33"H',
    material: "Solid walnut legs, polyester blend",
    style: "Mid-Century",
    tags: "furniture seating living room"
  },
  {
    id: "P002",
    name: "Oslo 3-Seater Sectional",
    price: 1849,
    color: "Oatmeal",
    category: "Sofa",
    stock: "In Stock",
    dimensions: '110"W x 85"D x 32"H',
    material: "Kiln-dried hardwood, performance fabric",
    style: "Scandinavian",
    tags: "furniture seating living room sectional"
  },
  {
    id: "P003",
    name: "Milan Accent Chair",
    price: 699,
    color: "Emerald Green",
    category: "Chairs",
    stock: "Low Stock",
    dimensions: '30"W x 32"D x 34"H',
    material: "Velvet upholstery, brass legs",
    style: "Modern",
    tags: "furniture seating accent"
  },
  {
    id: "P004",
    name: "Copenhagen Coffee Table",
    price: 549,
    color: "Walnut",
    category: "Tables",
    stock: "In Stock",
    dimensions: '48"W x 24"D x 16"H',
    material: "Solid oak, matte finish",
    style: "Scandinavian",
    tags: "furniture surface living room"
  },
  {
    id: "P005",
    name: "Lund 5-Tier Bookshelf",
    price: 349,
    color: "White Oak",
    category: "Storage",
    stock: "In Stock",
    dimensions: '32"W x 12"D x 72"H',
    material: "Engineered wood, metal frame",
    style: "Industrial",
    tags: "furniture storage shelving bookcase"
  }
];

// Token-based search (similar to Apex)
function matchesQuery(product, query) {
  if (!query) return true;

  const searchable = (
    product.name + " " +
    product.color + " " +
    product.category + " " +
    product.style + " " +
    product.material + " " +
    product.tags
  ).toLowerCase();

  const tokens = query.toLowerCase().split(" ");
  return tokens.every(t => searchable.includes(t));
}

app.get('/products', (req, res) => {
  const search = req.query.search || "";
  const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice) : null;
  const category = req.query.category;

  const results = catalog.filter(p => {
    const keywordMatch = matchesQuery(p, search);
    const priceMatch = maxPrice ? p.price <= maxPrice : true;
    const categoryMatch = category ? p.category.toLowerCase() === category.toLowerCase() : true;

    return keywordMatch && priceMatch && categoryMatch;
  });

  res.json({
    count: results.length,
    products: results
  });
});

app.get('/', (req, res) => {
  res.send("Home Advisor API running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
