import Product from "../Product";
import "./productList.css"
function ProductsList({products, callback}){

    return(
        <div>
            
            <ul className="lista-produtos" >
                {products.map((item, index) => <Product item={item} key={index} callback={callback} /> )}
            </ul>
            
        </div>
    )
}

export default ProductsList;