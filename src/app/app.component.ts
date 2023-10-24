import { Component, Inject } from '@angular/core';
import { DataService, DataItem } from './app-data';
import { reportConfigurations } from './report-config';
import * as wjGrid from '@grapecity/wijmo.grid';
import  * as wjCore  from '@grapecity/wijmo';

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
            
           // Merge vertical column
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


    //Print 
     // Added print function
     printDoc(grid: wjGrid.FlexGrid) {
        // create PrintDocument
        let doc = new wjCore.PrintDocument({
            title: 'Báo cáo tủ-thiết bị',
            copyCss: false
        });
         // add CSS explicitly (since we can't use copyCss in jsfiddle)
        doc.append('<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">');
        doc.append('<link href="https://cdn.grapecity.com/wijmo/5.latest/styles/wijmo.min.css" rel="stylesheet">');
        
        // add some simple text
        doc.append('<h1>Báo cáo tủ-thiết bị</h1>');

        // add a printer-friendly version of the grid to the document
        let tbl = this._renderTable(grid);
        doc.append(tbl);

        // print the document
        doc.print();
    }

    private _renderTable(flex: wjGrid.FlexGrid): string {
        let tbl = '<table style="border: 0;">';
        
        // Render column headers
        if (flex.headersVisibility & wjGrid.HeadersVisibility.Column) {
            tbl += '<thead>';
            for (let r = 0; r < flex.columnHeaders.rows.length; r++) {
                tbl += this._renderRow(flex.columnHeaders, r);
            }
            tbl += '</thead>';
        }
        
        // Render rows
        tbl += '<tbody>';
        for (let r = 0; r < flex.rows.length; r++) {
            tbl += this._renderRow(flex.cells, r);
        }
        tbl += '</tbody>';
        
        tbl += '</table>';
        return tbl;
    }
    
    private _renderRow(panel: wjGrid.GridPanel, r: number): string {
        let tr = '';
        let row = panel.rows[r];
        
        if (row.renderSize > 0) {
            tr += '<tr style="border: 0;">';
            
            for (let c = 0; c < panel.columns.length; c++) {
                let col = panel.columns[c];
                
                if (col.renderSize > 0) {
                    let style = `width:${col.renderSize}px;text-align:${col.getAlignment()};padding-right:6px;border:0;`;
                    let content = panel.getCellData(r, c, true);
                    
                    if (!row.isContentHtml && !col.isContentHtml) {
                        content = wjCore.escapeHtml(content);
                    }
                    
                    if (panel.cellType === wjGrid.CellType.ColumnHeader) {
                        tr += `<th style="${style}">${content}</th>`;
                    } else {
                        let raw = panel.getCellData(r, c, false);
                        content = raw === true ? '&#9745;' : raw === false ? '&#9744;' : content;
                        tr += `<td style="${style}">${content}</td>`;
                    }
                }
            }
            tr += '</tr>';
        }
        
        return tr;
    }
    

    
}
