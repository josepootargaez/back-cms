const express = require('express');
const router = express.Router();
const {getUser,createUser,createRoleUser,getRol,loginUser} = require("../controllers/user-contoller");
const {createCategory,getCategories} = require("../controllers/category-controller");
router.get("/",(req,res)=>{
    res.send("aplications created by jose luis poot")
});

router.get("/users",getUser)
router.get("/roles",getRol)
router.get("/categories",getCategories)
// router.get("/users/:id",getUserbyId)
router.post("/users",createUser)
router.post("/Roleusers",createRoleUser)
router.post("/category",createCategory)
router.post("/login",loginUser)
// router.delete("/users/:id",deleteUserbyId)
// router.patch("/users/:id",updateUser)

module.exports= router;