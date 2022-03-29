import { Application, Request, Response } from "express"


const simpleAPI = async (req: Request, res: Response) => {
    res.send('<h3>Build API Server for upload files to AWS S3</h3>')
}

export const defaultRoute = (app: Application) => {
    app.get("/", simpleAPI)
}

export * from "./upload-to-S3"
