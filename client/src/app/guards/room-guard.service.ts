import { Injectable } from "@angular/core";
import { io, Socket } from 'socket.io-client';
import { Observable, Subject } from "rxjs";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from "@angular/router";

@Injectable({
    providedIn: 'root',
})
export class RoomGuard implements CanActivate {
    

    constructor() {
      
    }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log(route.params["roomId"]);
    return true;
  }    
}
