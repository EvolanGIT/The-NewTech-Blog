const router = require("express").Router();
const path = require("path");
const { User, Posts, Comments } = require("../../models"); 
const withAuth = require('../../utils/auth');

  // Comment create
  router.post("/", withAuth, (req, res) => {
    Comments.create({
      comment_text: req.body.comment_text,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    })
      .then((commentData) => res.json(commentData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  });

// all comments
  router.get('/', withAuth, (req, res) => {
    try{  
    const commentData = Comments.findAll({
        attributes: [
          'id',
          'post_id',
          'comment',
          'user_name'
        ],
        include: [
          {
            model: Posts,
            attributes: ['id', 'post', 'post_id', 'user_id'],
            include: {
            model: User,
            attributes: ['user_name']
            }
          },
          {
            model: User,
            attributes: ['user_name']
          },
        ],
      });

          res.json(commentData)
      } catch(err) {
          console.log(err);
          res.status(500).json(err);
        }
    });

module.exports = router;