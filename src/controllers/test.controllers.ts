import { Request, Response } from 'express';


const testAPI = async (req: Request, res: Response) => {
    try{
        res.status(200).send(
            {
                msg: "API for wallet-management-service",
                timestamp: new Date().toISOString(),
                //all_user: await userAccessor.getAllUser()
            }
        )
        return;

    }
    catch(e: any){
        console.log('error test API : ', e)
        res.status(500).send({
            error: e.toString()
        })
        return;
    }
}

export {
    testAPI
}