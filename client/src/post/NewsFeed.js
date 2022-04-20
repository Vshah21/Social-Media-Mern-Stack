import React, { useEffect, useState } from 'react';
import { Paper,  Typography, Grid} from '@mui/material'
import NewPost from './NewPost'
import PostList from './PostList'
import auth from '../auth/auth-helper'
import { listNewsFeed} from '../post/api-post'
import Styles from '../user/Styles';



const NewsFeed = ()=>{
   
    const classes = Styles()

    const [posts, setPosts] =useState([])
    const [loading, setLoading] =useState(false)

    useEffect(  ()=>{
       
    const abortController = new AbortController()
    const signal = abortController.signal
    

      const fetchPosts = async() =>{
        const jwt = auth.isAuthenticated()
        setLoading(true);

        const res= await listNewsFeed({
          userId: jwt.user._id
        }, {
          t: jwt.token
        }, signal).then((data) => {
          if (data.error) {
            console.log(data.error)
          } else {
            setPosts(data)
          }
        })
       
        setLoading(false);
      }
    
      fetchPosts();

       
    },[])
   

   
    const addPost = (post) => {
      const updatedPosts = [...posts]
      updatedPosts.unshift(post)
      setPosts(updatedPosts)
    }
    const removePost = (post) => {
      const updatedPosts = [...posts]
      const index = updatedPosts.indexOf(post)
      updatedPosts.splice(index, 1)
      setPosts(updatedPosts)
    }
  
    return(
          <div>

      
            <Paper className={classes.root} >
               <Typography variant='h6' className={classes.title} >
                NewsFeed
            </Typography>
              <NewPost addUpdate={addPost}/>
            </Paper>

            <Grid className={classes.root} elevation={4}>
              <PostList posts={posts} removeUpdate={removePost}/>
            </Grid>
            
          
          </div>

    )
}
export default NewsFeed;
