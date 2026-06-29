import { TestBed } from '@angular/core/testing';
import { XmlBooksExporterService } from './index';

describe('XmlBooksExporterService', () => {
    let service: XmlBooksExporterService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [XmlBooksExporterService],
        });
        service = TestBed.inject(XmlBooksExporterService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    })
})