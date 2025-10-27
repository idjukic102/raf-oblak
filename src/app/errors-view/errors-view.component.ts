import { Component, OnInit } from '@angular/core';
import { ErrorService } from '../services/error.service';
import { Error } from '../model';

@Component({
  selector: 'app-errors-view',
  templateUrl: './errors-view.component.html',
  styleUrls: ['./errors-view.component.css'],
})
export class ErrorsViewComponent implements OnInit {
  errors: Error[] = [];
  constructor(private errorService: ErrorService) {}
  ngOnInit(): void {
    this.errorService.getErrors().subscribe((e) => (this.errors = e));
  }
}
