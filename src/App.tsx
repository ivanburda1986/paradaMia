import './App.css';
import {useConnections} from "./useConnections.ts";
import {MonitorConnection} from "./Monitor/MonitorConnection/MonitorConnection.tsx";

function App() {
  const {stopMonitors, httpCode} = useConnections(45);
  console.log(stopMonitors);
  console.log(httpCode);
  return (
<div>{stopMonitors?.connections.map((connection)=><MonitorConnection connection={connection}/>)}</div>  )
}

export default App
