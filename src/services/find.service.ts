import {Request, Response} from 'express';

function find(req: Request , res: Response) {   
    if (!req.params.id) {

        res.render('home', {
            lista: [
                {
                    "tecnico": "eder",
                    "produto": "tex-328",
                    "serviceOrderNumber": 1,
                    "registerDate": "20/04/2021",
                    "status": "Em conserto"
                }
            ]
        })
    }

    else {
        // procurar por OS
        res.render('home', {
            lista: [
                {
                    "tecnico": "eder",
                    "produto": "tex-328",
                    "serviceOrderNumber": 1,
                    "registerDate": "20/04/2021",
                    "status": "Em conserto"
                }
            ]
        })
    }
}

export { find }