import { Expense, columns } from "../models/expense.mjs";
import { objectVerificator, valueVerificator } from "../utils/verification.mjs";
import { basicFilter, andList, tryOrIgnore, bind, dateFilter } from '../utils/filter.mjs'
import { sendSuccess, sendError } from '../utils/result.mjs'

import users from "./../../../public/users.json"

//------------Validators------------
let verifyAll = objectVerificator(columns);
let verifyOptional = objectVerificator(["id"], columns);
let verifyId = valueVerificator();

//------------Filters-----------
let whereNameLike = tryOrIgnore(
    basicFilter("name", "like", "whereNameLike"));
let whereCategoryIdEquals = tryOrIgnore(
    basicFilter("category_id", "=", "whereCategoryIdEquals"));

let categoryFilter = andList([
    whereNameLike,
    whereCategoryIdEquals
]);

// /expense Actions
export function getAllWithFilter(data) {
    if (!data["filter"] || Object.values(data["filter"]).length == 0) {
        return sendSuccess("Succesfully got all Expenses", Expense.all());
    }
    let expenses = Expense.filter(categoryFilter, data["filter"]);
    return sendSuccess("Succesfully got all Expenses", expenses);
}

export function removeAll(data) {
    Expense.deleteAll();
    return sendSuccess("Succesfully deleted all Expenses", []);
}

export function newExpense(data) {
    //Pre edit
    if (data["fullAmount"]) {
        data["amount"] = (data["fullAmount"] / users.length).toFixed(2);
    } else {
        data["amount"] = data["halfAmount"].toFixed(2);

    }
    delete data.fullAmount;
    delete data.halfAmount;

    //verifcation
    if (verifyAll(data)) {
        Expense.insert(data);
        return sendSuccess("Succesfully created new Expense", []);
    }
    return sendError("Invalid or not enought body data");
}


// /expense/id Actions

export function getById(id, data) {
    //verifcation
    if (verifyId(id)) {
        let expense = Expense.find(id);
        return sendSuccess("Succesfully got Expense", expense);
    }
    return sendError("Invalid or not enought body data");
}

export function editAll(id, data) {
    //verifcation
    if (verifyAll(data) && verifyId(id)) {
        Expense.update(id, data);
        return sendSuccess("Succesfully updated Expense", []);
    }
    return sendError("Invalid or not enought body data");
}

export function edit(id, data) {
    //verifcation
    if (verifyOptional(data) && verifyId(id)) {
        Expense.update(id, data);
        return sendSuccess("Succesfully updated Expense", []);
    }
    return sendError("Invalid or not enought body data");
}

export function removeById(id, data) {
    //verifcation
    if (verifyId(id)) {
        Expense.delete(id);
        return sendSuccess("Succesfully deleted Expense", []);
    }
    return sendError("Invalid or not enought body data");
}