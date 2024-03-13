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
   id:string,
   productId:string | undefined
   quantity:undefined | number
}

export interface cart{
    name:string,
    price:number,
    category:string,
    description:string,
    imageUrl:string,
    id:string | undefined,
    quantity:undefined | number
    productId:string | undefined
    userId:string | undefined
 }

 export interface priceSummary{
    price:number
    discount:number
    tax:number,
    delivery:number,
    total:number
}

export interface order{
    name:string
    email:string
    userId:string | undefined
    totalPrice:number | undefined
    id:number|undefined
}