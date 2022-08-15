import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    try {
        const postMessage = await PostMessage.find();
        console.log(postMessage);
        res.status(200).json(postMessage);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    console.log(post);
    const newPost = new PostMessage(post);
    console.log(newPost);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
        // https://www.restapitutorial.com/httpstatuscodes.html
    }
}

export const updatePost = async (req, res) => {
    // res.send("Post update working");
    const { id: _id } = req.params;
    if (mongoose.Types.ObjectId.isValid(_id)) {
        const post = req.body;
        try {

            const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
            res.status(200).json(updatedPost);
        } catch (error) {
            return res.status(404).send('Post not found');
        }
    }
}

export const deletePost = async (req, res) => {
    // res.send("Post delete working");
    const { id } = req.params;
    if (mongoose.Types.ObjectId.isValid(id)) {
        try {
            await PostMessage.findByIdAndRemove(id);
            res.status(200).json('Post deleted successfully');
        } catch (error) {
            res.status(404).send('Post not found');
        }
    }

}

export const likePost = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    if (mongoose.Types.ObjectId.isValid(id)) {
        try {
            const post = await PostMessage.findById(id);
            console.log(post);
            const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
            res.status(200).json(updatedPost);
        } catch (error) {
            res.status(404).send('Post not found');
        }
    }
}