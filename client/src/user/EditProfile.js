import React, { useEffect, useState } from 'react'
import {Card, CardContent,Icon, Typography, TextField,CardActions, Button} from '@mui/material'
import auth  from '../auth/auth-helper'
import { read, update } from './api-user'
import { useParams , Navigate} from 'react-router-dom'
import FileUploadIcon from '@mui/icons-material/FileUpload';
const EditProfile = () =>{

    const { id} = useParams()
  

    const[values, setValues] = useState({
        name:'',
        email:'',
        password:'',
        error:'',
        about:'',
        open: false,
        redirectToProfile:false
    })
    const[ image, setImage] = useState()

    
    const jwt = auth.isAuthenticated() 
    
    useEffect( () =>{
        const abortController = new AbortController()
        const signal = abortController.signal
        
        read({userId: id}, {t: jwt.token}, signal)
        .then( (data) =>{
            if(data && data.error){
                setValues({...values, error: data.error})
            }else{
                setValues({ ...values, name:data.name, email: data.email, about:data.about})
            }
        })
    },[])

    const clickSubmit = () => {
       
        const { name, email, password,about, redirectToProfile } = values

        const user = {
            name: name  || undefined,
            email: email  || undefined,
            about: about  || undefined,
            password: password  || undefined 
        }
        update({ userId: id},{ t: jwt.token}, user)
        .then((data) => {
          if (data && data.error) {
            setValues({...values, error: data.error})
          } else {
            setValues({...values, name:data.name , email:data.email, redirectToProfile:true})
          }
        })
        
    
        if (redirectToProfile) {
            
            return <Navigate to={'/user/'+id}/>
          }
    }
    
    const handleChange = event =>{
      
        const { name, value} = event.target

        if(name === "photo"){
            setImage( event.target.files[0])
        }else{

            setValues( (prevState) =>{
                return {
                    ...prevState,
                    [name]: value,
                }
            })
        }
        
       
    }
    return(
        <div>
            <form >
            <Card>
                <CardContent>
                    <Typography variant='h6' >Edit Profile</Typography>
                    
                    {/* <Avatar src={photoUrl} className={classes.bigAvatar}/><br/> */}
                    <input accept="image/*" name="photo" onChange={handleChange} style={{display:'none'}} id="icon-button-file" type="file" />
                    <label htmlFor="icon-button-file">
                        <Button variant="contained" component="span">
                            Upload
                        <FileUploadIcon/>
                        </Button>
                    </label>
                     
                     <span >{image ? image.name : ''}</span><br/>
                    <TextField variant="outlined" margin="normal" id="name" name="name"label="Name"value={values.name} onChange={handleChange}/><br/>
                    <TextField id='about' multiline  rows="2" label='about' name='about' value={values.about} onChange={handleChange} margin='normal'/><br/>
                    <TextField id='email' type='email' label='email' name='email' value={values.email} onChange={handleChange} margin='normal'/><br/>
                    <TextField id='password' type='password' label='password' name='password' value={values.password} onChange={handleChange} margin='normal'/><br/>
                    {
                        values.error && (
                            <Typography color="error" component="p">
                                 <Icon color="error">error</Icon>
                                {/* output the Error message */}
                                {values.error}
                            </Typography>
                        )
                    }
                </CardContent>
                <CardActions>
                    <Button color="primary" onClick={clickSubmit}>
                        Submit
                    </Button>
                </CardActions>


            </Card>
            </form>
        </div>
    )


}

export default EditProfile;