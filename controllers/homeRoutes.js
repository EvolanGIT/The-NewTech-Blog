const router = require('express').Router();
const { User, Posts } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Posts.findAll({
      include: {
        model: User,
        attributes: ['user_name'],
      }
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);
    res.render('dashboard', 
    {posts,
      // Pass the logged in flag to the template
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});


router.get('/dashboard', withAuth,  async (req, res) => {
const postData= await Posts.findAll();
const allPosts= postData.map(post=> post.get({plain: true}))
res.render('dashboard', {allPosts});
});


router.get("/newPost", withAuth, async(req,res) => {
  res.render('post');
});


router.get("/profile", withAuth, async (req, res) => {
  // If a session exists, redirect the request to the homepage
  try {
    // change to User.findOne() or User.findByPk()
    console.log(req.session.user_id)
  const userdata = await User.findOne({where: {id : req.session.user_id}, include: [Posts]})
  console.log(userdata);

// if using findOne() or findByPk() use:
const userTest = userdata.get({plain: true})
  // const userTest = userdata.map(user => user.get({plain : true})
console.log(userTest)

  res.render("profile", {userTest, loggedIn: true});
  } catch (err) {
    if (err) throw (err)
  }
  
});
module.exports = router;