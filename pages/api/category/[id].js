import * as categoryControler from '../../backend/controler/categoryControler.mjs'

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
    res.json(categoryControler.getById(req.query.id))
}

function put(req,res){
    res.json(categoryControler.editAll(req.query.id,req.body))
}

function patch(req,res){
    res.json(categoryControler.edit(req.query.id,req.body))
}

function del(req,res){
    res.json(categoryControler.removeById(req.query.id))
}