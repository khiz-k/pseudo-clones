import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Pusher from 'pusher';
import dbModel from './dbModel.js';

// app config
const app = express();
const port = process.env.PORT || 8080;
const pusher = new Pusher({
  appId: '1077027',
  key: '1368f98c39b24d379888',
  secret: '12aed910b2b95899cd49',
  cluster: 'us3',
  usetls: true,
});

// middlewares for transforming and securing data
app.use(express.json());
app.use(cors());

// DB config
const connection_url = 'your connection url';
// example url: mongodb+srv://<user>:<password>@cluster0.y4kxt.mongodb.net/igDB?retryWrites=true&w=majority
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('DB Connected');

  const changeStream = mongoose.connection.collection('posts').watch();

  changeStream.on('change', (change) => {
    console.log('Change triggered on pusher...');

    if (change.operationType === 'insert') {
      console.log('Triggering pusher / img upload');

      const postDetails = change.fullDocument;
      pusher.trigger('posts', 'inserted', {
        user: postDetails.user,
        caption: postDetails.caption,
        image: postDetails.image,
      });
    } else {
      console.log('Unknown trigger from pusher');
    }
  });
});

// api routes
app.get('/', (req, res) => res.status(200).send('hello world'));

app.get('/sync', (req, res) => {
  dbModel.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/upload', (req, res) => {
  const body = req.body;

  dbModel.create(body, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// listening
app.listen(port, () => console.log(`listening on localhost:${port}`));
