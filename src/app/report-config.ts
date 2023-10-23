import { DataService, DataItem } from './app-data';
const allFields = Object.keys(DataItem.prototype) as (keyof DataItem)[];
type ReportConfigurationsType = {
    [key: string]: {
        mergedColumns?: {
            start: number;
            end: number;
            label: string;
        };
        verticalMergedColumns?: string[];
        hasTotal?: boolean;
        columnRenameMap?: { [key: string]: string };
    }
};



export const reportConfigurations: ReportConfigurationsType = {
    'bao-cao-tram-phong-may': {
        mergedColumns: {
            start: 3,
            end: 12,
            label: 'Số lượng thiết bị'
        },
        verticalMergedColumns: ['STT'], 
        hasTotal: true,
        columnRenameMap: {
            'Location': 'Vị trí',
        }
    },
    'bao-cao-tu-thiet-bi': {
        mergedColumns: {
            start: 3,
            end: 14,
            label: 'Chi tiết số lượng trạm'
        },
        hasTotal: true,
        columnRenameMap: {
            'Location': 'Vị trí',
        }
    }
};

