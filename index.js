import reddit from './redditapi';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// form event listener
searchForm.addEventListener('submit', e => {
   // Get search term
   const searchTerm = searchInput.value;
   // get sort
   const sortBy = document.querySelector('input[name="sortby"]:checked').value;
   // get limit
   const searchLimit = document.getElementById('limit').value;

   // check input
   if(searchTerm == '') {
       // show message
       showMessage('Please add search term', 'alert-danger')
   }

   // clear input
   searchInput.value = '';

   // search reddit
   reddit.search(searchTerm, searchLimit, sortBy)
   .then(results => {
       console.log(results);
       let output = '<div class="card-columns">';
       // loop through posts
        results.forEach(post => {
            // check for image
            let image = post.preview ? post.preview.images[0].source.url : 'https://cnet4.cbsistatic.com/img/tay4JHKNwejbFaG_tCM-MF0WbQY=/2015/07/09/7bbb900c-b51a-4b78-a791-5bd6fc9793cd/fd-reddit-alien.jpg';

            output += `
            <div class="card">
            <img class="card-img-top" src="${image}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text">${truncateText(post.selftext, 100)}</p>
              <a href="https://reddit.com${post.permalink}" target="_blank" class="btn btn-primary">Read more</a>
              <hr>
              <p class="card-text">Subreddit: ${post.subreddit} <br> Score: ${post.score}</p>
            </div>
          </div>`
        });
       output += '</div>';
       document.getElementById('results').innerHTML = output;
   });

   e.preventDefault();
});

// show message
function showMessage(message, className) {
    // create div
    const div = document.createElement('div');
    // add classes
    div.className = `alert ${className}`;
    // add text
    div.appendChild(document.createTextNode(message));
    // get parent
    const searchContainer = document.getElementById('search-container');
    // get search
    const search = document.getElementById('search');
    // insert message
    searchContainer.insertBefore(div, search);
    // timeout alert
    setTimeout(() => document.querySelector('.alert').remove(), 5000);
}

// truncate text
function truncateText(text, limit) {
    const shortened = text.indexOf(' ', limit);
    if (shortened == -1) return text;
    return text.substring(0, shortened);
}