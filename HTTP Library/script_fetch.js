// --------------- A) Instantiate Library ---------------
const httpFetch = new httpLibrary();

// --------------- B) Call Requests ---------------------
// 1) GET users
httpFetch
  .get('http://jsonplaceholder.typicode.com/users')
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

// 2) POST - Add user
// User Data
const data = {
  name: 'John Doe',
  username: 'johndoe',
  email: 'jdoe@gmail.com',
};

// Create Post
httpFetch
  .post('http://jsonplaceholder.typicode.com/users', data)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

// 3) Put -Update user
httpFetch
  .put('http://jsonplaceholder.typicode.com/users/2', data)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

// 4) Delete - Remove user
httpFetch
  .delete('http://jsonplaceholder.typicode.com/users/2')
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
