import { HubComponent } from './hub/hub.component';
import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { RoomGuard } from './guards/room-guard.service';

const routerConfig: Routes =[
    {
        path: '',
        component: HubComponent,
        data: {title: 'Hub'}
    },
    {
        path: 'game',
        children:[
            {path:':roomId',
                component:GameComponent,
                canActivate: [RoomGuard]
            }
        ],
        title: 'Tic Tac Toe',
        data: {
            meta: 'Game Page'
        }
    }
    
];
export default routerConfig
