import Nav from '../../components/Nav'
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router'


export default function Index({ riders }) {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <Nav/>
      <ul>
        {riders.map((rider) => {
          return (
              <li onClick={() => router.push(`${router.pathname}/${rider.user_id}`)}
                 className="rider-info"
                 key={rider.user_id}>
                Rider: {rider.first_name} {rider.last_name}
              </li>
          )
        })}
      </ul>
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
