import { Component, OnDestroy, OnInit } from '@angular/core';
import * as alasql from 'alasql';
import { SubSink } from 'subsink';
import { ExcelFileServiceService } from './excel-file-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'excel-export-test';
  listData: any[] = [];
  peopleByCity: Object[] | undefined;
  subs = new SubSink();

  constructor(private excelService: ExcelFileServiceService) {
  }

  ngOnInit() {
    this.peopleByCity = [
      {
        city: 'Maplewood',
        people: [
          { name: 'Logan', age: 10 },
          { name: 'Laurel', age: 11 }
        ]
      },
      {
        city: 'South Orange',
        people: [
          { name: 'Shayna', age: 39 },
          { name: 'Bobbie', age: 70 }
        ]
      },
      {
        city: 'New York',
        people: [
          { name: 'Big Ray', age: 48 },
          { name: 'Med. Ray', age: 16 },
          { name: 'Weenie', age: 10 },
          { name: 'Fishy', age: 13 }
        ]
      }
    ];

    this.listData = [
      { name: 'Big Ray', age: 48 },
      { name: 'Med. Ray', age: 16 },
      { name: 'Weenie', age: 10 },
      { name: 'Fishy', age: 13 }
    ]
  }

  exportJson(): void {
    var res = alasql('SEARCH / AS @data \ people / AS @persons \ RETURN(@persons->name as Name, @persons->age as Age, @data->city AS City) \ FROM ?', [this.peopleByCity])

    this.excelService.exportAsExcelFile(res, 'PeopleByCity');
  }

  generateExport(){
    var res1 = alasql('SEARCH / AS @data \ RETURN( @data->name as Name, @data->age AS Age) \ FROM ?', [this.listData])

    this.excelService.exportAsExcelFile(res1, 'LlistData');
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
