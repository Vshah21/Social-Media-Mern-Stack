// send a post request with the user authentications and post data
const create = async ( params, credentials, postData) =>{
    
    try {
        let response = await fetch('http://localhost:5000/api/posts/new/'+params.userId,{
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':'Bearer'+credentials.t
            },
            body: JSON.stringify(postData)
        })
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}
const listNewsFeed = async (params, credentials) =>{
    
    try {
        let response = await fetch('http://localhost:5000/api/posts/feed/'+params.userId,{
            method: 'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':'Bearer'+credentials.t
            },
            
        })
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

const listByUser = async (params, credentials) =>{
    
    try {
        let response = await fetch('http://localhost:5000/api/posts/user/'+params.userId,{
            method: 'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':'Bearer'+credentials.t
            },
            
        })
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}


const removePost = async (params, credentials) =>{
    
    try {
        let response = await fetch('http://localhost:5000/api/posts/'+params.postId,{
            method: 'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':'Bearer'+credentials.t
            },
            
        })
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

const likePost = async (credentials) =>{
    
    try {
        let response = await fetch('http://localhost:5000/api/posts/like',{
            method: 'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':'Bearer'+credentials.t
            },
            
        })
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

const comment = async ( params, credentials, postId, comment ) =>{
    
    try {
        let response = await fetch('http://localhost:5000/api/posts/comment/',{
            method: 'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':'Bearer'+credentials.t
            },
            body: JSON.stringify({userId:params.userId, postId: postId,comment: comment})
        })
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

const uncomment = async ( params, credentials, postId, commentId ) =>{
    
    try {
        let response = await fetch('http://localhost:5000/api/posts/uncomment/',{
            method: 'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':'Bearer'+credentials.t
            },
            body: JSON.stringify({userId:params.userId, postId: postId,comment: commentId})
        })
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}




export {
    create, listNewsFeed, removePost, comment ,uncomment ,listByUser
}