import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth.guard";

import { HomeComponent } from "./home/home.component";
import { SellerAuthComponent } from "./seller-auth/seller-auth.component";
import { SellerHomeComponent } from "./seller-home/seller-home.component";
import { SellerAddProductComponent } from "./seller-add-product/seller-add-product.component";
import { SellerUpdateProductComponent } from "./seller-update-product/seller-update-product.component";
import { SearchComponent } from "./search/search.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { UserAuthComponent } from "./user-auth/user-auth.component";


const appRoutes : Routes = [
    {path:'',component:HomeComponent},
    {path:'seller',component:SellerAuthComponent},
    {path:'seller-home',component:SellerHomeComponent, canActivate:[AuthGuard]},
    {path:'seller-add-product',component:SellerAddProductComponent,canActivate:[AuthGuard]},
    {path:'seller-update-product/:id',component:SellerUpdateProductComponent,canActivate:[AuthGuard]},
    {path:'search/:query',component:SearchComponent},
    {path:'details/:productId',component:ProductDetailComponent},
    {path:'user-auth',component:UserAuthComponent}
]

@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})

export class RouteAppComponent{

}