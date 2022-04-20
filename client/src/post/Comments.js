import { Avatar, CardHeader, TextField } from "@mui/material"
import { useState } from "react"
import auth from '../auth/auth-helper'
import {comment ,uncomment} from './api-post'
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton} from '@mui/material'
import Styles from '../user/Styles'
import { Link} from 'react-router-dom'

const Comments =({postId, comm, updateComments}) =>{
    const classes =Styles()
    const [ values, setValues] = useState("")
    const jwt = auth.isAuthenticated()

    const handleChange =(e) =>{
        setValues(e.target.value)
    }
   
    const addComment =(e) =>{
        if (e.key === "Enter") {
            comment({userId:jwt.user._id},{t:jwt.token},postId, values)
            .then( (data)=>{
                if(data.error){
                    console.log(data.error)
                }else{
                    
                    updateComments(data.comments)
                    setValues("")
                }
            })
            
          }

    }
    const deleteComment = ( commentObj) =>{
        
        uncomment( {userId:jwt.user._id }, {t:jwt.token}, postId,commentObj._id )
        .then( ( data) =>{ 
            if(data.error){
                console.log(data.eror)
            }else{
                updateComments(data.comments)
            }
        })

    }
    const commentBody =(index)=>{
        return (
            <div>
                <Link to={"/user/" + index.postedBy._id}>{index.postedBy.name}</Link>
                <p>{index.text}</p>
                <p className={classes.commentDate}>{(new Date(index.created)).toDateString()}</p>
            </div>
            
        )
    }
    
    return(
        <div>
            <CardHeader
            avatar={ <Avatar />  }
            title={ 
                <TextField
                    className={classes.textField}
                    margin="normal"
                    id="text"
                    variant="filled"
                    name="comment"
                    placeholder="Write something ..."
                    onKeyDown={addComment}
                    onChange= {handleChange}
                />
            }
            /> 

            <div>
                {comm.map( ( index, i)=>{
                return (
                <CardHeader
                key={i}
                avatar={<Avatar/>}
                action={  jwt.user._id === index.postedBy._id ? 
                    <IconButton onClick={() =>deleteComment(index)}>
                       <DeleteIcon/>
                   </IconButton>
                   : ""
                }
                title={commentBody(index)}
                /> 
                
                )
            })}
            </div>
            
          
        </div>
    )
}

export default Comments