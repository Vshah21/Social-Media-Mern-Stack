import React, { useEffect } from 'react'
import auth from '../auth/auth-helper'
import {findPeople} from './api-user'
const PeopleToFollow = ()=>{
    const jwt = auth.isAuthenticated()
    useEffect( ()=>{

        const abortController = new AbortController()
        const signal = abortController.signal
        
        findPeople({userId: jwt.user._id},{t: jwt.token}, signal)
        .then( (data)=>{
            if(data.error){
                console.log(data.error)
            }else{
                console.log(data)
            }
        })
    
        
    }, [])

    return (
        <div>

        </div>
    )
}
export default PeopleToFollow;