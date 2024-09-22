export default async function fetchToJson(url: string): Promise<any> {
  try {
    const data = await fetch(url)
    const json = await data.json()
    return await json
  } catch (error) {
    console.log(error)
  }
}
