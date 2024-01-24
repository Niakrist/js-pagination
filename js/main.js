const api = 'https://jsonplaceholder.typicode.com/posts';
const postsEl = document.querySelector('.posts');
const navEl = document.querySelector('.nav');

async function main() {
  const response = await fetch(api);
  const data = await response.json();

  let currentPage = 1;
  const limit = 10;

  const createCropPosts = (currentPage, limit, posts) => {
    const firstIndex = (currentPage - 1) * limit;
    return posts.slice(firstIndex, firstIndex + limit);
  }

  const changePage = (e) => {
    document.querySelector('.active') && document.querySelector('.active').classList.remove('active');
     const cropPosts = createCropPosts(e.target.textContent, limit, data)
    createPostsEl(cropPosts);
    e.target.classList.add('active');
  }

  const cropPosts = createCropPosts(currentPage, limit, data)

  const createPostsEl = (posts) => {
    postsEl.innerHTML = '';
    posts.forEach(post => {
      const div = document.createElement('div');
      div.classList.add('card');
      div.textContent = post.title;
      postsEl.appendChild(div);
    })
  }

  const createNav = (posts, postsInAPage) => {
    const pageInNav = Math.ceil(posts.length / postsInAPage);
    for (let i = 0; i < pageInNav; i++) {
      const span = document.createElement('span');
      span.textContent = i + 1;
      span.addEventListener('click', changePage)
      navEl.appendChild(span);
    }
    navEl.firstElementChild.classList.add('active');
  }

  createPostsEl(cropPosts)
  createNav(data, limit)
}
main()