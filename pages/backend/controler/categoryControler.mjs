import {Category,columns} from "../models/category.mjs";
import { objectVerificator,valueVerificator } from "../utils/verification.mjs";
import { sendSuccess,sendError } from '../utils/result.mjs'


//------------Validators------------
let verifyAll = objectVerificator(columns,[]); //all columns exept Id
let verifyOptional = objectVerificator(["id"],columns); //all columns, exept id are optional

let verifyId = valueVerificator(); //check if id is given



//--------------/category-------------
export function getAll(data){
    let categorys = Category.all();
    return sendSuccess("Succesfully got all Categorys",categorys);
}

export function removeAll(data){
    Category.deleteAll();
    return sendSuccess("Succesfully deleted all Categorys",[]);
}

export function newCategory(data){
    //verifcation
    if(verifyAll(data)){
        Category.insert(data);
        return sendSuccess("Succesfully created new Category",[]);
    }
    return sendError("Invalid or not enought body data");
}


//------------/category/id-----------------

export function getById(id,data){
    //verifcation
    if(verifyId(id)){
        let category =  Category.find(id);
        return sendSuccess("Succesfully got Category",category);
    }
    return sendError("Invalid or not enought body data");
}

export function editAll(id,data){
    //verifcation
    if(verifyAll(data) && verifyId(id)){
        Category.update(id,data);
        return sendSuccess("Succesfully updated Category",[]);
    }
    return sendError("Invalid or not enought body data");
}

export function edit(id,data){
    //verifcation
    if(verifyOptional(data) && verifyId(id)){
        Category.update(id,data);
        return sendSuccess("Succesfully updated Category",[]);
    }
    return sendError("Invalid or not enought body data");
}

export function removeById(id,data){
    //verifcation
    if(verifyId(id)){
        Category.delete(id);
        return sendSuccess("Succesfully deleted Category",[]);
    }
    return sendError("Invalid or not enought body data");
}