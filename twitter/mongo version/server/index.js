const express = require('express');
const cors = require('cors');
const monk = require('monk');
const Filter = require('bad-words');
const rateLimit = require('express-rate-limit');

const app = express();

const db = monk(process.env.MONGO_URI || 'localhost/commenter');
const comments = db.get('comments');
const filter = new Filter();

app.enable('trust proxy');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'commenter!'
  });
});

app.get('/comments', (req, res, next) => {
  comments
    .find()
    .then(comments => {
      res.json(comments);
    }).catch(next);
});

app.get('/v2/comments', (req, res, next) => {
  let { skip = 0, limit = 5, sort = 'desc' } = req.query;
  skip = parseInt(skip) || 0;
  limit = parseInt(limit) || 5;

  skip = skip < 0 ? 0 : skip;
  limit = Math.min(50, Math.max(1, limit));

  Promise.all([
    comments
      .count(),
    comments
      .find({}, {
        skip,
        limit,
        sort: {
          created: sort === 'desc' ? -1 : 1
        }
      })
  ])
    .then(([ total, comments ]) => {
      res.json({
        comments,
        meta: {
          total,
          skip,
          limit,
          has_more: total - (skip + limit) > 0,
        }
      });
    }).catch(next);
});

function isValidcomment(comment) {
  return comment.name && comment.name.toString().trim() !== '' && comment.name.toString().trim().length <= 50 &&
    comment.content && comment.content.toString().trim() !== '' && comment.content.toString().trim().length <= 140;
}

app.use(rateLimit({
  windowMs: 5 * 1000, // 5 seconds
  max: 1
}));

const createcomment = (req, res, next) => {
  if (isValidcomment(req.body)) {
    const comment = {
      name: filter.clean(req.body.name.toString().trim()),
      content: filter.clean(req.body.content.toString().trim()),
      created: new Date()
    };

    comments
      .insert(comment)
      .then(createdcomment => {
        res.json(createdcomment);
      }).catch(next);
  } else {
    res.status(422);
    res.json({
      message: 'Name and Content are required! Name cannot be longer than 50 characters. Content cannot be longer than 140 characters.'
    });
  }
};

app.post('/comments', createcomment);
app.post('/v2/comments', createcomment);

app.use((error, req, res, next) => {
  res.status(500);
  res.json({
    message: error.message
  });
});

app.listen(5000, () => {
  console.log('Listening on http://localhost:5000');
});
