import {FC} from 'react';
import {Connection} from "../../useConnections.ts";
import './styles.module.css'
interface Props{
    connection: Connection;
}

export const MonitorConnection: FC<Props> = ({connection:{name,towards,barrierFree,trafficJam,nextCounter}}) => (
  <div className="monitorConnection">
      <section className="nameAndBarrierFree d-flex flex-column">
          <section className="name"><p>{name}</p></section>
          <section className="barrierFree">{barrierFree}</section>
      </section>
      <section className="destinationAndJam">
    <section className="destination">{towards}</section>
    <section className="jam">{trafficJam}</section>
      </section>
      <section className="time">{nextCounter}</section>
  </div>
);