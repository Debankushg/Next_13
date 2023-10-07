

export const fetchData = () => {
   return fetch("https://jsonplaceholder.typicode.com/posts").then(res => {
      return res.json()
   }).then(data => {
      return data
   }).catch(error => {
      console.error('There was a problem with the fetch operation:', error);
   })
};


export const getEcomdata = async () => {
   return await fetch("https://fakestoreapi.com/products").then(res => {
      return res.json()
   }).then(data => {
      return data
   }).catch(err => {
      return err
   })
}


export const loginApi = async () => {
   fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
         username: 'kminchelle',
         password: '0lelplR',
         // expiresInMins: 60, // optional
      })
   })
      .then(res => res.json())
      .then(console.log());
}
