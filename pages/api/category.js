import * as categoryControler from '../../pages/backend/controler/categoryControler.mjs'

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
    res.json(categoryControler.getAll())
}

function post(req,res){
    res.json(categoryControler.newCategory(req.body))
}

function del(req,res){
    res.json(categoryControler.removeAll())
}