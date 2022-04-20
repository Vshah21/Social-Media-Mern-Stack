const router= require('express').Router();
const postCtrl = require('../controllers/post.controller')
const authCtrl = require('../controllers/auth.controller')
const userCtrl = require('../controllers/user.controller')

router.route('/api/posts/feed/:userId')
  .get(authCtrl.requriesignin, postCtrl.listNewsFeed)
  
router.route('/api/posts/user/:userId')
.get(authCtrl.requriesignin, postCtrl.listByUser)

router.route('/api/posts/:postId')
.delete(authCtrl.requriesignin, postCtrl.isPoster, postCtrl.remove)

router.route('/api/posts/new/:userId')
.post(authCtrl.requriesignin,postCtrl.create)

router.route('/api/posts/comment')
.put( authCtrl.requriesignin,postCtrl.comment)
router.route('/api/posts/uncomment')
.put(authCtrl.requriesignin, postCtrl.uncomment)

router.param('userId', userCtrl.userByID)
router.param('postId', postCtrl.postByID)
module.exports = router; 