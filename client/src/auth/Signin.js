import React, { useState} from 'react'
import { Link} from 'react-router-dom';
import {signin} from './api-auth'
import auth from './auth-helper'
import {Icon, Typography, TextField, Button, Grid, Paper, Avatar, Divider} from '@mui/material'
import {Dialog, DialogActions,  DialogContent, DialogContentText} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';


const Signin =()=>{

    const[values, setValues] = useState({
        email: '',
        password: '',
        error:'',
        redirectToReferrer: false,
        open:false
    })
    let navigate = useNavigate();

   



    const handleChange = (event)=>{
        const {name, value} = event.target
        setValues({ ...values, 
            [name]:value
        })
    }

    const clickSubmit = ()=>{
        const user ={
            email:values.email || undefined ,
            password: values.password || undefined
        }
        
        signin(user).then((data) => {
            if (data.error) {
              setValues({ ...values, error: data.error})
            } else {
              auth.authenticate(data, () => {
                setValues({ ...values, error: '',redirectToReferrer: true, open:true})
                
              })
            }
          })
    }
    const redirectSignup = ()=>{
        return navigate('/signup')
    }

  
    const paperStyle = { padding:20 , height:'65vh',width: 300, margin: "20px auto"  }

    return (


            <Grid>
                <Paper style={paperStyle} elevation={6}>
                    <Grid align="center">
                        <Avatar><LockOutlinedIcon/></Avatar>
                        <h2>Sign in</h2>
                      
                    </Grid>
                    <TextField variant="outlined" fullWidth id="email" type="email"  name="email" label="Email" value={values.email} onChange={handleChange} margin="normal" /><br/>
                        <TextField variant="outlined" fullWidth id="password"  type="password"  name="password" label="Password" value={values.password} onChange={handleChange} margin='normal'/><br/>
                        {
                            values.error && (<Typography>
                                <Icon color="error">Error</Icon>
                                {values.error}
                            </Typography>)
                        }
                    <Button  style={{marginTop:"10px", marginBottom:"20px", background:"green"}}fullWidth variant="contained" onClick={clickSubmit}>Submit</Button>
                    <Typography style={{marginBottom:"10px"}} align='left' variant='h6'> <Link to="/"><small>Forgot Password? </small></Link></Typography>

                    <Divider/>
                    <Typography align='center' variant='h6'><small>Dont Have an Account? </small></Typography>
                    <Button color="primary" style={{marginTop:"10px", marginBottom:"20px", color:"black", background:"white"}}fullWidth variant="contained" onClick={redirectSignup}>Signup</Button>

                </Paper>

                <Dialog   open={values.open} >
                {/* <DialogTitle></DialogTitle> */}
                <DialogContent style={{width:"230px"}}>
                    <DialogContentText  style={{color:"black"}}>
                        Signed In Successfully
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Link to="/">
                        <Button color="primary" autoFocus="autoFocus"
                            variant="contained">
                                close
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>


            </Grid>


                
    )



}

export default Signin