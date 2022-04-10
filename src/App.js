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
    let n;
    for(let i=0; i<currentSale.length; i++){
      if(currentSale[i].id === Number(productId)){
        n = i;
      }
    }

    const newList = []
    for(let j=0; j<currentSale.length; j++){
      if(j !== n){
        newList.push(currentSale[j])
      }
    }

    const total = newList.reduce((cont, prox)=> cont + prox.price,0)
    setCurrentSale(newList)
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
  
  

  return (
    <div className="App">
      <div className='cabecalho-filtro'>

        <p className='burguer' onClick={()=>setShowFilter(false)} >Burguer<span className='kenzie'>Kenzie</span> </p>

        <form className='formulario' onSubmit={(e)=> e.preventDefault()} >
            <input type="text" placeholder="Digitar pesquisa" value={busca} onChange={(event)=> setBusca(event.target.value)} ></input>
            <button onClick={()=> showProducts() } >Pesquisar</button>
        </form>

      </div>
      <div className='products-and-cart'>
        <div>
          {showFilter? <span className='resultado-busca'>Resultados para: <span>{busca}</span></span> : <span></span> }
          {
            showFilter ?  <ProductsList products={filteredProducts} callback={handleClick} /> : <ProductsList products={products} callback={handleClick} />
          }
        </div>
        <Cart products={products} currentSales={currentSale} setCurrentSales={setCurrentSale} total={cartTotal} callback={remove} setCartTotal={setCartTotal} />
      </div>

    
    </div>
  );
}

export default App;
