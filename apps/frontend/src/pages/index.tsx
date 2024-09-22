import CarLink from "@/components/CarLink"
import Loading from "@/components/Loading"
import Container from "@/components/shared/template/Container"
import Header from "@/components/shared/template/Header"
import Page from "@/components/shared/template/Page"
import Slogan from "@/components/shared/template/Slogan"
import { CarInterface } from "@/types/CarInterface"
import { useEffect, useState } from "react"
import imageSlogan from "../../public/slogan.jpg"
import GridContainer from "@/components/shared/template/GridContainer"
import Footer from "@/components/shared/template/Footer"
import Error from "@/components/shared/template/Error"

export default function Home() {
  const globalUrl = `http://localhost:8080/brands`
  const [cars, setCars] = useState<CarInterface[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  const dict = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

  function filterByFirstLetter(firstLetter: string) {
    const carsWithStartingLetter = cars.filter((car: CarInterface) => car.name.startsWith(firstLetter))

    if (carsWithStartingLetter.length === 0) {
      return null
    }

    return (
      <div>
        <div className="text-3xl flex justify-center py-2">
          - {firstLetter} -
        </div>
        <div>
          {carsWithStartingLetter.map((car: CarInterface) => (
            <div key={`${car.code}${car.name}`}>
              <CarLink
                car={car}
                key={car.code}
                href={`/${car.code}`}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  async function fetchbrands(url: string) {
    setIsLoading(true)
    try {
      const response = await fetch(url)
      const data = await response.json()
      setCars(data)
    } catch (error) {
      console.log(error)
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchbrands(globalUrl)
  }, [])

  return (
    <Page>
      <Header title="Carros" />
      <Slogan
        title1="Escolha"
        title2="seu carro"
        image={imageSlogan}
      />
      <div>
        <Container>
          {isLoading ? (
            <Loading />
          ) : error ? (
            <Error
              message={`Ops! Erro ao carregar os dados`}
            />
          ) : (
            <GridContainer>
              {cars.length > 0 && dict.map(letter => (
                filterByFirstLetter(letter)
              ))}
            </GridContainer>
          )}
        </Container>
        <Footer />
      </div>
    </Page>
  )
}
