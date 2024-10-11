import { HubComponent } from './hub/hub.component';
import { Routes } from '@angular/router';

const routerConfig: Routes =[
    {
        path: '',
        component: HubComponent,
        data: {title: 'Hub'}
    }
];
export default routerConfig
