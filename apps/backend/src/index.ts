import express from "express"
import cors from "cors"
import carRoutes from "./routes/carRoutes"

const app = express()
app.use(cors({ origin: "http://localhost:3000" }))
app.use("/brands", carRoutes)

const port = 8080
app.listen(port, () => {
  console.log(`Servidor rodando na porta > http://localhost:${port}`);
})
