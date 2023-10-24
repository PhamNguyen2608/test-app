import { Injectable } from '@angular/core';

export interface DataItem {
    
    STT: string;
    Location: string;
    Quantity: number;
    NPC: number;
    SPC: number;
    CPC: number;
    HN: number;
    HCM: number;
    Gen1: number;
    Gen2: number;
    Gen3: number;
    NPT: number;
    ICT: number;
    EVN: number;
    OutEVN: number;
    Notice: string;
  
}

@Injectable()
export class DataService {
    getData(): DataItem[] {
        var locations = ['Trạm 500kV', 'Trạm 220kV', 'Trạm 110kV', 'Trạm 35kV','T - Nhiệt điện','SP - Điện mặt trời','W - Điện gió','Trạm lặp','Điều độ','ĐHTQ','TTĐKX','Cơ quan','Khác'];
        var data = [];
        for (var i = 0; i < 15; i++) {
            data.push({
                STT: (i + 1).toString(),
                Location: locations[i % locations.length],
                Quantity: Math.round(Math.random() * 100),
                NPC: Math.round(Math.random() * 10),
                SPC: Math.round(Math.random() * 10),
                CPC: Math.round(Math.random() * 10),
                HN: Math.round(Math.random() * 10),
                HCM: Math.round(Math.random() * 10),
                Gen1: Math.round(Math.random() * 10),
                Gen2: Math.round(Math.random() * 10),
                Gen3: Math.round(Math.random() * 10),
                NPT: Math.round(Math.random() * 10),
                ICT: Math.round(Math.random() * 10),
                EVN: Math.round(Math.random() * 10),
                OutEVN: Math.round(Math.random() * 10),
                Notice: 'None'
            });
        }
        return data;
    }
}
