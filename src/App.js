import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Provider } from "react-redux";
import './index.css';
import Home from './pages/Home'
import store from './app/store'

const Routing = () => {
  return (<Routes>
      <Route exact path="/" element={<Home/>} />
    </Routes>)
}

function App() {
  return (<BrowserRouter>
      <Provider  store={store}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routing/>
      </Provider>
    </BrowserRouter>)
}

export default App;
