import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { MessagesComponent } from './components/messages/messages.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

const COMPONENTS = [
  ToolbarComponent,
  MessagesComponent
]

const MODULES = [
  FlexLayoutModule,
  MaterialModule,
  RouterModule
]

@NgModule({
  declarations: [COMPONENTS],
  imports: [CommonModule ,MODULES],
  exports: [
    MODULES,
    COMPONENTS,
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule has already been loaded. Import this module in the AppModule'
      )
    }
  }
}