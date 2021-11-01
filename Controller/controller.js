const { findAll, findById, add, update, remove } = require("../Modal/modal.js");
const { getReqBody } = require("../utils.js");

const corsHeaders = {
   "Access-Control-Allow-Origin": "*",
};

//Error not found
function notFound(res) {
   res.writeHead(404, { ...corsHeaders, "Content-Type": "application/json" });
   res.end(JSON.stringify({ msg: "error not found" }));
}

// @desc    Gets All Products
// @route   GET /api/products
async function getProducts(req, res) {
   try {
      const products = await findAll();
      res.writeHead(200, {
         ...corsHeaders,
         "Content-Type": "application/json",
      });
      res.end(JSON.stringify(products));
   } catch (err) {
      console.log(err);
   }
}

// @desc    Gets a specific Product by id
// @route   GET /api/products/:id
async function getProduct(req, res, id) {
   try {
      const product = await findById(id);
      if (!product) {
         notFound(res);
      } else {
         res.writeHead(200, {
            ...corsHeaders,
            "Content-Type": "application/json",
         });
         res.end(JSON.stringify(product));
      }
   } catch (err) {
      console.log(err);
   }
}

// @desc    Adds a new product
// @route   POST /api/products
async function createProduct(req, res) {
   try {
      const body = await getReqBody(req);
      const { name, description, price } = JSON.parse(body);
      const product = { name, description, price };
      const newProduct = await add(product);

      if (!newProduct) {
         console.log("error resource not found");
      } else {
         res.writeHead(201, {
            ...corsHeaders,
            "Content-Type": "application/json",
         });
         res.end(JSON.stringify(newProduct));
      }
   } catch (err) {
      console.log(err);
   }
}

// @desc    Update an existing product
// @route   PUT /api/products/:id
async function updateProduct(req, res, id) {
   try {
      let product = await findById(id);

      if (!product) {
         notFound(res);
      } else {
         const body = await getReqBody(req);
         const { name, description, price } = JSON.parse(body);
         product = {
            name: name || product.name,
            description: description || product.description,
            price: price || product.price,
         };
         const updProduct = await update(id, product);
         res.writeHead(200, {
            ...corsHeaders,
            "Content-Type": "application/json",
         });
         res.end(JSON.stringify(updProduct));
      }
   } catch (err) {
      console.log(err);
   }
}

// @desc    Deletes an existing product
// @route   DELETE /api/products/:id
async function deleteProduct(req, res, id) {
   try {
      const product = await findById(id);
      if (!product) {
         notFound(res);
      } else {
         await remove(id);
         res.writeHead(200, {
            ...corsHeaders,
            "Content-Type": "application/json",
         });
         res.end(JSON.stringify({ message: `Removed item with ID:${id}` }));
      }
   } catch (err) {
      console.log(err);
   }
}

module.exports = {
   notFound,
   getProducts,
   getProduct,
   createProduct,
   updateProduct,
   deleteProduct,
};
