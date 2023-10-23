type ReportConfigurationsType = {
    [key: string]: {
        headers: string[];
        mergedColumns: {
            start: number;
            end: number;
            label: string;
        };
        hasTotal: boolean;
    }
};
export const reportConfigurations:ReportConfigurationsType = {
    'bao-cao-tram-phong-may': {
        headers: [
            'STT',
            'Vị trí trạm',
            'số lượng vị trí',
            'số lượng thiết bị',
            'PBX',
            'PCM',
            'SDH',
            'WDM',
            'MTP',
            'OTN',
            'PWR',
            'CLK',
            'CVT',
            'TPN'
        ],
        mergedColumns: {
            start: 3,
            end: 12,
            label: 'số lượng thiết bị'
        },
        hasTotal: true,
    },
    'bao-cao-tu-thiet-bi': {
        headers: [
            'STT', 
            'Vị trí trạm',
            'Số Lượng',
            'Chi tiết số lượng trạm',
            'NPC',
            'HN',
            'CPC',
            'SPC',
            'HCM',
            'NPT',
            'Gen1',
            'Gen2',
            'Gen3',
            'ICT',
            'EVN',
            'Ngoài EVN',
            'Ghi chú'
        ],
        mergedColumns: {
            start: 3,
            end: 15,
            label: 'Chi tiết số lượng trạm'
        },
        hasTotal: true,
        
    }
};
