import * as wjCore from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';

import { Component, Inject } from '@angular/core';
import { DataService, DataItem } from './app-data';
import { reportConfigurations } from './report-config'; 
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
        this.data = this.dataService.getData();
        console.log('Loaded Data:', this.data); 
        if (this.data.length > 0) {
            this.headers = Object.keys(this.data[0]).map(key => {
                const config = reportConfigurations[this.reportName];
                return {
                    binding: key,
                    header: key.charAt(0).toUpperCase() + key.slice(1),
                    allowMerging: config?.mergedColumns && key === config.mergedColumns.label
                };
            });
        }
        console.log('Generated Headers:', this.headers); // log headers
        // console.log('Data:', this.data);
        // console.log('Headers:', this.headers);
    }

    onInitialized(grid: wjGrid.FlexGrid): void {
        const config = reportConfigurations[this.reportName];
        if (config && config.mergedColumns) {
            const panel = grid.columnHeaders;
            if (panel.rows.length <= 1) {
                // create extra header row
                const extraRow = new wjGrid.Row();
                extraRow.allowMerging = true;

                // add extra header row to the grid
                panel.rows.splice(0, 0, extraRow);
            }

            // apply mergedColumns from config
            for (let i = config.mergedColumns.start; i <= config.mergedColumns.end; i++) {
                const col = grid.columns[i];
                if (col) {
                    col.allowMerging = true;
                }
                panel.setCellData(0, i, config.mergedColumns.label);
            }

            grid.formatItem.addHandler((s: wjGrid.FlexGrid, e: wjGrid.FormatItemEventArgs) => {
                if (e.panel === s.columnHeaders && e.range.rowSpan > 1) {
                    e.cell.innerHTML = `<div class="v-center">${e.cell.innerHTML}</div>`;
                }
            });
        }
        // console.log('Data after initialization:', this.data);
        // console.log('Headers after initialization:', this.headers);
    }
}

