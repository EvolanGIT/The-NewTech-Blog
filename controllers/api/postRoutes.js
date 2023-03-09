const router = require("express").Router();
const path = require("path");
const { User, Posts} = require("../../models"); 
const withAuth = require('../../utils/auth');




// route to post posts
// 3001/api/posts
// get all posts for dashboard

router.get('/', withAuth, (req, res) => {
  try{  
  const postData = Posts.findAll({
      attributes: [
        'id',
        'post_title',
        'post',
        'user_name'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id'],
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


  // post create
  router.post('/', withAuth,  async (req, res) => {
    try {
      const newPost = await Posts.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  //for deleting post
  router.delete('/:id', withAuth, (req, res) => {
    // console.log('id', req.params.id);
    Posts.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  


module.exports = router;