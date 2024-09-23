import { Router } from "express";
import fetchToJson from "@src/utils/fetchToJson";
import CarInterface from "@src/types/CarInterface";
import ExternalApi from "@src/data/Url";

const router = Router()

router.get("/", async (_, res) => {
  const url = ExternalApi.url + "/brands"
  const brands = await fetchToJson(url)

  if (brands.error) {
    res.send("Limite de requisições atingidas!")
  }
  else {
    res.send(brands)
  }
})

router.get("/:brandCode", async (req, res) => {
  const brandCode = req.params.brandCode
  const url = (ExternalApi.url + `/brands/${brandCode}/models`)
  const models = await fetchToJson(url)

  res.send(models)
})

router.get("/:brandCode/model/:carCode", async (req, res) => {
  const { brandCode, carCode } = req.params
  const url = (ExternalApi.url + `/brands/${brandCode}/models/${carCode}/years`)
  const modelYears: CarInterface[] = await fetchToJson(url)
  const promises = modelYears.map(async modelYear => {
    return await fetchInfo(modelYear)
  })

  async function fetchInfo(carModel: CarInterface) {
    const data = await fetchToJson(url + `/${carModel.code}`)

    return data
  }

  const resp = await Promise.all(promises)
  res.send(resp)
})

export default router
