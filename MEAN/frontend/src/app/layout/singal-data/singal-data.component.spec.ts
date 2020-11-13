import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingalDataComponent } from './singal-data.component';

describe('SingalDataComponent', () => {
  let component: SingalDataComponent;
  let fixture: ComponentFixture<SingalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingalDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
