import { generateModel } from '../models/base.mjs'

export let table = "category"
export let columns = ["name"];


export let Category = generateModel(table,columns);