import Nav from '../../components/Nav'
import NavLink from '../../components/NavLink'
import RiderCard from '../../components/riders/RiderCard'
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router'


export default function Index({ riders }) {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <Nav>
        <NavLink href="riders" is_active_path="/riders">Riders</NavLink>
      </Nav>
      <div className="flex flex-wrap -mx-2 mb-8 mt-8">
        {riders.map((rider) => {
          return (
            <RiderCard
              className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-8 cursor-pointer"
              rider={rider}
              key={rider.user_id}
              onClick={() => router.push(`${router.pathname}/${rider.user_id}/trips`)}
            ></RiderCard>
          )
        })}
      </div >
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.SERVER_HOST}/riders/`)
  const riders = await res.json()
  return {
    props: {
      riders
    },
    revalidate: 5
  }
}
