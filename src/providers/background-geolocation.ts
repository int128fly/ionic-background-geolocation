import { Injectable } from "@angular/core";
import { ConfigureOptions, Location, LocationError, BackgroundGeolocationError, ServiceStatus, LocationOptions } from "./background-geolocation.model";
import { Observable } from "rxjs";

declare var BackgroundGeolocation: any;

@Injectable()
export class BackgroundGeolocationProvider {
    public configure(options: ConfigureOptions) : void {
        BackgroundGeolocation.configure(options);
    } 

    start() : void {
        BackgroundGeolocation.start();
    }

    stop() : void {
        BackgroundGeolocation.stop();
    }

    checkStatus() : Observable<ServiceStatus> {
        return Observable.create(o => {
            BackgroundGeolocation.startTask((status: ServiceStatus) => {
                o.next(status);
                o.complete();
            }, (error: BackgroundGeolocationError) => {
                o.error(error);
                o.complete();
            });
        });
    }

    startTask() : Observable<number> {
        return Observable.create(o => {
            BackgroundGeolocation.startTask((taskKey: number) => {
                o.next(taskKey);
                o.complete();
            }, (error: BackgroundGeolocationError) => {
                o.error(error);
                o.complete();
            });
        });
    }

    endTask(taskKey: number) : Observable<number> {
        return Observable.create(o => {
            BackgroundGeolocation.endTask(taskKey, () => {
                o.next(taskKey);
                o.complete();
                
            }, (error: BackgroundGeolocationError) => {
                o.error(error);
                o.complete();
            });
        });
    }

    getCurrentLocation(options?: LocationOptions) : Observable<Location> {
        return Observable.create(o => {
            BackgroundGeolocation.getCurrentLocation((location: Location) => {
                o.next(location);
                o.complete();
            }, (error: LocationError) => {
                o.error(error);
                o.complete();
            }, options);
        });
    }

    eventStart() : Observable<void> {
        return Observable.create(o => {
            BackgroundGeolocation.on('start', () => {
                o.next();
            });
        });
    }

    eventStop() : Observable<void> {
        return Observable.create(o => {
            BackgroundGeolocation.on('stop', () => {
                o.next();
            });
        });
    }

    eventLocation() : Observable<Location> {
        return Observable.create(o => {
            BackgroundGeolocation.on('location', (location: Location) => {
                o.next(location);
            });
        });
    }
}