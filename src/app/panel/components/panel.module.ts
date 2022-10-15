//Modulos
import { NgModule} from '@angular/core';
import {CommonModule} from '@angular/common'
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PanelRoutingModule } from './panel-routing-module'

//Componentes
import { MainComponent } from './main/main.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { MomentModule } from 'angular2-moment';

//Servicios
import { UserService } from 'src/app/components/service/user.service';
import { UserGuard } from 'src/app/components/service/user.guard';

//NgModule

@NgModule({
    declarations: [
        MainComponent,
        ListComponent,
        AddComponent,
        EditComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        PanelRoutingModule,
        MomentModule
    ],
    exports:[
        MainComponent,
        ListComponent,
        AddComponent,
        EditComponent
    ], 
    providers: [UserGuard, UserService]
})

export class PanelModule {}