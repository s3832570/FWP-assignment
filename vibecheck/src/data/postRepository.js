const POST_KEY = "posts";
const NUM_POSTS = "#posts";

function initPosts() {
  if (localStorage.getItem(POST_KEY) !== null) {
    return;
  }

  localStorage.setItem(POST_KEY, "{}");
  localStorage.setItem(NUM_POSTS, 1);
}

function createOrUpdatePost(post) {
  const posts = getPosts();

  if (!posts[post.postID]) {
    post.postID = getNumberOfPosts();
    posts[post.postID] = post;

    updatePosts(posts);
    setNumberOfPosts();
    
  } else {
    posts[post.postID] = post;

    updatePosts(posts);
  }
}

function getPosts() {
  return JSON.parse(localStorage.getItem(POST_KEY));
}

function updatePosts(posts) {
  localStorage.setItem(POST_KEY, JSON.stringify(posts));
}

function deletePost(postID) {
  const posts = getPosts();
  delete posts[postID];
  updatePosts(posts);
}

function getNumberOfPosts() {
  const posts = JSON.parse(localStorage.getItem(NUM_POSTS));
  return posts;
}

function setNumberOfPosts() {
  const posts = JSON.parse(localStorage.getItem(NUM_POSTS));
  localStorage.setItem(NUM_POSTS, posts + 1);
}

export { initPosts, createOrUpdatePost, getPosts, updatePosts, deletePost };
