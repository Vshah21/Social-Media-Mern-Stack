import React, {useState} from 'react'
import auth from '../auth/auth-helper'
import {remove} from './api-user'
import { Navigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import {Dialog, IconButton,DialogTitle,Button, DialogContent, DialogContentText, DialogActions} from '@mui/material'



const DeleteUser = ({ userId }) =>{
    const [open, setOpen] = useState(false)
    const [redirect, setRedirect] = useState(false)
   
    // when user clicks the delete button
    // set open true to open up a dialog box
    const clickButton = () =>{
        setOpen(true)
    }

    // set open false to close up a dialog box
    const handleRequestClose = () => {
        setOpen(false)
    }
    
    const deleteAccount = () =>{
        const jwt = auth.isAuthenticated()
        remove({ userId: userId }, { t: jwt.token })
        .then( (data)=>{
            if (data && data.error) {
                console.log(data.error)
            } else {
                auth.clearJWT(() => console.log('deleted'))
                setRedirect(true)
            }
               
        })
    }
    if (redirect) {
        return <Navigate to='/'/>
    }
       
    return(
        <span>
            <IconButton variant="outlined" aria-label="Edit"  onClick={clickButton} color="primary">
                  <DeleteIcon/>
            </IconButton>

            <Dialog 
            
            open={open}
            onClose={handleRequestClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
    
            >
            <DialogTitle id="alert-dialog-title">
                Delete Account
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Confirm to delete your account.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleRequestClose} color="primary">CANCEL</Button>
                <Button onClick={deleteAccount}  color="secondary"autoFocus >CONFIRM</Button>

            </DialogActions>
            </Dialog>
            
        </span>
    )
}


export default DeleteUser
