interface DepartureTime {
    timePlanned: string;
    timeReal: string;
    countdown: number;
}

interface Vehicle {
    name: string;
    towards: string;
    direction: string;
    platform: string;
    richtungsId: string;
    barrierFree: boolean;
    realtimeSupported: boolean;
    trafficjam: boolean;
    type: string;
    attributes: any;
    linienId: number;
}

interface Departure {
    departureTime: DepartureTime;
    vehicle?: Vehicle;
}

interface Line {
    name: string;
    towards: string;
    direction: string;
    platform: string;
    richtungsId: string;
    barrierFree: boolean;
    realtimeSupported: boolean;
    trafficjam: boolean;
    departures: {
        departure: Departure[];
    };
    type: string;
    lineId: number;
}

interface LocationStop {
    type: string;
    geometry: {
        type: string;
        coordinates: number[];
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
    lines: Line[];
    attributes: any;
}

interface Status {
    url: string;
    content_type: string;
    http_code: number;
    response_time: number;
    content_length: number;
}

export interface Data {
    monitors: {
        locationStop: LocationStop;
    }[];
}

interface Message {
    value: string;
    messageCode: number;
    serverTime: string;
}

export interface ResponseData {
    contents: string;
    status: Status;
    data: Data;
    message: Message;
}