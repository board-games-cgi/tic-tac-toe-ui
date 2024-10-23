import { Injectable } from "@angular/core";
import { io, Socket } from 'socket.io-client';
import { Observable, Subject } from "rxjs";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { SocketService } from "../services/socket.service";

@Injectable({
    providedIn: 'root',
})
export class RoomGuard implements CanActivate {
    

  constructor(private socketService: SocketService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const roomId = route.params["roomId"];

    return true
  } 
}
