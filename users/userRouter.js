const { json } = require('express');
const express = require('express');
const db = require("./userDb");
const postDb = require("../posts/postDb");

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  db.insert(req.body)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(err => {
    console.log("create new user error: ", err);
    res.status(500).json({
      message: "error creating user"
    });
  });
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  const {id} = req.params;
  req.body.user_id = id;

  postDb.insert(req.body)
  .then(post => {
    res.status(201).json(post);
  })
  .catch(err => {
    console.log("post create error: ", err);
    res.status(500).json({
      message: "could not create post"
    });
  });
});

router.get('/', (req, res) => {
  // do your magic!
  db.get()
  .then(users => {
    res.status(200).json(users);
  })
  .catch(err => {
    console.log("get all users error: ", err);
    res.status(500).json({
      message: "failed to get users"
    });
  });
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  const {id} = req.params;

  db.getById(id)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err => {
    console.log("get by id error: ", err);
  });
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  const {id} = req.params;

  db.getUserPosts(id)
  .then(posts => {
    res.status(200).json(posts);
  })
  .catch(err => {
    console.log("get user posts error: ", err);
    res.status(500).json({
      message: "error getting user posts"
    });
  });
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  const {id} = req.params;

  db.remove(id)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(err => {
    console.log("user delete error: ", err);
    res.status(500).json({
      message: "unable to delete user"
    });
  });
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
  const {id} = req.params;

  db.update(id, req.body)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(err => {
    console.log("user update error: ", err);
    res.status(500).json({
      message: "error updating user"
    });
  });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const {id} = req.params;

  db.getById(id)
  .then(user => {
    if(user){
      req.user = user;
      next();
    }
    else{
      res.status(404).json({
        message: "invalid user id"
      });
    }
  })
  .catch(err => {
    console.log("validate user middleware error: ", err)
    res.status(500).json({
      message: "unable to validate user id"
    });
  });
}

function validateUser(req, res, next) {
  // do your magic!
  if(req.body && Object.keys(req.body).length > 0){
    if(req.body.name){
      next();
    }
    else{
      res.status(400).json({
        message: "missing required name field"
      });
    }
  }
  else{
    res.status(400).json({
      message: "missing user data"
    });
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if(req.body && Object.keys(req.body).length > 0){
    if(req.body.text){
      next();
    }
    else{
      res.status(400).json({
        message: "missing required text field"
      });
    }
  }
  else{
    res.status(400).json({
      message: "missing post data"
    });
  }
}

module.exports = router;
