import "./cart.css"

function Cart({currentSales, setCurrentSales,total, callback}){

    if(currentSales.length===0){
        return(
            <div className="box-carrinho">
                <div className="titulo-carrinho" ><span>Carrinho de compras</span></div>
                <div className="sacola-vazia">
                    <p>Sua sacola está vazia</p>
                    <p>Adicione itens</p>
                </div>
            </div>
        )
    }

    return(
        <div className="container">
            <div className="titulo-carrinho-cheio" ><span>Carrinho de compras</span></div>
            <ul className="box-carrinho">
                
                {
                currentSales.map((item, index)=> 
                
                <li className="li-cart" key={index} >
                    <img className="img-cart" src={item.img} alt={item.name} />
                    <div className="descricao-cart">
                        
                            <p> {item.name} </p>
                        
                        <p> {item.category} </p>
                    </div>
                    <span onClick={()=> callback(index)} >Remover</span>
                </li>       
                )}
            </ul>
            <hr></hr>
            <p className="total-produtos">
                <span>Total</span>
                <span>R$ {total.toFixed(2)}</span>
            </p>
            <button className="remover-todos" onClick={()=> setCurrentSales([])} >Remover todos</button>
        </div>
    )
}

export default Cart;