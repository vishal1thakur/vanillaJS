// ----------- A) Instanstiate object
const http = new easyHTTP();

// ----------- B) Call requests
// 1a) Get Posts
http.get('http://jsonplaceholder.typicode.com/posts', function (err, posts) {
  if (err) {
    console.log(err);
  } else {
    console.log(posts);
  }
});

// 1b) Get Single Post
http.get('http://jsonplaceholder.typicode.com/posts/1', function (err, post) {
  if (err) {
    console.log(err);
  } else {
    console.log(post);
  }
});

// 2) Send Post
// i) Create data
const data = {
  title: 'Custom Post',
  body: 'This is a custom post',
};

// ii) Create Post
http.post(
  'http://jsonplaceholder.typicode.com/posts',
  data,
  function (err, post) {
    if (err) {
      console.log(err);
    } else {
      console.log(post);
    }
  }
);

// 3) PUT (Update)
http.put(
  'http://jsonplaceholder.typicode.com/posts/1',
  data,
  function (err, post) {
    if (err) {
      console.log(err);
    } else {
      console.log(post);
    }
  }
);

// 1d) Delete
http.delete(
  'http://jsonplaceholder.typicode.com/posts/1',
  function (err, response) {
    if (err) {
      console.log(err);
    } else {
      console.log(response);
    }
  }
);
