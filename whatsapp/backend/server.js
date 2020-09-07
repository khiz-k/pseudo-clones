import express from "express";
import mongoose from "mongoose";
import Messages from "./dbModel.js";
import Pusher from "pusher";
import cors from "cors";

// const express = require("express");
// const mongoose = require("mongoose");
// const Messages = require("./dbModel.js");

const app = express();
const port = process.env.PORT || 8080;

const pusher = new Pusher({
  appId: "1067731",
  key: "61e3e4c6502f4cbff606",
  secret: "d252b07121b5f8fa5c79",
  cluster: "us3",
  encrypted: true,
});

app.use(express.json());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*"),
//     res.setHeader("Access-Control-Allow-Headers", "*"),
//     next();
// });
app.use(cors());

const connection_url =
  "mongodb+srv://admin:RrOvGgMu5pHu8W4L@cluster0.39jph.mongodb.net/whatsapp?retryWrites=true&w=majority";
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("DB connected");
  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log("a change occured", change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});

app.get("/", (req, res) => res.status(200).send("hello world"));

app.get("/api/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/api/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.listen(port, () => console.log(`listening on localhost:${port}`));
