import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SuperheroesService } from '../../services/superheroes.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalEditComponent } from './components/modal-edit/modal-edit.component';
import { AlertService } from 'src/app/services/alert.service';
import { Superheroe } from '../../interfaces/superheroe';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, AfterViewInit {

  faEdit = faEdit;
  faTrash = faTrash;

  superheroes: Superheroe[] = [];
  selectedSuperheroe: Superheroe = null;

  displayedColumns: string[] = ['nombre', 'descripcion'];
  dataSource: MatTableDataSource<Superheroe>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    private _superheroesService: SuperheroesService,
    private _alertService: AlertService,
    private _notificationsService: NotificationsService,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource(this.superheroes);
  }

  ngOnInit(): void {
    this.getSuperheroes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  getSuperheroes() {
    this._superheroesService.getSuperheroes().subscribe((superheroes: Superheroe[]) => {
      this.superheroes = superheroes;
      this.dataSource.data = this.superheroes;
    });
  }
  
  selectSuperheroe(superheroe: Superheroe) {
    this.selectedSuperheroe = superheroe;
  }

  delete() {
    if (!this.selectedSuperheroe) {
      this._notificationsService.showNotification('¡Seleccione un superhéroe para borrar!');
      return;
    }
    this._alertService.showQuestion(`¿Estás seguro que deseas eliminar el superhéroe ${ this.selectedSuperheroe.nombre }?`, () => {
      this._superheroesService.deleteSuperheroe(this.selectedSuperheroe.id).subscribe(() => {
        this._notificationsService.showNotification(`¡${ this.selectedSuperheroe.nombre } eliminado de la lista de superhéroes!`);
        this.getSuperheroes();
      });
    });
  }

  edit() {
    if (!this.selectedSuperheroe) {
      this._notificationsService.showNotification('¡Seleccione un superhéroe para editar!');
      return;
    }
    this.dialog
      .open(ModalEditComponent, {
        width: '60vw',
        height: '60vh',
        data: {
          superheroe: this.selectedSuperheroe
        }
      })
      .afterClosed().subscribe((superheroe: Superheroe) => {
        if (superheroe) {
          this._superheroesService.editSuperheroe(superheroe).subscribe(() => {
            this._notificationsService.showNotification(`¡${ this.selectedSuperheroe.nombre } editado correctamente!`);
            this.getSuperheroes();
          });
        }
      });
  }

  filter(text: string) {
    if (!text) {
      this.dataSource.data = this.superheroes;
      return;
    }
    this.dataSource.data = this.superheroes.filter(superheroe => superheroe.nombre.toLowerCase().includes(text.toLowerCase()));
  }

  setPage(evt: any) {
    this.selectedSuperheroe = undefined;
  }

}
