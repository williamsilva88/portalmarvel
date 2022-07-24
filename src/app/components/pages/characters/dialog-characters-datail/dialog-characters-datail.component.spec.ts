import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { ComicsResultCharacter } from 'src/app/model/comics.model';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { MainState } from 'src/app/state/main.state';
import { DialogCharactersDatailComponent } from './dialog-characters-datail.component';

describe('DialogCharactersDatailComponent', () => {
  let component: DialogCharactersDatailComponent;
  let fixture: ComponentFixture<DialogCharactersDatailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogCharactersDatailComponent],
      imports: [
        NgxsModule.forRoot([MainState]),
        HttpClientModule,
        MaterialModule,
        RouterModule,
        ReactiveFormsModule,
      ],
      providers: [
        HttpClient,
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { character: new ComicsResultCharacter() },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogCharactersDatailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
