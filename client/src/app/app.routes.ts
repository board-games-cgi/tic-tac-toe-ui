import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';

const routesConfig: Routes = [
    {
        path: 'game',
        component: GameComponent,
        title: 'Tic Tac Toe',
        data: {
            meta: 'Game Page'
        }
    }
];
export default routesConfig;