import { Component } from '@angular/core';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  faList = faList;
  faUserPlus = faUserPlus;
  pageSize: string;

  constructor() { }

}
