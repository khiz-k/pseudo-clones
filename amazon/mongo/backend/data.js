import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Khizar",
      email: "admin@example.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: true,
      isSeller: true,
      seller: {
        name: "Puma",
        logo: "/images/logo1.png",
        description: "best shoes sellers",
        rating: 4.5,
        numReviews: 120,
      },
    },
    {
      name: "John",
      email: "seller@example.com",
      password: bcrypt.hashSync("1234", 8),
      isSeller: true,
      seller: {
        name: "Nike",
        logo: "/images/logo2.png",
        description: "great shoes sellers",
        rating: 4.0,
        numReviews: 450,
      },
    },
    {
      name: "Sara",
      email: "user@example.com",
      password: bcrypt.hashSync("1234", 8),
    },
  ],
  products: [
    {
      name: "Nike Slim Shirt",
      category: "Shirts", // 680 x 830 px
      image: "/images/p1.jpg",
      price: 89,
      brand: "Nike",
      countInStock: 20,
      rating: 4.5,
      numReviews: 15,
      description: "This is a great product.",
    },
    {
      name: "Lacoste Dress Shirt",
      category: "Shirts", // 680 x 830 px
      image: "/images/p2.jpg",
      price: 79,
      brand: "Lacoste",
      countInStock: 0,
      rating: 4.0,
      numReviews: 15,
      description: "This is a great product.",
    },
    {
      name: "Adidas Fit Shirt",
      category: "Shirts", // 680 x 830 px
      image: "/images/p3.jpg",
      price: 189,
      brand: "Adidas",
      countInStock: 20,
      rating: 4.9,
      numReviews: 15,
      description: "This is a great product.",
    },
    {
      name: "Nike Slim Pant",
      category: "Pants", // 680 x 830 px
      image: "/images/p4.jpg",
      price: 89,
      brand: "Nike",
      countInStock: 20,
      rating: 4.5,
      numReviews: 9,
      description: "This is a great product.",
    },
    {
      name: "D&G Slim Pant",
      category: "Pants", // 680 x 830 px
      image: "/images/p5.jpg",
      price: 70,
      brand: "D&G",
      countInStock: 20,
      rating: 4.5,
      numReviews: 7,
      description: "This is a great product.",
    },
    {
      name: "Lacoste Slim Pant",
      category: "Pants", // 680 x 830 px
      image: "/images/p6.jpg",
      price: 60,
      brand: "Lacoste",
      countInStock: 20,
      rating: 4.7,
      numReviews: 10,
      description: "This is a great product.",
    },
  ],
};
export default data;
