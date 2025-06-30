// Product categories and items with images for use in inventory and order mapping
const categories = [
  {
    name: "Sports",
    items: [
      {
        name: "Football",
        productId: "prod-001",
        price: 499.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Tennis Racket",
        productId: "prod-002",
        price: 799.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
  {
    name: "Fashion",
    items: [
      {
        name: "T-shirt",
        productId: "prod-003",
        price: 299.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Jeans",
        productId: "prod-004",
        price: 999.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
  {
    name: "Home Accessories",
    items: [
      {
        name: "Bathroom Mug",
        productId: "prod-006",
        price: 99.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Wall Clock",
        productId: "prod-007",
        price: 399.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
  {
    name: "Tech",
    items: [
      {
        name: "Smartphone",
        productId: "prod-008",
        price: 14999.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Bluetooth Speaker",
        productId: "prod-009",
        price: 1299.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
  {
    name: "Books",
    items: [
      {
        name: "Novel",
        productId: "prod-010",
        price: 199.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Comics",
        productId: "prod-011",
        price: 149.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
  {
    name: "Toys",
    items: [
      {
        name: "Action Figure",
        productId: "prod-012",
        price: 499.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Puzzle",
        productId: "prod-013",
        price: 299.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
  {
    name: "Groceries",
    items: [
      {
        name: "Rice Bag",
        productId: "prod-014",
        price: 599.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Olive Oil",
        productId: "prod-015",
        price: 399.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
  {
    name: "Beauty",
    items: [
      {
        name: "Face Wash",
        productId: "prod-016",
        price: 199.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Shampoo",
        productId: "prod-017",
        price: 299.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
  {
    name: "Automotive",
    items: [
      {
        name: "Car Shampoo",
        productId: "prod-018",
        price: 349.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Tyre Polish",
        productId: "prod-019",
        price: 249.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
  {
    name: "Stationery",
    items: [
      {
        name: "Notebook",
        productId: "prod-020",
        price: 49.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Pen Set",
        productId: "prod-021",
        price: 99.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
];

export default categories;
