import { HubComponent } from './hub/hub.component';
import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';

const routerConfig: Routes =[
    {
        path: '',
        component: HubComponent,
        data: {title: 'Hub'}
    },
    {
        path: 'game',
        component: GameComponent,
        title: 'Tic Tac Toe',
        data: {
            meta: 'Game Page'
        }
    }
    
];
export default routerConfig
