import { ChallengeModalComponent } from './challenge-modal/challenge-modal.component';
import { HubComponent } from './hub/hub.component';
import { Routes } from '@angular/router';

const routerConfig: Routes =[
    {
        path: '',
        component: ChallengeModalComponent,
        data: {title: 'Hub'}
    }
];
export default routerConfig
