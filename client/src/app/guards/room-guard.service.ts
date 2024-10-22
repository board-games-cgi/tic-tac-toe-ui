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

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const roomId = route.params["roomId"];

    return new Observable<boolean>((observer) => {
      this.socketService.emit('joinRoom', roomId);

      this.socketService.listenForRoomAccessDenied().subscribe((message: string) => {
        console.error('Access Denied:', message);
        this.router.navigate(['/']);
        observer.next(false);
        observer.complete();
      });

      this.socketService.on('playerJoined').subscribe(() => {
        observer.next(true);
        observer.complete();
      });
    });
  } 
}
