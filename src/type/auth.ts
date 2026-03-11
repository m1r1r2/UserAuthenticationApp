export type User = {
    name :string,
    email : string 
    password:string
}

export type LoginPayload ={
    email:string
    password :string
}

export type SignUpPayload ={
    name : string
    email:string
    password :string
}

export type AuthContextType={
    user :User| null
    loading : boolean
    login :(payload:LoginPayload) =>Promise<{success: boolean, message?:string}>
    signup :(payload : SignUpPayload)=>Promise<{success:boolean,message?:string}>
    logout : ()=> Promise<void>

}