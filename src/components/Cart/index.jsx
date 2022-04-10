import "./cart.css"

function Cart({products, currentSales, setCurrentSales,total, callback, setCartTotal}){

    if(currentSales.length===0){
        return(
            <div className="box-carrinho-vazio">
                <div className="titulo-carrinho">
                    <span>Carrinho de compras</span>
                </div>
                <div className="sacola-vazia">
                    <p>Sua sacola está vazia</p>
                    <p>Adicione itens</p>
                </div>
            </div>
        )
    }
    
    const arr = []
    function verificando(){
    
        for(let i=0; i<products.length; i++){
          let contador=0;
            for(let j=0; j<currentSales.length; j++){
              if(products[i].name === currentSales[j].name){
                contador++;
              }
            }
            if(contador>=1){
              const produto ={
                id: `${products[i].id}`,
                name: `${products[i].name}`,
                category: `${products[i].category}`,
                price: `${products[i].price}`,
                img: `${products[i].img}`,
                qtd: `${contador}`
              }
              arr.push(produto)
            }
        }

        if(arr.length>1){
            return(
                <div>
                    {arr.map((item, index)=> 
                        <li className="li-cart" key={index} >
                            <img className="img-cart" src={item.img} alt={item.name} />
                            <div className="descricao-cart">
                                <p> {item.name} </p>
                                <p> {item.category} </p>
                                <p> {item.qtd} </p>
                            </div>
                            <span onClick={()=> callback(item.id)} >Remover</span>
                        </li> 
                    )}
                </div>
            )
        }else if(arr.length===1){
            return(
                <div>
                {
                    arr.map((item, index)=> 
                        <li className="li-cart" key={index} >
                            <img className="img-cart" src={item.img} alt={item.name} />
                            <div className="descricao-cart">
                                <p> {item.name} </p>
                                <p> {item.category} </p>
                                <p> {item.qtd} </p>
                            </div>
                            <span onClick={()=> callback(item.id)} >Remover</span>
                        </li>       
                    )
                }
                </div>
            )
        }
    }

    function removeTodos(){
        setCurrentSales([])
        setCartTotal(0)
    }

    return(
        <div className="container">
            <div className="titulo-carrinho-cheio" ><span>Carrinho de compras</span></div>
            <ul className="box-carrinho">
                {verificando()}
            </ul>
            <hr></hr>
            <p className="total-produtos">
                <span>Total</span>
                <span>R$ {total.toFixed(2)}</span>
            </p>
            <div className="box-button">
                <button className="remover-todos" onClick={()=> removeTodos()} >Remover todos</button>
            </div>
        </div>
    )
}

export default Cart;