

export const fetchData = () => {
    return fetch("https://jsonplaceholder.typicode.com/posts").then(res => {
     return res.json() 
    }).then(data => {
       return data
       }) .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });}
