import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Subject, takeUntil } from 'rxjs';
import { CharacterDataContainer, ComicsResultCharacter, PersonagensFilter } from 'src/app/model/comics.model';
import { CarregarPersonagensMarvelApi } from 'src/app/state/main.actions';
import { MainState } from 'src/app/state/main.state';
import { DialogCharactersDatailComponent } from './dialog-characters-datail/dialog-characters-datail.component';

@Component({
  selector: 'app-personagens',
  templateUrl: './personagens.component.html',
  styleUrls: ['./personagens.component.scss']
})
export class PersonagensComponent implements OnInit {

  private _unsubscribeAll = new Subject<void>();
  public dataCharacters: CharacterDataContainer | null = null;
  formFilter!: FormGroup;

  orderBySelect = new FormControl('none');
  orderBySelectType = new FormControl('none');
  filterSelect = new FormControl('');

  constructor(
    private _store: Store,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.monitoringState();
    this.createForm();
    this.monitoringFilter();
  }

  monitoringFilter() {
    this.orderBySelect.valueChanges
      .subscribe((orderBySelect: any) => {
        if (orderBySelect === 'name') {
          if (this.orderBySelectType.getRawValue() === 'descending' || this.orderBySelectType.getRawValue() === 'Z-A') {
            this.orderBySelectType.setValue("Z-A", { emitEvent: false });
          } else {
            this.orderBySelectType.setValue("A-Z", { emitEvent: false });
          }
        } else if (orderBySelect === 'modified') {
          if (this.orderBySelectType.getRawValue() === 'descending' || this.orderBySelectType.getRawValue() === 'Z-A') {
            this.orderBySelectType.setValue("descending", { emitEvent: false });
          } else {
            this.orderBySelectType.setValue("ascending", { emitEvent: false });
          }
        } else {
          this.orderBySelectType.setValue("none", { emitEvent: false });
        }
        this.filter();
      });

    this.orderBySelectType.valueChanges
      .subscribe(_ => {
        this.filter();
      });
  }

  monitoringState() {
    this._store.select(MainState.dataCharacter)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data: CharacterDataContainer | null) => {
        this.dataCharacters = data;
      });
  }

  createForm() {
    this.formFilter = this.fb.group({
      filterSelect: this.filterSelect,
      orderBySelectType: this.orderBySelectType,
      orderBySelect: this.orderBySelect
    })
  }

  filter() {
    const controls: any = this.formFilter.controls;
    const filter: PersonagensFilter = new PersonagensFilter(
      undefined,
      controls?.filterSelect?.value,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      (controls.orderBySelectType?.value === 'Z-A' || controls.orderBySelectType?.value === 'descending' ? '-' : '') + (controls.orderBySelect?.value === 'none' ? '' : controls.orderBySelect?.value)
    );
    this._store.dispatch(new CarregarPersonagensMarvelApi(filter));
  }

  openDetail(character: ComicsResultCharacter) {
    const refDialog = this.dialog.open(DialogCharactersDatailComponent, {
      width: '95%',
      minWidth: '200px',
      data: {
        character
      }
    });
  }

}
