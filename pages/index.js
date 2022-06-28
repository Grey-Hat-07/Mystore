import Link from 'next/link';
import styles from '../styles/Home.module.css'
import baseUrl from '../helpers/baseUrl';
export default function Home(props) {
  var listing = props.products.map((product, index) => {
    if (product.description.length > 100) {
      product.description = product.description.substring(0, 40) + '...';
    }
    return (
      <div className="col-md-3 mb-2" key={product._id}>
        <Link
          href={'/productDetail/[id]'}
          as={`/productDetail/${product._id}`}
        ><div>
            <div className="card cardstyle cardhover">
              <img src={product.image} className="card-img-top" alt={product.name} height="200" />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                {/* <p className="card-text text-muted">{category}</p> */}
                <p className="card-text">₹{product.price}</p>
                {/* <p className="card-text">⭐{rating.rate}</p> */}
              </div></div>
          </div></Link>
      </div>

    )
  }
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
// export async function getStaticProps(context) {
//   const res = await fetch(`${baseUrl}/api/products`)
//   const data = await res.json()
//   return {
//     props: {
//       products: data
//     }
//   }
// }

export async function getServerSideProps(context) {
  const res = await fetch(`${baseUrl}/api/products`)
  const data = await res.json()
  return {
    props: {
      products: data
    }
  }
}

