import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { SocketService } from "../services/socket.service";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class RoomGuard implements CanActivate {
    
  constructor(private socketService: SocketService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const roomId = route.params["roomId"];
        return this.socketService.checkRoomAccess(roomId).pipe(map((data: {isAllowed: boolean, allowedParticipants :string[]}) => {
        if (data.isAllowed) {
          console.log("Access Allowed");
          return true;
        } else {
          console.error("Access Denied");
          console.log(`Players allowed: ${data.allowedParticipants}`)
          return false;
        }
      })
    );
  }
}

