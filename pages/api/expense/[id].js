import * as expenseControler from '../../../pages/backend/controler/expenseControler.mjs'

export default (req, res) => {
    if(req.method == "GET"){
        get(req,res)
    }else if(req.method == "PUT"){
        put(req,res)
    }else if(req.method == "PATCH"){
        patch(req,res)
    }else if(req.method == "DELETE"){
        del(req,res)
    }
}

function get(req,res){
    res.json(expenseControler.getById(req.query.id))
}

function put(req,res){
    res.json(expenseControler.editAll(req.query.id,req.body))
}

function patch(req,res){
    res.json(expenseControler.edit(req.query.id,req.body))
}

function del(req,res){
    res.json(expenseControler.removeById(req.query.id))
}