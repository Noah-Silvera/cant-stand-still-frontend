import { useRouter } from 'next/router'

export default function RiderCard({ rider, className = "", onClick = null }) {
  const router = useRouter()

  return (
    <div className={className} onClick={onClick} >
      <div className="flex items-center my-2 mx-8 py-2 bg-white hover:bg-gray-200 rounded-3xl flex-row justify-center">
        <div style={{"clipPath": "url(#imageCurve)" }}>
          <img
            className="w-auto h-24"
            src={`${rider.profile_picture}`}
            alt={`Picture of ${rider.first_name} ${rider.last_name}`}
          />
        </div>
        <div className="flex space-y-4">
          <div className="flex items-center md:items-start">
            <h2 className="text-2xl font-medium ml-2">{rider.first_name} {rider.last_name}</h2>
          </div>
        </div>
      </div>
      <svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
          <defs>
          <clipPath id="imageCurve" transform="scale(0.5,0.5)">
              <path
              d="M79 6.237604307034a32 32 0 0 1 32 0l52.870489570875 30.524791385932a32 32 0 0 1 16 27.712812921102l0 61.049582771864a32 32 0 0 1 -16 27.712812921102l-52.870489570875 30.524791385932a32 32 0 0 1 -32 0l-52.870489570875 -30.524791385932a32 32 0 0 1 -16 -27.712812921102l0 -61.049582771864a32 32 0 0 1 16 -27.712812921102"
              />
          </clipPath>
          </defs>
      </svg>
    </div>
  )
}
