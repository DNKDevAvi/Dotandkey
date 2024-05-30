import './App.css';
import Banner from './banner/Banner'
import Header from './header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Product from './home/Product'
function App() {
  return (
    <div className="App">
      <Header />
      <Banner />
      <Product />
    </div>
  );
}

export default App;
