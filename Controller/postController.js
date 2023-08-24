// create post

const { PostModel } = require("../Model/postSchema")

const blogPost = async (req, res) => {
    try {
        let newBlogAdded = new PostModel(req.body);
        await newBlogAdded.save();
        res.status(200).json({ msg: "New blog added", newBlogAdded })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// get routes

const getBlogs = async (req, res) => {
    try {
        const {title,category,sort,order}=req.query;
        let query={};
        if(title){
            query.title={$regex:title,$options:"i"}
        }
        if(category){
            query.category=category
        }
        let sortByDate={};
        if(sort=="date"){
            sortByDate.date=order==='asc'?1:-1;
        }
        let gotAllBlogs = await PostModel.find(query).sort(sortByDate);
        res.status(200).json({ msg: "Successful", data: gotAllBlogs })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// patch blogs

const patchBlogs = async (req, res) => {
    const userDocId = req.body.userID;
    try {
        const { id } = req.params;
        const post = await PostModel.findOne({ _id: id });
        const postDocId = post.userID;
        if (userDocId === postDocId) {
            await PostModel.findByIdAndUpdate(
                { _id: id },
                req.body
            );
            res.status(200).json({ msg: "Blog has been updated" });
        } else {
            res.status(400).json({ msg: "Please Login" });
        }
    } catch (error) {
        res.status(400).json({ msg: "PLease login first" });
    }
}



const deleteBlogs = async (req, res) => {
    const userDocId = req.body.userID;
    try {
        const { id } = req.params;
        const post = await PostModel.findOne({ _id: id });
        const postDocId = post.userID;
        if (userDocId === postDocId) {
            await PostModel.findByIdAndDelete(
                { _id: id }
            );
            res.status(200).json({ msg: "Blog has been Deleted" });
        } else {
            res.status(400).json({ msg: "Please Login" });
        }
    } catch (error) {
        res.status(400).json({ msg: "PLease login first" });
    }
}

module.exports = {
    blogPost, getBlogs, patchBlogs, deleteBlogs
}