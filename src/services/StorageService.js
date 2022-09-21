import AsyncStorage from "@react-native-async-storage/async-storage";

const setFirstTimeUse = () => {
   return AsyncStorage.setItem("isFirstTimeUse","true")
}

const getFirstTimeUse = () => {
   return AsyncStorage.getItem("isFirstTimeUse")
}
const setToken = (token) => {
 return   AsyncStorage.getItem("token",token)
}
const getToken = () => {
   return AsyncStorage.getItem("token")
}

export default {setFirstTimeUse , getFirstTimeUse , setToken, getToken}