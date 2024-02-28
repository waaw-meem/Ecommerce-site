export interface signUp{
    name:string,
    password:string,
    email:string
}

export interface signIn{
    email:string
    password:string,
}

export interface product{
   name:string,
   price:number,
   category:string,
   description:string,
   imageUrl:string,
   id:string
}