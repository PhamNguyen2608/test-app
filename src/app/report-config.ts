import { DataService, DataItem } from './app-data';
const dataService = new DataService();
const sampleData = dataService.getData()[0];
const allFields = Object.keys(sampleData) as (keyof DataItem)[];
type ReportType = {
    [key: string]: {
        mergedColumns?: {
            start: number;
            end: number;
            label: string;
        };
        verticalMergedColumns?: (keyof DataItem)[];
        hasTotal?: boolean;
        columnRenameMap?: { [key: string]: string };
    }
};



export const reportConfigurations: ReportType = {
    'bao-cao-tram-phong-may': {
        mergedColumns: {
            start: 3,
            end: 12,
            label: 'Số lượng thiết bị'
        },
        verticalMergedColumns: ['STT'], 
        hasTotal: true,
        columnRenameMap: {
            'Location': 'Vị trí ',
        }
    },
    'bao-cao-tu-thiet-bi': {
        mergedColumns: {
            start: 3,
            end: 14,
            label: 'Chi tiết số lượng trạm'
        },
        hasTotal: true,
        verticalMergedColumns: ['STT','Location','Quantity', 'Notice'], 
        columnRenameMap: {
            'Location': 'Vị trí trạm ngoài đường truyền',
            'Quantity': 'Số lượng vị trí',
            'Notice' : 'Ghi chú'
        }
    }
};

