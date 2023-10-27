import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import './index.css';
import Home from './pages/Home'
import Create from './pages/create'
import store from './app/store'

const Routing = () => {
  return (<Routes>
      <Route exact path="/" element={<Home/>} />
      <Route path="/new" element={<Create/>} />
    </Routes>)
}

function App() {
  return (<BrowserRouter>
      <Provider  store={store}>
        <Routing/>
      </Provider>
    </BrowserRouter>)
}

export default App;
