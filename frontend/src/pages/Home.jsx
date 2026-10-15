import Grid from "../components/Grid"
import Hero from "../components/Hero"

const Home = () => {
  return (
    <div>
      <Hero />
      <div className="py-20">
        <h2 className="text-3xl text-center font-bold capitalize">Legends Never Die</h2>
        <Grid/>
      </div>
      <div className="pb-20">
        <h2 className="text-3xl text-center font-bold capitalize">Pack Of Legends</h2>
        <Grid />
      </div>
    </div>
  )
}

export default Home
