import {FC, useState} from 'react';
import {useConnections} from "./useConnections.ts";
import {MonitorConnection} from "./MonitorConnection/MonitorConnection.tsx";
import styles from './Monitor.module.css'

export const Monitor: FC = () => {
    const {stopMonitors} = useConnections(3431);
    const [monitors, setMonitors] = useState(stopMonitors);

    const handleMonitorClick = () => {
        console.log('Click');
        console.log(stopMonitors);
        setMonitors(stopMonitors)
    };

    return (
        <div>
            <button className={`${styles.stopShield} py-1`} onClick={handleMonitorClick}>Absberggasse</button>
            <div className={`${styles.monitor}`}>
                <section className={`${styles.headers} d-flex justify-content-between align-items-center px-1`}><p>Linie</p><p>Abfahrt in Minuten</p></section>
                {monitors?.connections.map((connection)=><MonitorConnection key={`${connection.name}-${connection.nextCounter}`} connection={connection}/>)}
            </div>
        </div>
    );
};

