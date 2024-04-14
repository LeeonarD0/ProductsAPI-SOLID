import express, { Express, Request, Response } from 'express'
import { Api } from "../api";

 export class ApiExpress implements Api{
    constructor(readonly app: Express ){}

    public static build(){
        const app = express()
        app.use(express.json())
        return new ApiExpress(app)
    }

    public addGetRoute(path: string, handle: (req: Request, res: Response) => Promise<void>): void{
        this.app.get(path, handle)
    } 
    
    public addPostRoute(path: string, handle: (req: Request, res: Response) => Promise<void>): void{
        this.app.post(path, handle)
    }

    public async start(port: number) {
        this.app.listen(port, () => {
            console.log(`Server running at: ${port}`)
        })
    }
    
 }