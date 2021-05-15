import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';  // инициализирует платформу, которая запускает приложение

import { AppModule } from './app/app.module';  // использует эту платформу для загрузки модуля AppModule
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
