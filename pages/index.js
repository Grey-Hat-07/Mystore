import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
export default function Home(props) {
  

  return (
    <div className={styles.container}>
      
      <h1 className='bg-primary'>{props.data}</h1>
      

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
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

