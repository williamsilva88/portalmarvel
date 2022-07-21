import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Subject, takeUntil } from 'rxjs';
import { CharacterDataContainer, ComicsResultCharacter, PersonagensFilter } from 'src/app/model/comics.model';
import { CarregarPersonagensMarvelApi } from 'src/app/state/main.actions';
import { MainState } from 'src/app/state/main.state';

@Component({
  selector: 'app-personagens',
  templateUrl: './personagens.component.html',
  styleUrls: ['./personagens.component.scss']
})
export class PersonagensComponent implements OnInit {

  private _unsubscribeAll = new Subject<void>();
  public dataCharacters: CharacterDataContainer | null = null;
  formFilter!: FormGroup;

  constructor(
    private _store: Store,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.monitoringState();
    this.createForm();
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
      filter: ['']
    })
  }

  filter() {
    const controls: any = this.formFilter.controls;
    const filter: PersonagensFilter = new PersonagensFilter('', controls?.filter?.value);
    this._store.dispatch(new CarregarPersonagensMarvelApi(filter));
  }

}
