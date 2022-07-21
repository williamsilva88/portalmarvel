import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComicsResultCharacter } from 'src/app/model/comics.model';

export interface DialogCharactersDatailData {
  character: ComicsResultCharacter;
}

@Component({
  selector: 'app-dialog-characters-datail',
  templateUrl: './dialog-characters-datail.component.html',
  styleUrls: ['./dialog-characters-datail.component.scss']
})
export class DialogCharactersDatailComponent implements OnInit, DialogCharactersDatailData {

  character!: ComicsResultCharacter;

  constructor(
    public dialogRef: MatDialogRef<DialogCharactersDatailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogCharactersDatailData
  ) {
    this.character = data?.character;
  }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
