import './index.css'; 
import { Navbar } from './components/navbar/Navbar';
import Products from './components/product/Products';
import ProductDetail from './components/product-detail/ProductDetail';

function App() {
  return (
    <>
      <Navbar />
      <Products />
      <ProductDetail/>
    </>
  );
}

export default App;