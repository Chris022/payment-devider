import { generateModel } from '../models/base.mjs'

//name: name of the expense
//by: who made the expense (for now just a name. Later maybe a userId)
//categoryId: link to the category

export let table = "expense"
export let columns = ["name","by","amount","date","category_id"];


export let Expense = generateModel(table,columns);