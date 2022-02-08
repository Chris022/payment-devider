import axios from 'axios';


export function getExpense(){
    return axios.get('/api/expense')
    .then((response) => response.data.data)
    .catch(function (error) {
      console.log(error);
    })
}

export function postExpense(data){
  return axios.post('/api/expense',data)
  .then((response) => response.data.data)
  .catch(function (error) {
    console.log(error);
  })
}

export function deleteExpense(id){
  return axios.delete('/api/expense/'+id)
  .then((response) => response.data.data)
  .catch(function (error) {
    console.log(error);
  })
}


export function getCategory(){
  return axios.get('/api/category')
  .then((response) => response.data.data)
  .catch(function (error) {
    console.log(error);
  })
}

export function postCategory(data){
return axios.post('/api/category',data)
.then((response) => response.data.data)
.catch(function (error) {
  console.log(error);
})
}

export function deleteCategory(id){
return axios.delete('/api/category/'+id)
.then((response) => response.data.data)
.catch(function (error) {
  console.log(error);
})
}