import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  loading: boolean = false;

  constructor(
    private _loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this._loaderService.isLoading.subscribe((loading: boolean) => {
      this.loading = loading;
    });
  }

}
