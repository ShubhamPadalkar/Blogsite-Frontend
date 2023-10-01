import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({children}) => {

//Check if user is login
const user = useSelector(state=>state?.users)
const { userAuth } = user

if(userAuth){return (<>{children}</>)}
else {return <Navigate to={'/Login'} replace/>}


}

export default ProtectedRoute