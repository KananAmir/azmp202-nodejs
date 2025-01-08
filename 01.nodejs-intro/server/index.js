const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());

const port = 8080;

// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));

// // parse application/json
// app.use(bodyParser.json());

app.use(express.json());

const products = [
  {
    id: 1,
    title: "Modern Desk Lamp",
    category: "Home & Decor",
    description:
      "Sleek and adjustable desk lamp with LED lighting. Perfect for reading or working late.",
    price: 49.99,
    imageUrl: "https://i.ebayimg.com/images/g/KNMAAOSw2uViCwc6/s-l1600.jpg",
  },
  {
    id: 2,
    title: "Men's Waterproof Jacket",
    category: "Fashion",
    description:
      "Durable and stylish jacket designed to withstand harsh weather conditions. Perfect for outdoor activities.",
    price: 89.99,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE8P5lugrf37_DPSTvwWviDJc-Lnib5XJIOA&usqp=CAU",
  },
  {
    id: 3,
    title: "Wireless Noise-Canceling Earbuds",
    category: "Electronics",
    description:
      "Advanced earbuds with noise-canceling technology. Enjoy immersive sound quality without external distractions.",
    price: 129.99,
    imageUrl:
      "https://m.media-amazon.com/images/I/61MgPeUAfvL._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: 4,
    title: "Essential Oil Diffuser",
    category: "Wellness",
    description:
      "Aromatherapy diffuser that promotes relaxation and wellness. Create a calming atmosphere at home.",
    price: 34.99,
    imageUrl: "https://m.media-amazon.com/images/I/81T5T4vSosL.jpg",
  },
  {
    id: 5,
    title: "Professional Chef's Knife",
    category: "Kitchen",
    description:
      "High-quality chef's knife crafted for precision and durability. Ideal for cooking enthusiasts.",
    price: 69.99,
    imageUrl:
      "https://media-production.procook.io/cdb005689a683384693389a3d029a3b0.jpg",
  },
  {
    id: 6,
    title: "Portable Bluetooth Speaker",
    category: "Electronics",
    description:
      "Compact and powerful speaker with Bluetooth connectivity. Enjoy music anywhere, anytime.",
    price: 79.99,
    imageUrl:
      "https://www.artis.in/cdn/shop/products/1_f5b3377c-c870-420f-bc6a-5cd4b3a5a7c7.jpg?v=1653639993",
  },
  {
    id: 7,
    title: "Women's Running Shoes",
    category: "Sportswear",
    description:
      "Comfortable and lightweight running shoes designed for active women. Perfect for workouts or casual wear.",
    price: 59.99,
    imageUrl:
      "https://therunhub.ie/cdn/shop/files/2_02a8e41e-fe2b-42c6-b6fb-f18306855939_360x@2x.png?v=1695040307",
  },
  {
    id: 8,
    title: "Vintage Polaroid Camera",
    category: "Photography",
    description:
      "Classic instant camera that captures timeless moments. Embrace the nostalgia of instant photography.",
    price: 129.99,
    imageUrl:
      "https://thirdmanrecords.com/cdn/shop/products/1_polaroid_camera.jpg?v=1611942552",
  },
  {
    id: 9,
    title: "Gaming Laptop",
    category: "Computers",
    description:
      "A high-performance gaming laptop designed for serious gamers.",
    price: 1299.99,
    imageUrl:
      "https://media.karousell.com/media/photos/products/2023/8/22/dell_g15_gaming_laptop_1692703264_340ce827_progressive.jpg",
  },
  {
    id: 10,
    title: "Cookware Set",
    category: "Home & Kitchen",
    description:
      "Complete cookware set with non-stick coating for effortless cooking and easy cleaning.",
    price: 149.99,
    imageUrl:
      "https://assets.tramontina.com.br/upload/tramon/imagens/USA/80110029PDM001G.jpg",
  },
];

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.get("/", (req, res) => {
//   res.send(`<h1>lorem ipsum dolor</h1>`);
// });

// app.get("/message", (req, res) => {
//   res.send({
//     message: "hello",
//   });
// });

// get all data
app.get("/api/products", (req, res) => {
  if (products.length > 0) {
    res.status(200).send({
      data: products,
      message: "success",
      error: null,
    });
  } else {
    res.status(204).send({
      data: [],
      message: "data is empty!",
    });
  }
});
// search products by title
app.get("/api/products/search", (req, res) => {
  const { title: serachQuery } = req.query;

  const filteredProducts = products.filter((q) =>
    q.title.toLowerCase().includes(serachQuery)
  );

  console.log(filteredProducts);

  if (filteredProducts.length > 0) {
    res.status(200).send({
      data: filteredProducts,
      message: "success",
      error: null,
    });
  } else {
    res.status(204).send({
      data: [],
      message: "data is empty!",
    });
  }
});

// get data by id
app.get("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p.id === +id);
  if (product !== undefined) {
    // res.status(200).json(product);
    res.status(200).send({
      data: product,
      message: "success",
    });
  } else {
    res.status(404).send({
      message: "not found!",
    });
  }
});

// delete data by id
app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;

  const idx = products.findIndex((p) => p.id === +id);

  if (idx === -1) {
    res.status(404).send({
      message: "no such product to delete!",
    });
  } else {
    const deleted = products.splice(idx, 1);
    res.status(200).send({
      deletedProduct: deleted,
      products: products,
      message: "succesfully deleted!",
    });
  }
});

// add new data
app.post("/api/products", (req, res) => {
  const { title, category, description, price, imageUrl } = req.body;

  const newProduct = {
    id: uuidv4(),
    title,
    category,
    description,
    price,
    imageUrl,
  };

  products.push(newProduct);
  res.status(201).send({
    message: "successfully posted product!",
    newProduct,
  });
});
// edit data by id
app.put("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const { title, category, description, price, imageUrl } = req.body;

  const idx = products.findIndex((p) => p.id === +id);

  if (idx !== -1) {
    const updatedProduct = {
      id: +id,
      title,
      category,
      description,
      price,
      imageUrl,
    };
    products[idx] = updatedProduct;

    res.status(200).send({
      message: "successfully updated!",
      updatedProduct,
    });
  } else {
    res.status(404).send({ message: "not found" });
  }
});
app.patch("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const { title, category, description, price, imageUrl } = req.body;

  const idx = products.findIndex((p) => p.id === +id);

  if (idx !== -1) {
    if (title !== undefined) {
      products[idx].title = title;
    }
    if (category !== undefined) {
      products[idx].category = category;
    }
    if (description !== undefined) {
      products[idx].description = description;
    }
    if (price !== undefined) {
      products[idx].price = price;
    }

    if (imageUrl !== undefined) {
      products[idx].imageUrl = imageUrl;
    }

    res.status(200).send({
      message: "successfully updated!",
      updatedProduct: products[idx],
      products,
    });
  } else {
    res.status(404).send({ message: "not found" });
  }
});

app.listen(port, () => {
  console.log(`Link:  http://localhost:${port}`);
});
