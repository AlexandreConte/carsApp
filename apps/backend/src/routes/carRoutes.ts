import { Router } from "express";
import fetchToJson from "@src/utils/fetchToJson";
import CarInterface from "@src/types/CarInterface";
import { apiUrl } from "@src/utils/data/url";

const router = Router()

router.get("/", async (_, res) => {
  const url = apiUrl + "/brands"
  const brands = await fetchToJson(url)

  res.send(brands)
})

router.get("/:brandCode", async (req, res) => {
  const brandCode = req.params.brandCode
  const url = (apiUrl + `/brands/${brandCode}/models`)
  const models = await fetchToJson(url)

  res.send(models)
})

router.get("/:brandCode/model/:carCode", async (req, res) => {
  const { brandCode, carCode } = req.params
  const url = (apiUrl + `/brands/${brandCode}/models/${carCode}/years`)
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
