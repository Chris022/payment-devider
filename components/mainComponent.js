import Head from 'next/head'
import React from 'react';

import CreateComponent from './unconnected/createComponent.js'
import Statistic from './unconnected/statistic.js'
import List from './unconnected/list.js'
import Filter from './unconnected/filter.js'
import Operations from './unconnected/operations.js'

import {getExpense,postExpense,deleteExpense,getCategory,postCategory,deleteCategory} from './database'

let users = require('./../public/users.json');

export default function MainComponent() {

  let [selectedExpense,setSelectedExpense] = React.useState([]);
  let [selectedCategory,setSelectedCategory] = React.useState([]);
  let [openExpense,setOpenExpense] = React.useState(false);
  let [openCategory,setOpenCategory] = React.useState(false);
  let [expenseList,setExpenseList] = React.useState([]);
  let [categoryList,setCategoryList] = React.useState([]);

  let expenses = users.map(user=>expenseList.filter(el => el.by == user.data).map(el => el.amount).reduce((a,c) => a + c, 0));
  //"name","by","amount","date","category_id"
  const createNewExpenseData = [
    {
      name:"name",
      lable:"Name",
      type:"text"
    },
    {
      name:"by",
      type:"select",
      lable:"Von?",
      lables:users.map(user=>user.lable),
      data:users.map(user=>user.data)
    },
    {
      name:"halfAmount",
      lable:"Bereits geteilter Preis",
      type:"text"
    },
    {
      name:"fullAmount",
      lable:"Ganzer Preis",
      type:"text"
    },
    {
      name:"date",
      type:"date"
    },
    {
      name:"category_id",
      type:"select",
      lable:"Kategorie",
      lables:categoryList.map(el => el.name),
      data:categoryList.map(el => el.id)
    },
  ]

  const createNewCategoryData = [
    {
      name:"name",
      lable:"Name",
      type:"text"
    }
  ]

  let operationsExpense = [
    {
      "name":"new Expense",
      "handlerFunction":()=>setOpenExpense(true)
    },
    {
      "name":"delete Expense",
      "handlerFunction":()=>deleteFuncExpense()
    }
  ]

  let operationsCategory = [
    {
      "name":"new Category",
      "handlerFunction":()=>setOpenCategory(true)
    },
    {
      "name":"delete Category",
      "handlerFunction":()=>deleteFuncCategory()
    }
  ]

  React.useEffect(()=>{
    getExpense().then(data => setExpenseList(data))
    getCategory().then(data => setCategoryList(data))
  },[])

  let newExpenseFunction = (data) => {
    postExpense(data).then(ret => getExpense().then(data => setExpenseList(data)))
  }
  let newCategoryFunction = (data) => {
    postCategory(data).then(ret => getCategory().then(data => setCategoryList(data)))
  }

  let deleteFuncExpense = () => {
    Promise.all(selectedExpense.map(id => deleteExpense(id))).then(() => getExpense().then(data => setExpenseList(data)))
  }

  let deleteFuncCategory = () => {
    Promise.all(selectedCategory.map(id => deleteCategory(id))).then(() => getCategory().then(data => setCategoryList(data)))
  }




  return (
      <>
        <CreateComponent options={createNewExpenseData} open={openExpense} setOpen={setOpenExpense} submitFunc={newExpenseFunction}/>
        <CreateComponent options={createNewCategoryData} open={openCategory} setOpen={setOpenCategory} submitFunc={newCategoryFunction}/>
        <Statistic data={expenses} labels={users.map(user=>user.lable)}/>
        <Operations options={operationsCategory}/>
        <List columns={["name","by"]} data={categoryList} selected={selectedCategory} primaryColumn={"id"} setSelected={setSelectedCategory} />
        <Operations options={operationsExpense}/>
        <List columns={["name","by","date","amount"]} data={expenseList} selected={selectedExpense} primaryColumn={"id"} setSelected={setSelectedExpense} />
      </>
  )
}
