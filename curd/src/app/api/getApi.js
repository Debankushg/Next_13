

export const fetchData = async () => {
   // return fetch("https://jsonplaceholder.typicode.com/posts").then(res => {
   //    return res.json()
   // }).then(data => {
   //    return data
   // }).catch(error => {
   //    console.error('There was a problem with the fetch operation:', error);
   // })
   try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts")
      const data = await res.json()
      return data
   } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
   }
};


export const getEcomdata = async () => {
   return await fetch("https://dummyjson.com/products").then(res => {
      return res.json()
   }).then(data => {
      return data
   }).catch(err => {
      return err
   })
}


export const loginApi = async (login) => {
   try {
      const response = await fetch('https://dummyjson.com/auth/login', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(
            // username: 'kminchelle',
            // password: '0lelplR',
            //email:kminchelle@qq.com
            // expiresInMins: 60, // optional
            login
         )
      })
      const data = await response.json();
      return data
   } catch (err) {
      console.error('Login error:', err);
      throw err;
   }

}
