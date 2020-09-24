import Nav from '../../components/Nav'
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router'


export default function Index({ riders }) {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <Nav/>
      <div>
        {riders.map((rider) => {
          return (
              <p onClick={() => router.push(`${router.pathname}/${rider.user_id}`)} className="rider-info">Rider: {rider.user_id}</p>
          )
        })}
      </div>
    </div>
  )
}



export async function getStaticProps() {
  const res = await fetch(`${process.env.SERVER_HOST}/riders/`)
  const riders = await res.json()
  return {
    props: {
      riders
    }
  }
}
