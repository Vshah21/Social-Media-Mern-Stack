
const auth = {

    authenticate(jwt, cb){
        if(typeof window !== "undefined"){
            sessionStorage.setItem("jwt",JSON.stringify(jwt))
        }
        cb()
    },
    // if user is signed in
    isAuthenticated (){
        if(typeof window =="undefined"){
            return false 
        }
        // if jwt token exists return token else return false
        if(sessionStorage.getItem('jwt')){
            return JSON.parse(sessionStorage.getItem('jwt'))
        }else{
            return false
        }
    },
    // user signout method
    clearJWT(cb){
        if(typeof window !== "undefined"){
            sessionStorage.removeItem('jwt')
        }
        cb()
    }
}
export default auth
