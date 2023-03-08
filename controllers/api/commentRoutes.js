const router = require("express").Router();
const path = require("path");
const { User, Posts, Comments } = require("../../models"); 
const withAuth = require('../../utils/auth');

  // Comment create
  router.post('/', withAuth,  async (req, res) => {
    try {
      const newPost = await Comments.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// all comments
  router.get('/', withAuth, (req, res) => {
    try{  
    const postData = Comments.findAll({
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
          const posts = postData.map(post => post.get({ plain: true }));
          res.render('posts', {
            posts,
            loggedIn: req.session.loggedIn
          });
      } catch(err) {
          console.log(err);
          res.status(500).json(err);
        }
    });
  