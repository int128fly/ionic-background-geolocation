import { NgModule, ModuleWithProviders } from '@angular/core';
import { BackgroundGeolocationProvider } from './providers/background-geolocation';
 
@NgModule({})
export class IonicAcademyModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: IonicAcademyModule,
            providers: [BackgroundGeolocationProvider]
        };
    }
}