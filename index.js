const { NOTFOUND } = require("dns");
const { createServer } = require("http");
const path = require("path");
const {
   notFound,
   getProducts,
   getProduct,
   createProduct,
   updateProduct,
   deleteProduct,
} = require("./Controller/controller.js");

const PORT = process.env.PORT || 5000;
const ORIGIN = "*";

const server = createServer((req, res) => {
   if (req.method === "OPTIONS") {
      res.writeHead(200, {
         "Content-Type": "text/plain",
         "Access-Control-Allow-Origin": ORIGIN,
         "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS",
         "Access-Control-Allow-Headers": "Content-Type",
         /*  "Access-Control-Max-Age": 1728000, */
      });
      res.end("hello");
      return;
   }

   if (req.url === "/api/products" && req.method === "GET") {
      getProducts(req, res);
   } else if (
      req.url.match(/\/api\/products\/[0-9]+$/) &&
      req.method === "GET"
   ) {
      const id = req.url.split("/")[3];
      getProduct(req, res, id);
   } else if (req.url === "/api/products" && req.method === "POST") {
      createProduct(req, res);
   } else if (
      req.url.match(/\/api\/products\/[0-9]+$/) &&
      req.method === "PUT"
   ) {
      const id = req.url.split("/")[3];
      updateProduct(req, res, id);
   } else if (
      req.url.match(/\/api\/products\/[0-9]+$/) &&
      req.method === "DELETE"
   ) {
      const id = req.url.split("/")[3];
      deleteProduct(req, res, id);
   } else {
      notFound(res);
   }
});

server.listen(5000, () => {
   console.log(`!!Server Running At PORT : ${PORT}!!`);
});
