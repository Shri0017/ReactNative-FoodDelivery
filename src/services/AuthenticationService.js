import axios from 'axios'
import { ApiConstant } from '../constants'

// const AuthRequest = axios.create({
//     baseURL:ApiConstant.BACKEND_API.BASE_API_URL, 
// })

const baseURL = ApiConstant.BACKEND_API.BASE_API_URL ;


const register =  async (user) =>{

    if(!user?.username || !user?.email || !user?.password){
    return {status:false , message : "please fill up all the fields"}
    }
    try {
     let requestBody = {
        username : user?.username,
        email : user?.email,
        password: user?.password
     };
    //  let registerResponse = await AuthRequest.post(ApiConstant.BACKEND_API.REGISTER, requestBody);
     let registerResponse= await axios.post('http://192.168.0.150:3000/api/register', requestBody)
        
     console.log(registerResponse?.data)
     return registerResponse?.data;
        
    } catch (error) {
        console.log(error);
        return {status:false , message:'OOps! something went wrong'}
    }
}   

const login =  async (user) =>{

    if(!user?.username || !user?.password){
    return {status:false , message : "please fill up all the fields"}
    }
    try {
     let requestBody = {
        username : user?.username,
        password: user?.password
     };
    //  let registerResponse = await AuthRequest.post(ApiConstant.BACKEND_API.REGISTER, requestBody);
     let loginResponse= await axios.post('http://192.168.0.150:3000/api/login', requestBody)
        
     console.log(loginResponse?.data)
     return loginResponse?.data;
        
    } catch (error) {
        console.log(error);
        return {status:false , message:'OOps! something went wrong'}
    }
}   
const checkUserExist =  async (type , value) => {

    try {
        let params = {[type]: value}
   
    //  let registerResponse = await AuthRequest.post(ApiConstant.BACKEND_API.USER_EXIST, requestBody);
     let checkUserResponse= await axios.get('http://192.168.0.150:3000/api/user-exist',{params});
       
     console.log(checkUserResponse?.data)
     return checkUserResponse?.data;
        
    } catch (error) {
        console.log(error);
        return {status:false , message:'OOps! something went wrong'}
    }
}   





export default {register,checkUserExist,login}