export default class BackendUrls {

  static brands = "http://localhost:8080/brands"

  static models(brandCode: number) {
    return `${this.brands}/${brandCode}`
  }

  static modelInfo(brandCode: number, carCode: number) {
    return `${this.brands}/${brandCode}/model/${carCode}`
  }
}
