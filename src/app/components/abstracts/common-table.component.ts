import { Component, OnInit, input, effect } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  template: '',
})
export abstract class CommonMaterialTableComponent<T> {
  public dataSource: MatTableDataSource<T>;
  public data = input.required<T[]>();
  public columns = input.required<string[]>();

  public displayedColumns: string[];

  constructor() {
    effect(() => {
      (this.dataSource.data = this.data()), (this.displayedColumns = this.columns());
    });
    this.dataSource = new MatTableDataSource<T>();
  }
}
