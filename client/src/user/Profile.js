import React, { useState, useEffect } from "react";
import auth from '../auth/auth-helper'
import {read,unfollowing ,following} from './api-user'
import { Navigate , useParams , Link } from "react-router-dom";
import {Paper,Button, Typography, List, ListItem, ListItemAvatar, ListItemText,Avatar,Divider,ListItemSecondaryAction,IconButton} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import DeleteUser from './DeleteUser'
import Styles from './Styles.js'
import ProfileTabs from "./ProfileTabs";
import { listByUser } from '../post/api-post'
import FollowButton from "./FollowButton";


const Profile = () =>{
    
    const classes = Styles();
    const {id} = useParams();
    const [posts, setPosts] = useState([])
    const[user, setUser] =useState({});
    const [tofollow, setFollowing] = useState(false)
   

    const [redirectToSignin, setRedirectToSignin] = useState(false)
    const jwt = auth.isAuthenticated()

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
       
        // if user is signed in
        if(jwt){
          read( { userId: id }, { t: jwt.token }, signal)
            .then((data) => {
                if (data && data.error) {
                  setRedirectToSignin(true)
                  console.log("Error Occured")

                } else {
                  setUser(data)
                  checkFollowing(data)
                  console.log(data)
                }
              })

          listByUser({userId: id}, {t :jwt.token}, signal)
          .then( (data) =>{
            if(data.error){
              console.log("Error Occured")
            }else{
              setPosts(data)
           
            }
          })

         
            return function cleanup(){
            abortController.abort()
            }
        }else{
          // console.log("Not Signed in")
          setRedirectToSignin(true)
        }
        
        }, [id])


        // redirect to home page
        if (redirectToSignin) {
          return <Navigate to='/'/>
        }
       
        const unfollow = ()=>{

          unfollowing({t: jwt.token},jwt.user._id,user._id)
          .then( (data)=>{
            if(data.error){
              return console.log(data.error)
            }else{
              return setFollowing(false)
            }
          }) 
            
        }
        const follow = ()=>{
          
          following({t: jwt.token},jwt.user._id,user._id)
          .then( (data)=>{
            if(data.error){
              return console.log(data.error)
            }else{
              return  setFollowing(true)
            }
          }) 
            
        }
        const checkFollowing =(user) =>{
          
          let match=  user.followers.some( (follower) => {
              return follower._id === jwt.user._id
          })
          
          match===true ?setFollowing(true) :setFollowing(false)
          
        }

        const removePost = (post) => {
          
          const updatedPosts = [...posts]
          const index = updatedPosts.indexOf(post)
          updatedPosts.splice(index, 1)
          setPosts(updatedPosts)
        }
        const updateFollow = (followUser) =>{
          
          return followUser ==="unfollow"? unfollow() : follow()
        }

        return(
          <div>

            <Paper className={classes.root} elevation={4}>
              <Typography  variant="h6" className={classes.title} >
                Profile
              </Typography>
            <List dense>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.name} secondary={user.email}/>
            

            {
              
              auth.isAuthenticated().user && auth.isAuthenticated().user._id ===id? (
              <ListItemSecondaryAction>
                <Link to={"/user/edit/" + user._id}>
                  <IconButton aria-label="Edit" color="primary">
                    <EditIcon/>
                  </IconButton>
                </Link>

                {/* Delete Button */}
                <DeleteUser userId={user._id}/>

                </ListItemSecondaryAction>
                ):(
                  <FollowButton following={tofollow} update={updateFollow}/>
                
                )
                
            }
            
            </ListItem>
              <ListItem>
                <ListItemText primary={user.about}/>
              </ListItem>
              <Divider/>
              <ListItem>
                <ListItemText primary={"Joined: " + (
                new Date(user.created)).toDateString()}/>
              </ListItem>
            </List>
            </Paper>
          {
             auth.isAuthenticated().user && auth.isAuthenticated().user._id ===id? (
              <ProfileTabs user={user} posts={posts}  removeUpdate={removePost} />
             ):(
               ""
             )
          }
            
          </div>
           )

}

export default Profile;