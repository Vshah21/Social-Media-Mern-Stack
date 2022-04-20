import React from 'react'
import {Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import Profile from './user/Profile'
import EditProfile from './user/EditProfile'
import PrivateRoute from './auth/PrivateRoute'
import Menu from './Components/Menu'
const MainRouter = () =>{
    return (
        <div>
            <Menu/>
            <Routes>
                <Route exact path='/' element ={<Home/>}></Route>
                <Route exact path='/users' element ={<Users/>}></Route>
                <Route exact path='/signup' element ={<Signup/>}></Route>
                <Route exact path='/signin' element ={<Signin/>}></Route>
                <Route exact path='/user/edit/:id' element={<PrivateRoute/>}>
                    <Route exact path='/user/edit/:id' element={<EditProfile/>}/>
                </Route>
                <Route exact path='/user/:id' element ={<Profile/>}></Route>

            </Routes>
        </div>
    )
}

export default MainRouter;