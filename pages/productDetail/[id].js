import baseUrl from "../../helpers/baseUrl";
import { useRouter } from "next/router";
import { Addtocart, Delete } from "../../component/Icons";
const productDetails = (props) => {
    const { product } = props;
    const router = useRouter();
    if (router.isFallback) {
        return <h1 className="text-primary">Loading...</h1>
    }
    return (
        <div className="row container">
            <div className="col-md-6">
                <img src={product.image} className="card-img-top" alt={product.name} height="400" />
            </div>
            <div className="col-md-6">
                <h3>{product.name}</h3>
                {/* <p className='text-muted'>{products[productid - 1].category}</p> */}

                <p>₹{product.price}</p>
                <p>{product.description}</p>
                <div className="input-group mb-3">
                    <input type="number" className="form-control" min={1} />
                    <button className="btn btn-warning" type="button" id="button-addon1">
                        Addtocart<Addtocart /></button>
                </div>
                <GetModalStyle product={product} />
            </div>
        </div>
    )
}
const GetModalStyle = ({product}) => {
    const router = useRouter();
    const deleteproduct = async () => {
        const res = await fetch(`${baseUrl}/api/product/${product._id}`, {
            method: "DELETE"})
        await res.json()
        router.push("/")
     }
    return (
        <>  
        {/* button trigger */}
            <button type="button" className="btn btn-danger mt-2 ms-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <Delete />Delete
            </button>

            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Delete Product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h3>{product.name}</h3>
                            Are you sure you want to delete this product?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                            onClick={() => {deleteproduct()}}
                            >Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}


export async function getServerSideProps({ params: { id } }) {
    const res = await fetch(`${baseUrl}/api/product/${id}`,{
        method: "GET"
    })
    const data = await res.json()
    return {
        props: {
            product: data
        }
    }

}
export default productDetails;