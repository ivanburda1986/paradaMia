import {FC} from 'react';
import {useConnections} from "./useConnections.ts";
import {MonitorConnection} from "./MonitorConnection/MonitorConnection.tsx";
import styles from './Monitor.module.css'
export const Monitor: FC = () => {
    const {stopMonitors} = useConnections(45);

    return (
        <div className={`${styles.monitor}`}>
            <section className={`${styles.headers} d-flex justify-content-between align-items-center px-1`}><p>Linie</p><p>Abfahrt in Minuten</p></section>
            {stopMonitors?.connections.map((connection)=><MonitorConnection key={`${connection.name}-${connection.nextCounter}`} connection={connection}/>)}
        </div>
    );
};

