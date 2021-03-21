import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  showNotification(message: string, callback?: Function) {
    this._snackBar.open(message, 'Aceptar', {
      duration: 3500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    }).afterDismissed().subscribe(() => {
      callback;
    });
  }

}
