const POST_KEY = "posts";
const NUM_POSTS = "#posts";
const REPLY_KEY = "replies";
const NUM_REPLIES = "#replies";

function initPosts() {
  if (localStorage.getItem(POST_KEY) !== null) {
    return;
  }

  localStorage.setItem(POST_KEY, "{}");
  localStorage.setItem(NUM_POSTS, 1);
  localStorage.setItem(NUM_REPLIES, 1);
}

function createOrUpdatePost(post) {
  const posts = getPosts();

  if (!posts[post.postID]) {
    post.postID = getNumberOfPosts();
    posts[post.postID] = post;

    update(posts, POST_KEY);
    setNumberOfPosts();
  } else {
    posts[post.postID] = post;

    update(posts, POST_KEY);
  }
}

function getPosts() {
  return JSON.parse(localStorage.getItem(POST_KEY));
}

function update(object, key) {
  localStorage.setItem(key, JSON.stringify(object));
}

function deletePost(postID) {
  const posts = getPosts();
  delete posts[postID];
  update(posts, POST_KEY);
}

function deleteUserPostsAndReplies(user) {
  const posts = getPosts();
  const replies = getReplies();

  Object.keys(posts).map((i) => {
    if (posts[i].username === user.username) {
      deletePost(posts[i].postID);
    }
  })

  Object.keys(replies).map((i) => {
    if (replies[i].username === user.username) {
      deleteReply(replies[i].replyID);
    }
  })
}

function getNumberOfPosts() {
  const posts = JSON.parse(localStorage.getItem(NUM_POSTS));
  return posts;
}

function setNumberOfPosts() {
  const posts = JSON.parse(localStorage.getItem(NUM_POSTS));
  localStorage.setItem(NUM_POSTS, posts + 1);
}

function addReply(reply) {
  const replies = getReplies();

  if (!replies[reply.replyID]) {
    reply.replyID = getNumberOfReplies();
    replies[reply.replyID] = reply;

    update(replies, REPLY_KEY);
    setNumberOfReplies();
  } else {
    replies[reply.replyID] = reply;

    update(replies, REPLY_KEY);
  }
}

function getReplies() {
  return JSON.parse(localStorage.getItem(REPLY_KEY));
}

function getNumberOfReplies() {
  const numReplies = JSON.parse(localStorage.getItem(NUM_REPLIES));
  return numReplies;
}

function setNumberOfReplies() {
  const replies = JSON.parse(localStorage.getItem(NUM_REPLIES));
  localStorage.setItem(NUM_REPLIES, replies + 1);
}

function deleteReply(replyID) {
  const replies = getReplies();
  delete replies[replyID];
  update(replies, REPLY_KEY);
}

export {
  initPosts,
  createOrUpdatePost,
  getPosts,
  update,
  deletePost,
  addReply,
  getReplies,
  deleteUserPostsAndReplies
};
