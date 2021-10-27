import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedCertificatesComponent } from './uploaded-certificates.component';

describe('UploadedCertificatesComponent', () => {
  let component: UploadedCertificatesComponent;
  let fixture: ComponentFixture<UploadedCertificatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadedCertificatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
