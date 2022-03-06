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
                    <input type="number" className="form-control" min={1}/>
                    <button className="btn btn-primary" type="button" id="button-addon1">
                        Addtocart<Addtocart /></button>
                </div>
                <button className="btn btn-danger mt-2 ms-3" type="button" id="button-addon2" onClick={getModalStyle}>
                    <Delete />Delete</button>
            </div>
        </div>
    )
}
const getModalStyle = () => {
    return(
        <div className="modal" tabindex="-1">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

    )
}

export async function getServerSideProps({ params: { id } }) {
    const res = await fetch(`${baseUrl}/api/product/${id}`)
    const data = await res.json()
    return {
        props: {
            product: data
        }
    }

}
export default productDetails;