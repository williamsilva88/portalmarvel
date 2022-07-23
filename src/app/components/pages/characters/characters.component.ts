import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngxs/store';
import { Subject, takeUntil } from 'rxjs';
import { CharacterDataContainer, ComicsResultCharacter, PersonagensFilter } from 'src/app/model/comics.model';
import { AddFavorite, AddHate, CarregarPersonagensMarvelApi, RemoveFavorite } from 'src/app/state/main.actions';
import { MainState } from 'src/app/state/main.state';
import { DialogCharactersDatailComponent } from './dialog-characters-datail/dialog-characters-datail.component';

@Component({
  selector: 'app-personagens',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  private _unsubscribeAll = new Subject<void>();
  public dataCharacters: CharacterDataContainer | null = null;
  formFilter!: FormGroup;

  orderBySelect = new FormControl('none');
  orderBySelectType = new FormControl('none');
  filterSelect = new FormControl('');

  favorite: Array<ComicsResultCharacter> | null = null;

  paginatorLength = 0;
  paginatorPageSize = 0;
  paginatorPageSizeOptions: number[] = [5, 10, 25, 100];
  paginatorIndex = 0;

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

  handlePageEvent(event: PageEvent) {
    this.paginatorIndex = event.pageIndex ? event.pageIndex : 0;
    this.paginatorPageSize = event.pageSize ? event.pageSize : 20;
    event
    this.filter();
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
        this.paginatorPageSize = this.dataCharacters?.limit ? this.dataCharacters?.limit : 10;
        this.paginatorLength = this.dataCharacters?.total ? this.dataCharacters?.total : 0;
      });

    this._store.select(MainState.favorite)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data: ComicsResultCharacter[] | null) => {
        console.log("favorite:", data);
        this.favorite = data;
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
    const filter: PersonagensFilter = new PersonagensFilter();
    filter.nameStartsWith = controls?.filterSelect?.value;
    filter.orderBy = ((controls.orderBySelectType?.value === 'Z-A' || controls.orderBySelectType?.value === 'descending' ? '-' : '') + (controls.orderBySelect?.value === 'none' ? '' : controls.orderBySelect?.value));
    filter.limit = this.paginatorPageSize;
    filter.offset = (this.paginatorIndex * this.paginatorPageSize);
    this._store.dispatch(new CarregarPersonagensMarvelApi(filter));
  }

  openDetail(character: ComicsResultCharacter) {
    const refDialog = this.dialog.open(DialogCharactersDatailComponent, {
      width: '100%',
      minWidth: '200px',
      maxWidth: '95vw',
      data: {
        character
      }
    });

    const instance = refDialog.componentInstance.actionRemoveFavorite
      .subscribe((character: ComicsResultCharacter) => {
        this.removeFavorite(character);
        refDialog.close();
      });

    refDialog.afterClosed().subscribe(() => {
      instance.unsubscribe();
    });
  }



  addFavorite(character: ComicsResultCharacter) {
    this._store.dispatch(new AddFavorite(character));
  }

  removeFavorite(character: ComicsResultCharacter) {
    this._store.dispatch(new RemoveFavorite(character));
  }

  addHate(character: ComicsResultCharacter) {
    this._store.dispatch(new AddHate(character));
  }

  getLengthFavorite() {
    if (this.favorite?.length)
      return this.favorite?.length > 0 ? true : false;

    return false;
  }
}
