export interface AuthModel{
  token?:string, 
  userName?:string,
   message?:string,
     isAuthenticated?:boolean

     roles?:Array<string>
      email?:string 
  
      refreshToken?:string
     refreshTokenExiration?:any 
}