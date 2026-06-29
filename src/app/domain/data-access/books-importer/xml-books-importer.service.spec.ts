import { TestBed } from '@angular/core/testing';
import { XmlBooksImporterService } from './index';

describe('XmlBooksImporterService', () => {
    let service: XmlBooksImporterService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [XmlBooksImporterService],
        });
        service = TestBed.inject(XmlBooksImporterService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    })
})