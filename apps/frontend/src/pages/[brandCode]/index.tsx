import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Container from "@/components/shared/template/Container"
import Header from "@/components/shared/template/Header"
import CarLink from "@/components/CarLink"
import Page from "@/components/shared/template/Page"
import { CarInterface } from "@/types/CarInterface"
import Loading from "@/components/Loading"
import Slogan from "@/components/shared/template/Slogan"
import imageSlogan2 from "../../../public/slogan2.jpg"
import GridContainer from "@/components/shared/template/GridContainer"
import Footer from "@/components/shared/template/Footer"
import Error from "@/components/shared/template/Error"

export default function CarModels() {
  const url = `http://localhost:8080`

  const [cars, setCars] = useState<CarInterface[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  const dict = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

  function renderCarsByFirstLetter(firstLetter: string) {
    const carsWithTheLetter = cars.filter(car => car.name.startsWith(firstLetter))

    if (carsWithTheLetter.length === 0) {
      return null
    }

    return (
      <div>
        <div className="text-3xl flex justify-center py-2">
          - {firstLetter} -
        </div>
        <div>
          {carsWithTheLetter.map((car, i) => (
            <div key={`${car.name}-${car.code}${i}`}>
              <CarLink
                href={`/${brandCode}/${car.code}`}
                key={car.code}
                car={car}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  const router = useRouter()
  const { brandCode }: any = router.query

  async function fetchModelsFromBrand(brandCode: number) {
    try {
      const data = await fetch(`${url}/brands/${brandCode}`)
      const json = await data.json()
      setCars(json)
    } catch (error) {
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchModelsFromBrand(+brandCode)
  }, [])

  return (
    <Page>
      <Header title="Modelos" />
      <Slogan
        title1="Escolha"
        title2="o modelo"
        image={imageSlogan2}
      />
      <Container>
        {isLoading ? (
          <Loading />
        ) : error ? (
          <Error
            message="Ops! Erro ao carregar os dados"
          />
        ) : (
          <GridContainer>
            {cars.length > 0 && dict.map((letter) => (
              renderCarsByFirstLetter(letter)))}
          </GridContainer>
        )}
      </Container>
      <Footer />
    </Page>
  )
}
