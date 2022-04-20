import React, {useState, useEffect} from 'react'
import { makeStyles } from '@mui/styles'
import {Card, CardContent,CardMedia,Grid,Typography} from '@mui/material'
import unicornbikeImg from '../assets/images/unicornbike.jpg'
import auth from '../auth/auth-helper'
import NewsFeed from '../post/NewsFeed'
import PeopleToFollow from '../user/PeopleToFollow'

// jss style objects defined. 
// CSS in JS styling solution to add styles to components
// card title media
const useStyles = makeStyles(theme => (
    {
        card: {
            maxWidth: 600,
            margin: 'auto',
            marginTop: theme.spacing(5)
        },
        title: {
            padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px
            ${theme.spacing(2)}px`,
            color: theme.palette.openTitle
        },
        media: {
            minHeight: 400
        },
        newsfeed:{
        
            margin:'auto'
        }
    }))
   

// define the Home Component

const Home = () =>{

    const [defaultPage , setDefaultPage] = useState(false)

    // using the custom styles declared in the above function useStyles
    const classes = useStyles()
    useEffect( ()=>{
        setDefaultPage(auth.isAuthenticated())
    },[])

    return(
        <div>

       
        <Card className={classes.card}>
            {
                !defaultPage &&
                 <Grid>
                      <Typography variant='h6' className={classes.title}>
                            Home Page
                        </Typography>

                        <CardMedia className={classes.media} image={unicornbikeImg} title="Unicorn Bicycle"/>
                        <CardContent>
                            <Typography variant="body2" component="p">
                                Welcome to the MERN Skeleton home page.
                            </Typography>
                        </CardContent>
                 </Grid>
           
            }
        </Card>
            {
                defaultPage &&
               
                <Grid  container spacing={2}>
                    <Grid className={classes.newsfeed} item xs={8}>
                        <NewsFeed/>
                    </Grid>

                    <Grid item xs={4}>
                        <PeopleToFollow/>
                    </Grid>
                </Grid>
            }
        </div>
      
    )
}

export default Home;