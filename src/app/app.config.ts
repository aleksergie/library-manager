import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { BOOKS_IMPORTER } from './domain/tokens';
import { BooksImporterService } from './domain/data-access/books-importer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(appRoutes),
    { provide: BOOKS_IMPORTER, useClass: BooksImporterService }
  ]
};
