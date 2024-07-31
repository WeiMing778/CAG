const express = require("express")
const mysql = require("mysql2")
const multer = require("multer")
const app = express()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({storage:storage})
const connection = mysql.createConnection({
// host: "localhost",
// user: "root",
// password: "",
// database: "c237_cag"

host: "db4free.net",
user: "weiming",
password: "testtest",
database: "c237_cag23000077"
})
connection.connect((err) => {
if (err) {
console.error("Error connecting to MySQL:", err)
return
}
console.log("Connected to MySQL database")
})
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({
    extended: false
}))

app.get("/", (req, res) => {
    const productSql = "SELECT * FROM products AS P, categories AS C WHERE P.categoryId = C.categoryId ORDER BY P.productId"
    const categorySql = "SELECT * FROM categories ORDER BY categoryId"
    connection.query(productSql, (productError, productResults) => {
        if (productError) {
            console.error("Database query error (products):", productError.message)
            return res.status(500).send("Error retrieving products")
        }
        connection.query(categorySql, (categoryError, categoryResults) => {
            if (categoryError) {
                console.error("Database query error (categories):", categoryError.message)
                return res.status(500).send("Error retrieving categories")
            }
            res.render("index", {
                products: productResults,
                categories: categoryResults
            })
        })
    })
})

app.get("/product/:id", (req, res) => {
    const productId = req.params.id
    const productSql = "SELECT * FROM products AS P, categories as C WHERE P.categoryId = C.categoryId AND productId = ?"
    const categorySql = "SELECT * FROM categories ORDER BY categoryId"

    connection.query(productSql, [productId], (productError, productResults) => {
        if (productError) {
            console.error("Database query error (product):", productError.message)
            return res.status(500).send("Error retrieving product")
        }

        if (productResults.length === 0) {
            return res.status(404).send("Product not found")
        }

        connection.query(categorySql, (categoryError, categoryResults) => {
            if (categoryError) {
                console.error("Database query error (categories):", categoryError.message)
                return res.status(500).send("Error retrieving categories")
            }

            res.render("product", {
                product: productResults[0],
                categories: categoryResults
            })
        })
    })
})

app.get("/addProduct", (req, res) => {
    const sql = "SELECT * FROM categories as C ORDER BY C.categoryId"
    connection.query(sql, (error, categories) =>
    {
        if (error)
        {
            console.error("Error fetching data:", error.message)
            return res.status(500).send("Error Retrieving Categories")
        }
        res.render("addProduct", {categories})
    })
})

app.post("/addProduct", upload.single("image"), (req, res) => {
    const {name, description, price, quantity, category} = req.body
    let image
    if (req.file) {
        image = req.file.filename
    } else {
        image = null
    }
    const sql = "INSERT INTO products (productName, productDesc, productPrice, productQuantity, productImage, categoryId) VALUES (?, ?, ?, ?, ?, ?)"
    connection.query(sql, [name, description, price, quantity, image, category], (error, categories) => {
        if (error)
        {
            console.error("Error adding product:", error)
            res.status(500).send("Error adding product")
        }
        else
        {
            res.redirect("/")
        }
    })
})

app.get("/editProduct/:id", (req,res) => {
    const productId = req.params.id
    const sql = "SELECT * FROM products AS P, categories as C WHERE P.categoryId = C.categoryId AND productId = ?"
    connection.query(sql, [productId], (error, results) =>
    {
        if (error)
        {
            console.error("Database query error:", error.message)
            return res.status(500).send("Error retrieving product by ID")
        }
        
        if (results.length > 0)
        {
            const sql2 = "SELECT * FROM categories ORDER BY categoryId"
            connection.query(sql2, (error, categories) =>
            {
                if (error)
                {
                    console.error("Error fetching data:", error.message)
                    return res.status(500).send("Error Retrieving Categories")
                }
                res.render("editProduct", {product: results[0], categories: categories})    
            })
        }
        else
        {
            res.status(404).send("Product not found")
        }
    })
})

app.get("/products/category/:id", (req, res) => {
    const categoryId = req.params.id
    const sql = "SELECT P.*, C.categoryName FROM products AS P INNER JOIN categories AS C ON P.categoryId = C.categoryId WHERE P.categoryId = ?"
    const sql2 = "SELECT * FROM categories ORDER BY categoryId"
    connection.query(sql, [categoryId], (productError, productResults) => {
        if (productError) {
            console.error("Database query error (products):", productError.message)
            return res.status(500).send("Error retrieving products")
        }
        connection.query(sql2, (categoryError, categoryResults) => {
            if (categoryError) {
                console.error("Database query error (categories):", categoryError.message)
                return res.status(500).send("Error retrieving categories")
            }
            res.render("categories", {
                products: productResults,
                categories: categoryResults,
                selectedCategoryId: categoryId
            })
        })
    })
})

app.post("/editProduct/:id", upload.single("image"), (req, res) => {
    const productId = req.params.id
    const {name, description, price, quantity, category} = req.body
    let image = req.body.currentImage
    if (req.file) {
        image = req.file.filename
    }
    const sql = "UPDATE products SET productName = ?, productDesc = ?, productPrice = ?, productQuantity = ?, productImage = ?, categoryId = ? WHERE productId = ?"
    connection.query(sql, [name, description, price, quantity, image, category, productId], (error, results) => {
        if (error)
        {
            console.error("Error updating product:", error)
            req.status(500).send("Error updating product.")
        }
        else
        {
            res.redirect("/")
        }
    })
})

app.get("/deleteProduct/:id", (req, res) => {
    const productId = req.params.id
    const sql = "DELETE FROM products WHERE productId = ?"
    connection.query( sql , [productId], (error, results) => {
        if (error)
        {
            console.error("Error deleting product:", error)
            res.status(500).send("Error deleting product")
        }
        else
        {
            res.redirect("/")
        }
    })
})

app.get("/about", (req, res) => {
    const categorySql = "SELECT * FROM categories ORDER BY categoryId"
    connection.query(categorySql, (categoryError, categoryResults) => {
        if (categoryError) {
            console.error("Database query error (categories):", categoryError.message)
            return res.status(500).send("Error retrieving categories")
        }
        res.render("about", { categories: categoryResults })
    })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))