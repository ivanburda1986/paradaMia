export interface ServerResponse {
    contents: {
        data: {
            monitors: MonitorItem[];
        };
    };
    status: {
        url: string;
        content_type: string;
        http_code: number;
        response_time: number;
        content_length: number;
    };
}

interface MonitorItem {
    locationStop: {
        type: string;
        geometry: {
            type: string;
            coordinates: [number, number];
        };
        properties: {
            name: string;
            title: string;
            municipality: string;
            municipalityId: number;
            type: string;
            coordName: string;
            attributes: {
                rbl: number;
            };
        };
    };
    lines: LineItem[];
    attributes: Record<string, any>;
}

interface LineItem {
    name: string;
    towards: string;
    direction: string;
    platform: string;
    richtungsId: string;
    barrierFree: boolean;
    realtimeSupported: boolean;
    trafficjam: boolean;
    departures: {
        departure: DepartureItem[];
    };
    type: string;
    lineId: number;
}

interface DepartureItem {
    departureTime: {
        timePlanned: string;
        timeReal: string;
        countdown: number;
    };
    vehicle?: {
        name: string;
        towards: string;
        direction: string;
        platform: string;
        richtungsId: string;
        barrierFree: boolean;
        realtimeSupported: boolean;
        trafficjam: boolean;
        type: string;
        attributes: Record<string, any>;
        linienId: number;
    };
}