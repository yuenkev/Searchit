import reddit from "./redditapi";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

//Form Event Listener
searchForm.addEventListener("submit", (e) => {
  //Get Search Term
  const searchTerm = searchInput.value;
  //Get Sort
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  //Get Limit
  const searchLimit = document.getElementById("limit").value;

  //check Input
  if (searchTerm === "") {
    // Show a Message
    showMessage("Please add a search term", "alert-danger");
  }

  //Clear Input
  searchInput.value = "";

  //Search Reddit
  reddit.search(searchTerm, searchLimit, sortBy).then((results) => {
    let output = "<div class=card-columns>";
    // Loop throught
    results.forEach((post) => {
      //Check for image
      let image = post.preview
        ? post.preview.images[0].source.url
        : "https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg";

      output += `
 <div class="card" style="width: 18rem;">
  <img src="${image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${post.title}</h5>
    <p class="card-text">${truncateText(post.selftext, 100)}</p>
    <a href="${post.url}" target="_blank" class="btn btn-primary">Read more!</a>
      <hr>
      <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
      <span class="badge badge-dark">Score: ${post.score}</span>
    </div>
</div>
      `;
    });
    output += "</div>";
    document.getElementById("results").innerHTML = output;
  });

  //Prevents form from submiting
  e.preventDefault();
});

// Show Message
function showMessage(message, className) {
  //Create the Div
  const div = document.createElement("div");
  //Add Classes
  div.className = `alert ${className}`;
  // Add Text
  div.appendChild(document.createTextNode(message));
  //Get parent
  const searchContainer = document.getElementById("search-container");
  //Get Search
  const search = document.getElementById("search");

  //Insert Message
  searchContainer.insertBefore(div, search);

  //Timeout alert
  setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// Truncate Text
function truncateText(text, limit) {
  const shortened = text.indexOf(" ", limit);
  if (shortened == -1) return text;
  return text.substring(0, shortened);
}
