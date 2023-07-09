import {useEffect, useState} from 'react';

const GET_STOP_DATA = 'https://api.allorigins.win/get?url=http://www.wienerlinien.at/ogd_realtime/monitor?stopId='


interface StopMonitorFull {
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
            attributes?: {
                rbl?: number;
            };
        };
    };
    lines: {
        name: string;
        towards: string;
        direction: string;
        platform: string;
        richtungsId: string;
        barrierFree: boolean;
        realtimeSupported: boolean;
        trafficjam: boolean;
        departures: {
            departure: {
                departureTime: {
                    timePlanned: string;
                    timeReal?: string;
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
            }[];
        };
        type: string;
        lineId: number;
    }[];
    attributes: Record<string, any>;
}


export interface Connection{
    name: string;
    towards: string;
    departures:number[];
    barrierFree:boolean;
    trafficJam: boolean;
    nextCounter:number;
}

interface StopInfo{
    title:string;
}

interface StopMonitor{
    stopInfo: StopInfo;
    connections: Connection[];
}

interface HookResult{
    stopMonitors:StopMonitor|undefined;
    httpCode:string|null;
}


const getMonitors = (stopMonitorData: StopMonitorFull[]):StopMonitor =>{
    const finalData:StopMonitor = {
        stopInfo:{
        title: "unknown"
        },
        connections: []
    };
    const monitors = stopMonitorData.map((monitorItem) => (
        {
            stopInfo: {
                title: monitorItem.locationStop.properties.title},
            lines: monitorItem.lines.filter(({type})=>type==="ptTram").map(({name, towards, barrierFree,departures, trafficjam}) => ({
                name,
                towards,
                departures: departures.departure.map(departure => departure.departureTime.countdown),
                barrierFree,
                trafficJam: trafficjam,
                nextCounter: departures.departure[0].departureTime.countdown
            }))
        }
    ))
    finalData.stopInfo.title = monitors[0].stopInfo.title;
    monitors.forEach((monitor)=>finalData.connections.push(...monitor.lines))
    finalData.connections.sort((a,b)=>a.nextCounter-b.nextCounter)
    return finalData;
}



export const useConnections = (stopNumber:number):HookResult => {
     const [stopMonitors, setStopMonitors] = useState<StopMonitor|undefined>();
     const [httpCode, setHttpCode] = useState(null);

     useEffect(() => {
         const fetchData = async () => {
             try {
                 const response = await fetch(`${GET_STOP_DATA}${stopNumber}`, {
                     method: 'GET',
                     headers: {
                         Accept: 'application/json',
                         'Content-Type': 'application/json',
                     },
                 });

                 if (!response.ok) {
                     throw new Error('Network problem has occurred');
                 }

                 const data = await response.json();
                 const parsedData = JSON.parse(data.contents);
                 setStopMonitors(getMonitors(parsedData.data.monitors));
                 setHttpCode(data.status.http_code);
             } catch (error) {
                 console.error('Error fetching data:', error);
             }
         };

         fetchData();
     }, [stopNumber]);

     return { stopMonitors, httpCode };
 };

