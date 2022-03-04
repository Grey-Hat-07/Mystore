const productDetails = (props) => {
    const { product } = props;
    return (
        <div className="row container">
            <div className="col-md-6">
                <img src={product.image} className="card-img-top" alt={product.name} height="400" />
            </div>
            <div className="col-md-6">
                <h3>{product.name}</h3>
                {/* <p className='text-muted'>{products[productid - 1].category}</p> */}

                <p>₹{product.price}</p>
                {/* <p>⭐{products[productid - 1].rating.rate}&emsp;
                    {products[productid - 1].rating.count} Ratings</p>*/}
                <p>{product.description}</p> 
            </div>
        </div>
    )
}

export async function getServerSideProps({ params: { id } }) {
    const res = await fetch(`http://localhost:3000/api/product/${id}`)
    const data = await res.json()
    return {
        props: {
            product: data
        }
    }

}
export default productDetails;