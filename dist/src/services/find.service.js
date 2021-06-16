"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.find = void 0;
function find(req, res) {
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
        });
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
        });
    }
}
exports.find = find;
