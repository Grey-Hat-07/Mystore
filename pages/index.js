
import styles from '../styles/Home.module.css'
export default function Home(props) {
  const listing = props.products.map((product, index) => {
    return (
      <div className="card cardwidth" key={product._id}>
      <img src={product.image} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <a href="#" className="btn btn-primary">Go somewhere</a>
      </div>
    </div>

    )}
  )

  return (
    <div className={styles.container}>
      
      {
        listing
      }
      
    </div>
  )
}
export async function getStaticProps(context) {
  const res=await fetch('http://localhost:3000/api/products')
  const data= await res.json()
  // console.log(data)
  return {
    props: {
      products: data
    }
  }
}

