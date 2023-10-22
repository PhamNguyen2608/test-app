

import { Component, Inject } from '@angular/core';
import * as wjGrid from '@grapecity/wijmo.grid';
import { DataService, DataItem } from './app-data';
import * as wjCore from '@grapecity/wijmo';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    data: DataItem[];

    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
    }

    onInitialized(grid: wjGrid.FlexGrid) {
      // create extra header row
      var extraRow = new wjGrid.Row();
      extraRow.allowMerging = true;
      //
      // add extra header row to the grid
      var panel = grid.columnHeaders;
      panel.rows.splice(0, 0, extraRow);
  
      for (let colIndex = 1; colIndex <= 2; colIndex++) {
          panel.setCellData(0, colIndex, 'Amounts');
      }
      //
      // merge "Country" and "Active" headers vertically
      ['country', 'active'].forEach(function (binding) {
          let col = grid.getColumn(binding);
          col.allowMerging = true;
          panel.setCellData(0, col.index, col.header);
      });
      //
      // center-align merged header cells
      grid.formatItem.addHandler(function (s: wjGrid.FlexGrid, e: wjGrid.FormatItemEventArgs) {
        if (e.panel == s.columnHeaders && e.range.row == 0 && (e.col == 1 || e.col == 2)) {
            wjCore.addClass(e.cell, 'centered-content');
        }
    });
    
  }
}
