import Image from 'next/image'
import styles from '../styles/Home.module.css'
export default function Home(props) {
  

  return (
    <div className={styles.container}>
      
      <h1 className='bg-primary'>{props.data}</h1>
      
    </div>
  )
}
export async function getStaticProps(context) {
  const res=await fetch('http://localhost:3000/api/hello')
  const data= await res.json()
  console.log(data)
  return {
    props: {data: data.name}, // will be passed to the page component as props
  }
}

