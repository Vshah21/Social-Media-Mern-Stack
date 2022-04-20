import React, { useEffect, useState } from 'react'
import { CardHeader, Avatar, Button, Divider, CardContent, Typography, CardActions, IconButton } from '@mui/material';
import { Link} from 'react-router-dom'
import auth from '../auth/auth-helper'
import {removePost} from './api-post'
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import Comments from './Comments'


const Post = ({post, remove})=>{
    
    const [values, setValues] = useState({
        like:'',
        comments: post.comments

    }) 
    const jwt = auth.isAuthenticated()
    

    useEffect(()=>{
        setValues({ ...values, comments: post.comments})
    },[])

    const deletePost =(item) =>{

        removePost({postId: item._id}, { t: jwt.token})
        .then( (data)=>{
            if(data.error){
                console.log(data.error)
            }else{
                remove(item)
            }
        })
    }

    const submitLike =() =>{
        console.log(jwt)
    }
    
    const handleUpdate =(comments)=>{
        setValues({...values, comments: comments})
    }

    return (
        <div style={{marginBottom: "20px" }}>
            <CardHeader
            avatar={
            <Avatar src={'/api/users/photo/'+post.postedBy._id}/>
            }
            action={ post.postedBy._id ===
            auth.isAuthenticated().user._id &&
            <Button>
                <DeleteIcon  onClick={()=>deletePost(post)} />
            </Button>
            }
            title={<Link to={"/user/" + post.postedBy._id}>{post.postedBy.name}</Link>}
            subheader={(new Date(post.created)).toDateString()}
            // className={classes.cardHeader}
            /> 
            <CardContent style={{borderBottom:"1px solid grey"}}>
                <Typography>
                    {post.text}
                </Typography>

                <CardActions>
                    {
                        values.like ?
                        <IconButton onClick={submitLike}
                            aria-label="Like" color="primary">
                            <FavoriteIcon/>
                        </IconButton>
                           :
                        
                        <IconButton onClick={submitLike}
                            aria-label="Unlike" color="primary">
                            <FavoriteBorderOutlinedIcon/>
                        </IconButton>
                        
                    }<span> {values.like}</span>
                    <IconButton aria-label="Comment" color="primary">
                        <CommentIcon/>
                    </IconButton>
                    <span>{values.comments.length  }</span>
                </CardActions>
            </CardContent>
            <Comments postId={post._id} comm ={values.comments} updateComments ={handleUpdate}/>

           
        </div>
    )
}

export default Post;