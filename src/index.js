import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './media_breaks.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import  { store } from './store';
import { BrowserRouter } from 'react-router-dom';


export default function setVisibility() {
  console.log('Hello');
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();

// export const withrouter(mycomponent)
// {ilo9gedinf == url ? <div></div> : <div>not loghin</div>}


// import store, {history} from 'store'
//look up create history and react-router documentation
// history.listen((location, action)=>{
// console.log(history);
// })