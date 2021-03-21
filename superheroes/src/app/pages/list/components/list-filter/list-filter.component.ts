import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'list-filter',
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.css']
})
export class ListFilterComponent {

  faSearch = faSearch;

  @Output() sendText: EventEmitter<string> = new EventEmitter<string>();

  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      text: new FormControl('')
    });
  }

  search() {
    const text = this.form.get('text')?.value;
    this.sendText.next(text);
  }

}
