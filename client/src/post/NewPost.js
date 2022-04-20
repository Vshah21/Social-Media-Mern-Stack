import React, { useState ,useEffect} from 'react';
import {Grid, Dialog, DialogContent, DialogContentText, DialogActions,CardContent, TextField,CardActions, Button} from '@mui/material'
import auth from '../auth/auth-helper'
import { create} from './api-post'
const NewPost = ({addUpdate})=>{

    const [post, setPost]= useState({
        text:'',
        error:'',
        user:{},
        open: false
    })
    const close = () =>{
        setPost({...post, open:false})
        
    }
    
    useEffect(() => {
        setPost({...post, user: auth.isAuthenticated().user})
      }, [])
    const jwt = auth.isAuthenticated()

    const createPost = ()=>{
        const newPost ={
            text : post.text || undefined
        } 
        
        create({userId:jwt.user._id},{t: jwt.token},newPost )
        .then( ( data)=>{
            if(data.error){ 
                setPost( {...post, error:data.error}) 
            }else { 
                setPost({...post,text:'',open:true}) 
                addUpdate(data)

            } 
        })

    }
    
    const handleChange= (e)=>{
        const { name, value} = e.target;
        setPost({...post, [name]:value})
        
    }


    return(
        <div>
        <Grid>
            <CardContent>
                <TextField 
                    fullWidth
                    variant="standard"
                    multiline
                    rows="2"
                    margin="normal"
                    id="text"
                    name="text"
                    label="Share your thoughts"
                    value={post.text}
                    onChange={handleChange}
                /> 
            </CardContent>
            <CardActions >
                <Button variant="contained"color="primary" onClick={createPost}>POST</Button>
            </CardActions>


        </Grid>
            <Dialog open={post.open}>
            <DialogContent>
                    <DialogContentText>
                        New Post successfully created.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    
                        <Button onClick={close} color="primary" autoFocus="autoFocus"
                            variant="contained">
                            Close
                        </Button>
                    
                </DialogActions>
            </Dialog>


        </div>
        
    )
}
export default NewPost;