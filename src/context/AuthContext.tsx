import React,{useEffect,useContext,useMemo,useState, createContext, Children, use} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContextType,User,LoginPayload,SignUpPayload } from "../type/auth";
import { isValidEmail,isValidPassword } from "../util/validator";

const AUTH_USER_KEY = 'AUTH_USER'
const REGISTERED_USER_KEY = 'REGISTERED_USER'

const AuthContext = createContext<AuthContextType|undefined>(undefined);

export const AuthProvider =({children}:{children:React.ReactNode})=>{
    const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
   

    useEffect(()=>{
        restoreSession();
    },[]);

    const restoreSession =async()=>{
        try{
            const savedUser = await AsyncStorage.getItem(AUTH_USER_KEY);
            if(savedUser){
                setUser(JSON.parse(savedUser));
            }
        }
        catch(error){
            console.log('Restore error',error)

        }
        finally{
            setLoading(false);
        }
    }

    const getRegisteredUser = async() : Promise<User[]> =>{
        const data = await AsyncStorage.getItem(REGISTERED_USER_KEY);
        return data ? JSON.parse(data) :[]

    }

    const saveRegisteredUser = async(user :User[]) =>{
        const data = await AsyncStorage.setItem(REGISTERED_USER_KEY,JSON.stringify(user));
    }

    const login = async({email,password}:LoginPayload ) : Promise<{ success: boolean; message?: string }> =>{
        if(!isValidEmail(email)){
            return{success : false, message:"Please enter valid Email"}
        }
        if(!password){
            return {success: false, message:'Password is required'}
        }

        const users = await getRegisteredUser();
        const existingUser = users.find(item =>item.email.toLowerCase() === email.toLowerCase() && item.password === password)

        if(!existingUser){
            return {success: false, message :'Incorrect Email and Password.'}
        }
        setUser(existingUser);
        await AsyncStorage.setItem(AUTH_USER_KEY,JSON.stringify(existingUser))

        return {success: true}
    
    }

    const signup = async({name,email,password}:SignUpPayload) : Promise<{ success: boolean; message?: string }>=>{
        if(!name|| !password || !email){
            return {success : false, message :'All fields are required'}

        }
        if(!isValidEmail(email)){
            return{success : false, message:"Please enter valid Email"}
        }
        if(!isValidPassword(password)){
            return{success : false, message:"Passowrd must be of 6 character"}
        }
        const users = await getRegisteredUser();
        const userExist = users.some(item => item.email.toLowerCase() == email.toLowerCase())

        if(userExist){
            return {success : false, message :'User already exists, Please Login'}
        }
        const newUser: User =  {name, email,password}
        const updateUser = [...users,newUser]

        await saveRegisteredUser(updateUser)
        //setUser(newUser)
        //await AsyncStorage.setItem(AUTH_USER_KEY,JSON.stringify(newUser))
        return {success : true};

    }
    const logout = async()=>{
        setUser(null)
        await AsyncStorage.removeItem(AUTH_USER_KEY);
    }

    const value = useMemo(()=>({
        user,
        loading,
        login,
        signup,
        logout

    }),[user,loading])

   return <AuthContext.Provider  value ={value}>{children}</AuthContext.Provider>
}
export const useAuth = () :AuthContextType =>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}