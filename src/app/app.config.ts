import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { BOOKS_EXPORTER, BOOKS_IMPORTER } from './domain/tokens';
import { XmlBooksImporterService } from './domain/data-access/books-importer';
import { XmlBooksExporterService } from './domain/data-access/books-exporter';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(appRoutes),
    { provide: BOOKS_IMPORTER, useClass: XmlBooksImporterService },
    { provide: BOOKS_EXPORTER, useClass: XmlBooksExporterService },
  ],
};
