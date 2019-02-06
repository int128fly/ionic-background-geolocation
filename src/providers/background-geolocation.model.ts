type Event = 'location' | 'stationary' | 'activity' | 'start' | 'stop' | 'error' | 'authorization' | 'foreground' | 'background' | 'abort_requested' | 'http_authorization';
type HeadlessTaskEventName = 'location' | 'stationary' | 'activity';
type iOSActivityType = 'AutomotiveNavigation' | 'OtherNavigation' | 'Fitness' | 'Other';
type NativeProvider = 'gps' | 'network' | 'passive' | 'fused';
type ActivityType = 'IN_VEHICLE' | 'ON_BICYCLE' | 'ON_FOOT' | 'RUNNING' | 'STILL' | 'TILTING' | 'UNKNOWN' | 'WALKING';
type LogLevel = 'TRACE' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
type AccuracyLevel = LocationAccuracy | number;
type LocationErrorCode = 1 | 2 | 3;
type ServiceMode = 0 | 1;

export enum AuthorizationStatus {
    NOT_AUTHORIZED,
    AUTHORIZED,
    AUTHORIZED_FOREGROUND
}

export enum LocationAccuracy {
    HIGH_ACCURACY = 0,
    MEDIUM_ACCURACY = 100,
    LOW_ACCURACY = 1000,
    PASSIVE_ACCURACY = 10000
}

export enum LocationProvider {
    DISTANCE_FILTER_PROVIDER = 0,
    ACTIVITY_PROVIDER = 1,
    RAW_PROVIDER = 2
}

export interface ConfigureOptions {
    /**
     * Set location provider
     *
     * Platform: all
     * Available providers:
     *  DISTANCE_FILTER_PROVIDER,
     *  ACTIVITY_PROVIDER
     *  RAW_PROVIDER
     *
     * @default DISTANCE_FILTER_PROVIDER
     * @example
     * { locationProvider: BackgroundGeolocation.RAW_PROVIDER }
     */
    locationProvider?: LocationProvider;
  
    /**
     * Desired accuracy in meters.
     *
     * Platform: all
     * Provider: all
     * Possible values:
     *  HIGH_ACCURACY,
     *  MEDIUM_ACCURACY,
     *  LOW_ACCURACY,
     *  PASSIVE_ACCURACY
     * Note: Accuracy has direct effect on power drain. Lower accuracy = lower power drain.
     *
     * @default MEDIUM_ACCURACY
     * @example
     * { desiredAccuracy: BackgroundGeolocation.LOW_ACCURACY }
     */
    desiredAccuracy?: AccuracyLevel;
  
    /**
     * Stationary radius in meters.
     *
     * When stopped, the minimum distance the device must move beyond the stationary location for aggressive background-tracking to engage.
     * Platform: all
     * Provider: DISTANCE_FILTER
     *
     * @default 50
     */
    stationaryRadius?: number;
  
    /**
     * When enabled, the plugin will emit sounds for life-cycle events of background-geolocation! See debugging sounds table.
     *
     * Platform: all
     * Provider: all
     *
     * @default false
     */
    debug?: boolean;
  
    /**
     * The minimum distance (measured in meters) a device must move horizontally before an update event is generated.
     *
     * Platform: all
     * Provider: DISTANCE_FILTER, RAW
     *
     * @default 500
     * @see {@link https://apple.co/2oHo2CV|Apple docs}
     */
    distanceFilter?: number;
  
    /**
     * Enable this in order to force a stop() when the application terminated.
     * E.g. on iOS, double-tap home button, swipe away the app.
     *
     * Platform: all
     * Provider: all
     *
     * @default true
     */
    stopOnTerminate?: boolean;
  
    /**
     * Start background service on device boot.
     *
     * Platform: Android
     * Provider: all
     *
     * @default false
     */
    startOnBoot?: boolean;
  
    /**
     * The minimum time interval between location updates in milliseconds.
     *
     * Platform: Android
     * Provider: all
     *
     * @default 60000
     * @see {@link https://bit.ly/1x00RUu|Android docs}
     */
    interval?: number;
  
    /**
     * Fastest rate in milliseconds at which your app can handle location updates.
     *
     * Platform: Android
     * Provider: ACTIVITY
     *
     * @default 120000
     * @see {@link https://bit.ly/1x00RUu|Android docs}
     */
    fastestInterval?: number;
  
    /**
     * Rate in milliseconds at which activity recognition occurs.
     * Larger values will result in fewer activity detections while improving battery life.
     *
     * Platform: Android
     * Provider: ACTIVITY
     *
     * @default 10000
     */
    activitiesInterval?: number;
  
    /**
     * @deprecated Stop location updates, when the STILL activity is detected.
     */
    stopOnStillActivity?: boolean;
  
    /**
     * Enable/disable local notifications when tracking and syncing locations.
     *
     * Platform: Android
     * Provider: all
     *
     * @default true
     */
    notificationsEnabled?: boolean;
  
    /**
     * Allow location sync service to run in foreground state.
     * Foreground state also requires a notification to be presented to the user.
     *
     * Platform: Android
     * Provider: all
     *
     * @default false
     */
    startForeground?: boolean;
  
    /**
     * Custom notification title in the drawer.
     *
     * Platform: Android
     * Provider: all
     * @default "Background tracking"
     */
    notificationTitle?: string;
  
    /**
     * Custom notification text in the drawer.
     *
     * Platform: Android
     * Provider: all
     *
     * @default "ENABLED"
     */
    notificationText?: string;
  
    /**
     * The accent color (hex triplet) to use for notification.
     * Eg. <code>#4CAF50</code>.
     *
     * Platform: Android
     * Provider: all
     */
    notificationIconColor?: string;
  
    /**
     * The filename of a custom notification icon.
     *
     * Platform: Android
     * Provider: all
     */
    notificationIconLarge?: string;
  
    /**
     * The filename of a custom notification icon.
     *
     * Platform: Android
     * Provider: all
     */
    notificationIconSmall?: string;
  
    /**
     * Activity type.
     * Presumably, this affects iOS GPS algorithm.
     *
     * Possible values:
     * "AutomotiveNavigation", "OtherNavigation", "Fitness", "Other"
     *
     * Platform: iOS
     * Provider: all
     *
     * @default "OtherNavigation"
     * @see {@link https://apple.co/2oHofpH|Apple docs}
     */
    activityType?: iOSActivityType;
  
    /**
     * Pauses location updates when app is paused.
     *
     * Platform: iOS
     * Provider: all
     *
     * @default false
     * @see {@link https://apple.co/2CbjEW2|Apple docs}
     */
    pauseLocationUpdates?: boolean;
  
    /**
     * Switch to less accurate significant changes and region monitory when in background.
     *
     * Platform: iOS
     * Provider: all
     *
     * @default false
     */
    saveBatteryOnBackground?: boolean;
  
    /**
     * Server url where to send HTTP POST with recorded locations
     *
     * Platform: all
     * Provider: all
     */
    url?: string;
  
    /**
     * Server url where to send fail to post locations
     *
     * Platform: all
     * Provider: all
     */
    syncUrl?: string;
  
    /**
     * Specifies how many previously failed locations will be sent to server at once.
     *
     * Platform: all
     * Provider: all
     *
     * @default 100
     */
    syncThreshold?: string;
  
    /**
     * Optional HTTP headers sent along in HTTP request.
     *
     * Platform: all
     * Provider: all
     */
    httpHeaders?: any;
  
    /**
     * Limit maximum number of locations stored into db.
     *
     * Platform: all
     * Provider: all
     *
     * @default 10000
     */
    maxLocations?: number;
  
    /**
     * Customization post template.
     *
     * Platform: all
     * Provider: all
     */
    postTemplate?: any;
  }
  
  export interface LocationOptions {
    /**
     * Maximum time in milliseconds device will wait for location.
     */
    timeout?: number;
  
    /**
     * Maximum age in milliseconds of a possible cached location that is acceptable to return.
     */
    maximumAge?: number;
  
    /**
     * If true and if the device is able to provide a more accurate position, it will do so.
     */
    enableHighAccuracy?: boolean;
  }

  export interface Location {
    /** ID of location as stored in DB (or null) */
    id: number;
  
    /**
     * Native provider reponsible for location.
     *
     * Possible values:
     * "gps", "network", "passive" or "fused"
     */
    provider: NativeProvider;
  
    /** Configured location provider. */
    locationProvider: number;
  
    /** UTC time of this fix, in milliseconds since January 1, 1970. */
    time: number;
  
    /** Latitude, in degrees. */
    latitude: number;
  
    /** Longitude, in degrees. */
    longitude: number;
  
    /** Estimated accuracy of this location, in meters. */
    accuracy: number;
  
    /**
     * Speed if it is available, in meters/second over ground.
     *
     * Note: Not all providers are capable of providing speed.
     * Typically network providers are not able to do so.
     */
    speed: number;
  
    /** Altitude if available, in meters above the WGS 84 reference ellipsoid. */
    altitude: number;
  
    /** Bearing, in degrees. */
    bearing: number;
  
    /**
     * True if location was recorded by mock provider. (ANDROID ONLY)
     *
     * Note: this property is not enabled by default!
     * You can enable it "postTemplate" configure option.
     */
    isFromMockProvider?: boolean;
  
    /**
     * True if device has mock locations enabled. (ANDROID ONLY)
     *
     * Note: this property is not enabled by default!
     * You can enable it "postTemplate" configure option.
     */
    mockLocationsEnabled?: boolean;
  }

  export interface LocationError {
    /**
     * Reason of an error occurring when using the geolocating device.
     *
     * Possible error codes:
     *  1. PERMISSION_DENIED
     *  2. LOCATION_UNAVAILABLE
     *  3. TIMEOUT
     */
    code: LocationErrorCode;
  
    /** Message describing the details of the error */
    message: string;
  }

  export interface BackgroundGeolocationError {
    code: number;
    message: string;
  }

  export interface ServiceStatus {
    /** TRUE if service is running. */
    isRunning: boolean;
  
    /** TRUE if location services are enabled */
    locationServicesEnabled: boolean;
  
    /**
     * Authorization status.
     *
     * Posible values:
     *  NOT_AUTHORIZED, AUTHORIZED, AUTHORIZED_FOREGROUND
     *
     * @example
     * if (authorization == BackgroundGeolocation.NOT_AUTHORIZED) {...}
     */
    authorization: AuthorizationStatus;
  }