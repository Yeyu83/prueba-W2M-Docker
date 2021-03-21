import { Component, Output, EventEmitter, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { SuperheroesService } from '../../services/superheroes.service';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddComponent implements OnInit {

  faUserPlus = faUserPlus;

  @ViewChild('input') input: ElementRef;

  @Output() sendAdd: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  constructor(
    private _superheroesService: SuperheroesService,
    private _alertService: AlertService,
    private _notificationsService: NotificationsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.setForm();
  }

  setForm() {
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required])
    });
  }

  setInputValue(value: string) {
    this.form.get('nombre').setValue(value);
  }

  add() {
    if (this.form.invalid) {
      this._alertService.showError('Error en el formulario', 'Faltan campos por completar');
      return;
    }
    this._superheroesService.addSuperheroe(this.form.value).subscribe(() => {
      this._notificationsService.showNotification(`¡${ this.form.get('nombre').value } añadido a la lista de superhéroes!`);
      this.router.navigate(['list']);
    });
  }

}
