import { Request, Response, NextFunction } from 'express'

class ApiKeyMiddleware {
    static verifyApiKey(req: Request, res: Response, next: NextFunction) {
        const apiKey = req.headers['api_key']

        if (!apiKey || apiKey !== process.env.API_KEY) {
            return res.status(401).json({
                error: 'sorry, you are not authorized, enter a valid api key',
            })
        }

        next()
    }
}

export default ApiKeyMiddleware
