import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from '../../../../services/alert.service';
import { Superheroe } from '../../../../interfaces/superheroe';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalEditComponent implements OnInit {

  faEdit = faEdit;

  superheroe: Superheroe;
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.superheroe = this.data.superheroe;
    this.form = new FormGroup({
      id: new FormControl(this.superheroe.id),
      nombre: new FormControl(this.superheroe.nombre, [Validators.required]),
      descripcion: new FormControl(this.superheroe.descripcion, [Validators.required])
    });
  }

  save() {
    if (this.form.invalid) {
      this._alertService.showError('Error en el formulario', 'Faltan campos por completar');
      return;
    }
    this.dialogRef.close(this.form.value);
  }

}
