type ReportConfigurationsType = {
    [key: string]: {
        mergedColumns?: {
            start: number;
            end: number;
            label: string;
        };
        hasTotal?: boolean;
    }
};

export const reportConfigurations: ReportConfigurationsType = {
    'bao-cao-tram-phong-may': {
        mergedColumns: {
            start: 3,
            end: 12,
            label: 'Số lượng thiết bị'
        },
        hasTotal: true,
    },
    'bao-cao-tu-thiet-bi': {
        mergedColumns: {
            start: 3,
            end: 14,
            label: 'Chi tiết số lượng trạm'
        },
        hasTotal: true,
    }
};
