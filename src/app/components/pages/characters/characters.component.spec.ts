import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { MainState } from 'src/app/state/main.state';
import { CharactersComponent } from './characters.component';

describe(CharactersComponent.name, () => {
  let component: CharactersComponent;
  let fixture: ComponentFixture<CharactersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharactersComponent],
      imports: [
        NgxsModule.forRoot([MainState]),
        HttpClientModule,
        MaterialModule,
        RouterModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [HttpClient, FormBuilder],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
