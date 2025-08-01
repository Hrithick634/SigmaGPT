import express from "express";
import Thread from "../models/Thread.js";
import { getOpenaiResponse } from "../utils/openai.js";

const router = express.Router();

router.post("/test", async (req, res) => {
    console.log("inside post")
    try {
        const thread = new Thread({
            threadId: "1234",
            title: "Testing thread2",
        });
        const response = await thread.save();
        res.send(response);
    } catch (error) {
        res.status(500).json({error: "Failed to save DB"});
    }
});

// Get All thread
router.get("/thread", async (req, res) => {
    try {
        const threads= await Thread.find({}).sort({updatedAt: -1})
        // Descending order of thread to have the most recent chat at Top
        res.json(threads);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Failed to fetch threads"});
    }
})

router.get("/thread/:threadId", async (req, res) => {
    const { threadId } = req.params;
    try {
        const thread = await Thread.findOne({threadId});
        if (!thread) {
            res.status(404).json({error: "Chat not Found"})
        }
        res.status(200).json(thread.messages);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Failed to fetch chat"});
    }
})

router.delete("/thread/:threadId", async (req, res) => {
    console.log("inside delete");
    const { threadId } = req.params;
    try {
        const deletedThread = await Thread.findOneAndDelete({threadId});
        if (!deletedThread) {
            res.status(404).json({error: "Thread not Found"});
        }
        console.log(deletedThread);
        res.status(200).json("Thread deleted successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Failed to delete chat"});
    }
})

router.post("/chat", async (req, res) => {
    console.log("inside post");
    const { threadId, message} = req.body;
    if (!threadId || !message) {
        res.status(400).json("Required fields are missing");
    }

    try {
        let thread = await Thread.findOne({threadId});
        if (!thread) {
            // Create new thread in DB
             thread = new Thread({
                threadId,
                title: message,
                messages: [{role: "user", content: message}]
            });
        }
        else{
            thread.messages.push({role:"user", content: message});
        }
        const assistantResponse = await getOpenaiResponse(message);

        thread.messages.push({role:"assistant", content:assistantResponse});
        thread.updatedAt = new Date();
        await thread.save()

        res.status(200).json({reply: assistantResponse});

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Something went wrong"});
    }
})
export default router;
