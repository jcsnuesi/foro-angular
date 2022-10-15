import {NgModule} from '@angular/core';
import {RouterModule, Routes}  from '@angular/router';

//Componentes
import { MainComponent } from './main/main.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { UserGuard } from 'src/app/components/service/user.guard';

const panelRoutes: Routes = [
    {
        path: 'panel',
        component: MainComponent,
        canActivate: [UserGuard],
        children: [
            { path: '', component: ListComponent},
            { path: 'listado', component: ListComponent },
            { path: 'crear', component: AddComponent },
            { path: 'editar/:id', component: EditComponent }
            
        ]
        //   { path: '', component: HomeComponent },
    }
]

@NgModule({
   imports: [
        RouterModule.forChild(panelRoutes)
   ], 
   exports: [
    RouterModule
   ]
})

export class PanelRoutingModule {}