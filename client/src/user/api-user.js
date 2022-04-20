
// creating a user. Add into the database 
// POST request sent to the url /api/users
// convert the user javascript object to a json string 
const create = async (user) =>{
    try {
        let response = await fetch('http://localhost:5000/api/users',{
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(user)
        })
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}


// listing all the users in the database
// using fetch to make a get request to retrieve all the users

const list = async (signal) =>{
    try {
        let response = await fetch('http://localhost:5000/api/users',{
            method:'GET',
            signal: signal,
        })
        // returns a response from the server as a promise
        return await response.json()
        
    } catch (error) {
        console.log(error)
    }
}

// Reading a user profile
const read = async ( params, credentials, signal) =>{

    try {
       
        let response = await fetch(`http://localhost:5000/api/users/${params.userId}`, {
            method:'GET',
            signal:signal,
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':'Bearer'+credentials.t
                // JWT is attached in the Authorization header using the bearer scheme
            }
        })
        // If authorization successful then the response returns the user details for the specfic user
        // if authorization not successful then it is restricted access to the user 
        return await response.json()
        

    } catch (error) {
        console.log(error)
    }
}

const update = async ( params, credentials, user) =>{

    try {
        let response = await fetch('http://localhost:5000/api/users/'+params.userId,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer'+ credentials.t
                // JWT is attached in the Authorization header using the bearer scheme
            },
            body: JSON.stringify(user)
        })

        return await response.json()

    } catch (error) {
        console.log(error)
    }
}

const remove = async (params, credentials) =>{
    try {
        let response = await fetch( 'http://localhost:5000/api/users/' +params.userId, {
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':'Bearer'+ credentials.t
                // JWT is attached in the Authorization header using the bearer scheme
            }
        })
        return await response.json()
        
    } catch (error) {
        console.log(error)
    }
}

const following = async (credentials,userId,followUserId) =>{
    
    try {
        
        let response = await fetch('http://localhost:5000/api/follow',{
            method: 'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer'+credentials.t
            },
            body: JSON.stringify({userId:userId, followId: followUserId})
        })
        return await response.json()
       
    } catch (error) {
        console.log(error)
    }
}

const unfollowing = async (credentials,userId,followUserId) =>{
    
    try {

        let response = await fetch('http://localhost:5000/api/follow',{
            method: 'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':'Bearer'+credentials.t
            },
            body: JSON.stringify({userId:userId, followId: followUserId})
        })
        return await response.json()
        
    } catch (error) {
        console.log(error)
    }
}

const findPeople = async(params, credentials, signal) =>{
   
    try {
        let response = await fetch('http://localhost:5000/api/follow/users/'+params.userId,{
            method:'GET',
            signal: signal,
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':'Bearer'+credentials.t
            }
        })

        return await response.json()

    } catch (error) {
        console.log(error)
    }
}

export { create, list , read, update,following, remove, unfollowing, findPeople}