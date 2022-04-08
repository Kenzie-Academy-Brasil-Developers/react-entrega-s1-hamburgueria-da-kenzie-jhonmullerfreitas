
import "./product.css"

function Product({item, callback}){

    

    return(
        
        <li className="card-produto" id={item.id}>
            <div className="box-img">
            <img src={item.img} alt={item.name} />
            </div>
            <div className="box-produto">
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>R$ {item.price.toFixed(2)}</p>
                <button onClick={()=> callback(item.id)} >Adicionar</button>
            </div>
        </li>
        
    )
}

export default Product;