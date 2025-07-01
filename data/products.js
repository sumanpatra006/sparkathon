// Product categories and items with images for use in inventory and order mapping
const categories = [
  {
    name: "Sports",
    items: [
      {
        name: "Football",
        productId: "prod-001",
        price: 499.99,
        quantity: 20,
        image:
          "https://images.unsplash.com/photo-1486286701208-1d58e9338013?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        name: "Tennis Racket",
        productId: "prod-002",
        price: 799.99,
        quantity: 20,
        image:
          "https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        name: "Cricket Bat",
        productId: "prod-003",
        price: 999.99,
        quantity: 20,
        image:
          "https://plus.unsplash.com/premium_photo-1679917506577-6c986f6faab6?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
  },
  {
    name: "Fashion",
    items: [
      {
        name: "T-shirt",
        productId: "prod-004",
        price: 299.99,
        quantity: 20,
        image:
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        name: "Jeans",
        productId: "prod-005",
        price: 999.99,
        quantity: 20,
        image:
          "https://images.unsplash.com/photo-1475178626620-a4d074967452?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        name: "Sneakers",
        productId: "prod-006",
        price: 1499.99,
        quantity: 20,
        image:
          "https://images.unsplash.com/photo-1465453869711-7e174808ace9?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
  },
  {
    name: "Home Accessories",
    items: [
      {
        name: "Coffee Mug",
        productId: "prod-007",
        price: 99.99,
        quantity: 20,
        image:
          "https://images.unsplash.com/photo-1696431621200-9068cdb0a1bd?q=80&w=1026&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        name: "Wall Clock",
        productId: "prod-008",
        price: 399.99,
        quantity: 20,
        image:
          "https://images.unsplash.com/photo-1605434181093-608f7914f29b?q=80&w=1211&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        name: "Table Lamp",
        productId: "prod-009",
        price: 599.99,
        quantity: 20,
        image:
          "https://images.unsplash.com/photo-1573676386604-78f8ed228e2b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
  },
  {
    name: "Tech",
    items: [
      {
        name: "Smartphone",
        productId: "prod-010",
        price: 14999.99,
        quantity: 20,
        image:
          "https://images.unsplash.com/photo-1575695342320-d2d2d2f9b73f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        name: "Bluetooth Speaker",
        productId: "prod-011",
        price: 1299.99,
        quantity: 20,
        image:
          "https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        name: "Laptop",
        productId: "prod-012",
        price: 49999.99,
        quantity: 20,
        image:
          "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
  },
  {
    name: "Books",
    items: [
      {
        name: "Novel",
        productId: "prod-013",
        price: 199.99,
        quantity: 20,
        image:
          "https://images.unsplash.com/photo-1603162532773-8bcf72814836?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        name: "Comics",
        productId: "prod-014",
        price: 149.99,
        quantity: 20,
        image:
          "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
  },
  {
    name: "Toys",
    items: [
      {
        name: "Action Figure",
        productId: "prod-015",
        price: 499.99,
        quantity: 20,
        image:
          "https://images.unsplash.com/photo-1700825073852-1913b3886584?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        name: "Puzzle",
        productId: "prod-016",
        price: 299.99,
        quantity: 20,
        image:
          "https://images.unsplash.com/photo-1586266984195-7611e3d5e60c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
  },
  {
    name: "Groceries",
    items: [
      {
        name: "Rice Bag",
        productId: "prod-017",
        price: 599.99,
        quantity: 20,
        image:
          "https://images.unsplash.com/photo-1625827626291-6fbd47a431ae?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        name: "Olive Oil",
        productId: "prod-018",
        price: 399.99,
        quantity: 20,
        image:
          "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=718&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
  },
  {
    name: "Beauty",
    items: [
      {
        name: "Face Wash",
        productId: "prod-019",
        price: 199.99,
        quantity: 20,
        image:
          "https://images.unsplash.com/photo-1653919198052-546d44e2458e?q=80&w=714&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        name: "Shampoo",
        productId: "prod-020",
        price: 299.99,
        quantity: 20,
        image:
          "https://images.unsplash.com/photo-1701992678972-d5a053ad0fb0?q=80&w=657&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
  },
  {
    name: "Automotive",
    items: [
      {
        name: "Car Shampoo",
        productId: "prod-021",
        price: 349.99,
        quantity: 20,
        image:
          "https://plus.unsplash.com/premium_photo-1726768966807-330ecbfa087d?q=80&w=719&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        name: "Tyre Polish",
        productId: "prod-022",
        price: 249.99,
        quantity: 20,
        image:
          "https://images.unsplash.com/photo-1673297821205-e0575bbc2ab7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
  },
  {
    name: "Stationery",
    items: [
      {
        name: "Notebook",
        productId: "prod-023",
        price: 49.99,
        quantity: 20,
        image:
          "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Pen Set",
        productId: "prod-024",
        price: 99.99,
        quantity: 20,
        image:
          "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
];

export default categories;
