import './App.css';
import {Monitor} from "./Monitor/Monitor.tsx";

if('serviceWorker' in navigator){
  navigator.serviceWorker
      .register('/sw.js')
      .then(function(){
        console.log('Service worker registered!');
      })
      .catch(function(error){
        console.log(error);
      })
}

window.addEventListener('beforeinstallprompt', function (event) {
  console.log('beforeinstallprompt fired');
  event.preventDefault();
  return false;
});

function App() {
  return (<Monitor/>)
}

export default App
