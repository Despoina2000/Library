import { mergeApplicationConfig, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration } from '@angular/platform-browser';


const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient(), provideAnimationsAsync(),provideClientHydration(),
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
