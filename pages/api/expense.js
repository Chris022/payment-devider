import * as expenseControler from '../../pages/backend/controler/expenseControler.mjs'

export default (req, res) => {
    if(req.method == "GET"){
        get(req,res)
    }else if(req.method == "POST"){
        post(req,res)
    }else if(req.method == "DELTE"){
        del(req,res)
    }
}

function get(req,res){
    res.json(expenseControler.getAllWithFilter(req.body))
}

function post(req,res){
    res.json(expenseControler.newExpense(req.body))
}

function del(req,res){
    res.json(expenseControler.removeAll())
}