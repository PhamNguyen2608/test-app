import { Component, Inject } from '@angular/core';
import { DataService, DataItem } from './app-data';
import { reportConfigurations } from './report-config';
import * as wjGrid from '@grapecity/wijmo.grid';

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
            const config = reportConfigurations[this.reportName];
            this.headers = Object.keys(this.data[0]).map(data => {
                const displayName = config.columnRenameMap?.[data] || data;
                return {
                    binding: data,
                    header: displayName.charAt(0).toUpperCase() + displayName.slice(1),
                    allowMerging: config?.mergedColumns && data === config.mergedColumns.label
                };
            });
        }
        
        
        
        console.log('Generated Headers:', this.headers);
    }

    onInitialized(grid: wjGrid.FlexGrid): void {
        const config = reportConfigurations[this.reportName];
        const panel = grid.columnHeaders;
    
        if (config) {
            // Horizontal column merging logic
            if (config.mergedColumns) {
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
            
            // Vertical column merging logic (ADD THIS)
            if (config.verticalMergedColumns) {
                config.verticalMergedColumns.forEach(function(binding) {
                    let col = grid.getColumn(binding);
                    if (col) {
                        col.allowMerging = true;
                        panel.setCellData(0, col.index, col.header);
                    }
                });
            }
        }
    }
    
}
