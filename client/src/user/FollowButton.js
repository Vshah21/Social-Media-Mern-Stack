import {Button} from '@mui/material'
import React from 'react'

const FollowButton = ({following, update}) =>{

    return (
        <div>
           
            { following===false ?
                <Button onClick={()=>update("follow")}color="primary" variant="contained">Follow</Button>

                :
                <Button onClick={()=>update("unfollow")}color="primary" variant="contained">UnFollow</Button>


             
            }
        </div>
    )

}
export default FollowButton