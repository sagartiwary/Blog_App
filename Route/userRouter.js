const express = require("express");
const { userRegistered, userLogin } = require("../Controller/userController");
const { blogPost, getBlogs, patchBlogs, deleteBlogs } = require("../Controller/postController");
const { auth } = require("../Middleware/auth");
const uRouter = express.Router();
uRouter.post("/register", userRegistered)
uRouter.post("/login", userLogin)
uRouter.post("/blogs", auth, blogPost)
uRouter.get("/blogs",auth,getBlogs);
uRouter.patch("/blogs/:id",auth,patchBlogs)
uRouter.delete("/blogs/:id",auth,deleteBlogs)
module.exports = {
    uRouter
}