const productDetails =(props)=>{
    const {product}=props;
    return(
        <div className="card mb-2 ms-2">
        <img src={product.image} className="card-img-top imgover" alt="..."/>
        <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
    </div>
    )
}

export async function getServerSideProps({params:{id}}) {
    const res=await fetch(`http://localhost:3000/api/product/${id}`)
    const data= await res.json()
    return {
        props: {
            product: data
        }
    }
    
}
export default productDetails;