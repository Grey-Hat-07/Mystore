import Link from 'next/link';
import styles from '../styles/Home.module.css'
export default function Home(props) {
  var listing = props.products.map((product, index) => {
    if(product.description.length > 100) {
      product.description = product.description.substring(0, 40) + '...';
    }
    return (
      <div className="card  col-md-3 mb-2 ms-2" key={product._id}>
        <Link
        href={'/productDetail/[id]'}
        as={`/productDetail/${product._id}`} 
        ><div>
      <img src={product.image} className="card-img-top imgover" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <a href="#" className="btn btn-primary">Go somewhere</a>
      </div></div></Link>
    </div>

    )}
  )

  return (
    <div className={styles.container}>
      <div className='row'>
      {
        listing
      }
      </div>
    </div>
  )
}
export async function getStaticProps(context) {
  const res=await fetch('http://localhost:3000/api/products')
  const data= await res.json()
  return {
    props: {
      products: data
    }
  }
}

