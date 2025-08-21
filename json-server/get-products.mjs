'use strict';

import axios from "axios"

const productsRequest = await axios.get("http://localhost:3000/products");
for (const product of productsRequest.data) {
  try {
    await axios.put(`http://localhost:3000/products/${product.id}`, JSON.stringify({
      ...product,
      /* if you want to add or adjust a property, specify it below with your desired value
      stock: Math.random() * 100,
      rating: parseFloat((Math.random() * 5).toPrecision(2))
      reviews: []*/
    }))
  } catch (error) {
    console.error(error.message);
  };
};
