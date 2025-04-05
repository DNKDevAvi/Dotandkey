import './App.css';
import Banner from './banner/Banner'
import Header from './header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Product from './home/Product'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Error from './error/Error';
import Home from './home/Home';
import Plp from './plp/Plp';
import Test from './Test';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <Test />

        {/* <Routes>
          <Route path = '/*' element={<Error />} />
          <Route path = '/' element={<Home />} />
          <Route path = '/collections/:name' element={<Plp />} />
        </Routes> */}
      </BrowserRouter>
    
    </div>
  );
}

export default App;
