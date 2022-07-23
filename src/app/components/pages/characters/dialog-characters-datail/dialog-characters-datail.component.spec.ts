import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCharactersDatailComponent } from './dialog-characters-datail.component';

describe('DialogCharactersDatailComponent', () => {
  let component: DialogCharactersDatailComponent;
  let fixture: ComponentFixture<DialogCharactersDatailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCharactersDatailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCharactersDatailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
