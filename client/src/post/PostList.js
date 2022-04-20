import React from 'react';
import {Card ,Divider, Paper} from '@mui/material'
import Post from './Post'
import Styles from '../user/Styles';
import { remove } from 'lodash';

const PostList = ({removeUpdate, posts})=>{
    
    return(
        <div>
            {posts.map( (item, i)=>{
                
                return(
                   
                    <Paper key={i} >
                        <Post post={item}  remove={removeUpdate} />
                    </Paper>
                   
                
                )
                
            })}
        </div>
    )
}
export default PostList;