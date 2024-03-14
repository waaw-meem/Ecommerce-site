import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SellerService } from './seller-auth/seller.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private sellerService: SellerService) {}
// This method is implemented to determine if a route can be activated.
// It checks if the seller is logged in by examining the presence of seller information in the local storage.
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        // Check if seller information exists in local storage
      if(localStorage.getItem('seller')){
      // If seller information exists, return true to allow route activation
       return true
      }
  // If seller information does not exist, return the observable from isSuccessLogin property of sellerService
  // This ensures that the route activation depends on the value emitted by the isSuccessLogin BehaviorSubject
    return this.sellerService.isSuccessLogin; 
  }
}
