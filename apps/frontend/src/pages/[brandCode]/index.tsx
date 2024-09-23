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
import BackendUrls from "@/data/BackendUrl"
import Dictionary from "@/data/Dictionary"

export default function CarModels() {

  const [cars, setCars] = useState<CarInterface[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

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
      const data = await fetch(BackendUrls.models(brandCode))
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
        {
          isLoading ? (
            <Loading />
          ) : error ? (
            <Error
              message="Ops! Erro ao carregar os dados"
            />
          ) : (
            <GridContainer>
              {
                cars.length > 0 && Dictionary.lettersAndNumbers.map((dictItem) => (
                  renderCarsByFirstLetter(dictItem)))
              }
            </GridContainer>
          )
        }
      </Container>
      <Footer />
    </Page>
  )
}
