import * as wjCore from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';

import { Component, Inject } from '@angular/core';
import { DataService, DataItem } from './app-data';
import { reportConfigurations } from './report-config'; // Đảm bảo rằng đường dẫn này chính xác

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    data: DataItem[];
    headers: any[] = [];
    reportName = 'bao-cao-tu-thiet-bi'; 

    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
        
        if (this.data.length && reportConfigurations[this.reportName]) {
            const config = reportConfigurations[this.reportName];
            this.headers = config.headers.map(header => {

                return {
                    binding: header,
                    header: header.charAt(0).toUpperCase() + header.slice(1),
                    allowMerging: header === config.mergedColumns.label
                };
            });
        }
    }

    onInitialized(grid: wjGrid.FlexGrid) {
        const config = reportConfigurations[this.reportName];
        if (config) {
            // create extra header row
            var extraRow = new wjGrid.Row();
            extraRow.allowMerging = true;

            // add extra header row to the grid
            var panel = grid.columnHeaders;
            panel.rows.splice(0, 0, extraRow);

            // apply mergedColumns from config
            for (let i = config.mergedColumns.start; i <= config.mergedColumns.end; i++) {
                let col = grid.columns[i];
                if (col) {
                    col.allowMerging = true;
                }
                panel.setCellData(0, i, config.mergedColumns.label);
            }

            grid.formatItem.addHandler(function (s: wjGrid.FlexGrid, e: wjGrid.FormatItemEventArgs) {
                if (e.panel == s.columnHeaders && e.range.rowSpan > 1) {
                    var html = e.cell.innerHTML;
                    e.cell.innerHTML = '<div class="v-center">' + html + '</div>';
                }
            });
        }
    }
}
