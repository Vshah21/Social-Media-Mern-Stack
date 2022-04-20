import React , {useState} from 'react'
import {create} from './api-user'
import {Icon, Typography, TextField, Button, Grid, Paper, Avatar, Divider} from '@mui/material'
import {Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { Link, useNavigate } from 'react-router-dom'

const paperStyle = { padding:20 , height:'70vh',width: 300, margin: "20px auto"  }

const Signup = ()=>{

    
    const [values,setValues] = useState({
        name:'',
        password:'',
        email:'',
        open:false,
        error:''
    })

    const handleChange = (event) =>{
        const { name, value} = event.target;

        setValues( (prevState) =>{
            return {
                ...prevState,
                [name]: value,
            }
        })
    }

    const clickSubmit = () =>{
        const user ={
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined
        }
     
        create(user).then( (data)=>{
            
            // if data not entered correctly 
            if(data.error){
                console.log(data.error);
                // set the error message to the error variable 
                setValues({ ...values, error: data.error})
            }else{
                // error variable set to empty 
                // set open to true the dialog box pops up
                setValues({...values, error:'', open:true})
            }
        })
     
    }
    const navigate = useNavigate();
    const redirectSignIn =() =>{
        return navigate('/signin')
    }
    return(
        <div>
            <Grid>
                <Paper style={paperStyle} elevation={6}>
                    <Grid align="center">
                        <Avatar><LockOutlinedIcon/></Avatar>
                        <h2>Sign Up</h2>
                      
                    </Grid>
                    <TextField 
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        id="name"
                        name="name"
                        label="Name"
                        value={values.name} 
                        onChange={handleChange}   
                        
                    
                    />
                    <br/>
                     <TextField 
                        fullWidth
                        id="email"
                        type="email" 
                        name="email"
                        label="email"
                        value={values.email} 
                        onChange={handleChange}
                        margin="normal"
                        

                    />
                    <br/>
                     <TextField 
                        fullWidth
                        id="password" 
                        type="password" 
                        label="password"
                        name="password"
                        value={values.password} 
                        onChange={handleChange}
                        margin="normal"

                    />
                    {
                        values.error && (
                        <Typography component="p" color="error">
                            <Icon color="error">error</Icon>
                            output the Error message
                            {values.error}
                        </Typography>)
                    }
                    <Button  style={{marginTop:"10px", marginBottom:"20px", background:"green"}}fullWidth variant="contained" onClick={clickSubmit}>Submit</Button>

                    <Divider/>
                    <Typography align='center' variant='h6'><small> Have an Account? </small></Typography>
                    <Button color="primary" style={{marginTop:"10px", marginBottom:"20px", color:"black", background:"white"}}fullWidth variant="contained" onClick={redirectSignIn}>SignIn</Button>

                </Paper>

            </Grid>




            <Dialog open={values.open} disableBackdropClick={true}>
                <DialogTitle>New Account</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        New account successfully created.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Link to="/signin">
                        <Button color="primary" autoFocus="autoFocus"
                            variant="contained">
                            Sign In
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>

            
        </div>
    )

}

export default Signup