const Post = require('../models/post.models')

const create = async(req,res ) =>{

    let post = new Post(req.body)
    post.postedBy = req.profile
    try {
        let result = await post.save()
        res.json(result)
        } catch (err) {
        return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
        })
    }
    
}

const listNewsFeed = async (req, res) => {
    
    let following = req.profile.following
    following.push(req.profile._id)
    
    try{
      let posts = await Post.find({postedBy: { $in : req.profile.following } })
                            .populate('comments.postedBy', '_id name')
                            .populate('postedBy', '_id name')
                            .sort('-created')
                            .exec()
  
    res.json(posts)
    }catch(err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  }

  const listByUser =async (req, res )=>{

    try {
      let posts =  await Post.find({postedBy: req.profile._id })
                  .populate('comments.postedBy', '_id name')
                  .populate('postedBy', '_id name')
                  .sort('-created')
                  .exec()
      
      res.json(posts)
      
    } catch (error) {
        return res.status(400).json({
          error:errorHandler.getErrorMessage(error)
        })
    }

  }

  const isPoster = ( req,res,next ) =>{
    let isPoster = req.post.postedBy._id == req.user._id
    if(!isPoster){
      return  res.status('403').json({ error: "User is not Authorised"})
    }
    next()
  }
  const remove = async(req, res) =>{
    let post = req.post
   
    try {
      let deletedPost = await post.deleteOne()
      res.json(deletedPost)
    } catch (error) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(error)
      })
    }
  }

  const postByID= async (req, res,next,id) =>{

    let post =  await Post.findById(id).populate('postedBy', '_id name').exec()
    if(!post){
      return  res.status('400').json({ error: "Post not found"})
    }
    req.post = post
    next()
  } 

  const comment = async (req, res) =>{
    let postId = req.body.postId
    let comm = req.body.comment
    let post = await Post.findByIdAndUpdate(
      postId,
      {$push: {comments: {text: comm, postedBy: req.body.userId}}},
      {new: true}).populate('comments.postedBy', '_id name')
      .populate('postedBy', '_id name')
      .exec()
   
    res.json(post)
  } 

  const uncomment =async (req,res) =>{
    const commentId = req.body.comment
    const postId = req.body.postId

    let post = await Post.findByIdAndUpdate(
      postId,
      {$pull: {comments: {_id: commentId}}},
      {new: true}).populate('comments.postedBy', '_id name')
      .populate('postedBy', '_id name')
      .exec()
      
      res.json(post)
  }

module.exports = {
    create , listNewsFeed, isPoster, remove ,postByID, comment ,uncomment ,listByUser
}