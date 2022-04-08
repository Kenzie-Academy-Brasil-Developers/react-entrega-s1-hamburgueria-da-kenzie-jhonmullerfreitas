import { useEffect, useState } from 'react';
import './App.css';
import ProductsList from './components/ProductsList';
import Cart from './components/Cart';

function App() {

  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showFilter, setShowFilter] = useState(false)
  const [currentSale, setCurrentSale] = useState([])
  const [cartTotal, setCartTotal] = useState(0)
  const [busca, setBusca] = useState("")

  useEffect(()=>{
    fetch("https://hamburgueria-kenzie-json-serve.herokuapp.com/products").then(res => res.json()).then(res => setProducts(res)).catch(err => console.log(err));
  }, [])


  function handleClick(productId){
    const productAdd = products.find((item)=> item.id === productId)
    setCurrentSale([...currentSale, productAdd])
    setCartTotal(cartTotal + productAdd.price)
  }

  function remove(productId){
    console.log(productId);
    const productAdd = currentSale.filter((item, index)=> index !== productId)
    // console.log(productAdd)
    const total = productAdd.reduce((cont, prox)=> cont + prox.price,0)
    setCurrentSale(productAdd)
    setCartTotal(total)
  }

  function showProducts(){

  
    setShowFilter(true)
    const filtrado = products.filter((item)=> item.category === busca);
    const pornome = products.filter((item)=> item.name === busca);
    if(filtrado.length !== 0){
      setFilteredProducts(filtrado)
    }else if(pornome.length !== 0){
      setFilteredProducts(pornome)
    }else{
      setShowFilter(false)
    }
  }
  
  console.log(currentSale);
  // console.log(cartTotal)

  return (
    <div className="App">


      <div className='cabecalho-filtro'>

        <p className='burguer'>Burguer<span className='kenzie'>Kenzie</span> </p>

        <form className='formulario' onSubmit={(e)=> e.preventDefault()} >
            <input type="text" placeholder="Digitar pesquisa" value={busca} onChange={(event)=> setBusca(event.target.value)} ></input>
            <button onClick={()=> showProducts() } >Pesquisar</button>
        </form>

      </div>

      <div>
      {
        showFilter ?  <ProductsList products={filteredProducts} callback={handleClick} /> : <ProductsList products={products} callback={handleClick} />
      }
      </div>

      <Cart currentSales={currentSale} setCurrentSales={setCurrentSale} total={cartTotal} callback={remove} />
      {/* <p>R$ {cartTotal.toFixed(2)}</p> */}
      
    </div>
  );
}

export default App;
