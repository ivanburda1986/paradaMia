import {FC} from 'react';
import {Connection} from "../useConnections.ts";
import styles from './Monitorconnection.module.css'

interface Props{
    connection: Connection;
}

export const MonitorConnection: FC<Props> = ({connection:{name,towards,barrierFree,trafficJam,nextCounter}}) => (
  <div className={`${styles.monitorConnection} d-flex flex-row justify-content-between align-items-center py-1 px-1 w-100`}>
      <section className={`${styles.monitorLeft} d-flex flex-row justify-content-center align-items-center col-2`}>
          <section className="py-1 px-3">{name}</section>
          <section className="p-1">{barrierFree}</section>
      </section>
      <section className="d-flex flex-column justify-content-center align-items-center col-8 monitor-middle">
          <section className="text-start">{towards}</section>
          <section className="jam">{trafficJam}</section>
      </section>
      <section className="d-flex flex-column justify-content-between align-items-center col-2 monitor-right">{nextCounter}</section>
  </div>
);