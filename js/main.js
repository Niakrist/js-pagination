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
    console.log('firstIndex: ', firstIndex);
    console.log('lastIndex: ', firstIndex + limit)
    return posts.slice(firstIndex, firstIndex + limit);
  }

  const changePage = (e) => {
    console.log('e.target.textContent', e.target.textContent)

     const cropPosts = createCropPosts(e.target.textContent, limit, data)
    createPostsEl(cropPosts);
  }

  const cropPosts = createCropPosts(currentPage, limit, data)

  const createPostsEl = (posts) => {
    console.log('postsEl start', postsEl)
    postsEl.innerHTML = '';
    console.log('postsEl end', postsEl)
    posts.forEach(post => {
      const div = document.createElement('div');
      div.classList.add('card');
      div.textContent = post.title;
      postsEl.appendChild(div);
    })
  }

  const createNav = (posts, postsInAPage) => {
    const pageInNav = Math.ceil(posts.length / postsInAPage);
    const div = document.createElement('div');
    for (let i = 0; i < pageInNav; i++) {
      const span = document.createElement('span');
      span.textContent = i + 1;

      span.addEventListener('click', changePage)

      div.appendChild(span);
    }
    navEl.insertAdjacentElement('beforeend', div)
  }



  createPostsEl(cropPosts)
  createNav(data, limit)

}
main()