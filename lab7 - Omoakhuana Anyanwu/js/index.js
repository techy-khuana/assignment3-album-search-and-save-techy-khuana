const masterCopy = document.querySelector("#search-results").cloneNode(true);
const favoritesMasterCopy = document
  .querySelector("#favorites")
  .cloneNode(true);

async function appInit() {
  const res = await fetch(
    "https://660f5001356b87a55c5127e0.mockapi.io/api/v1/albums"
  );
  const albums = await res.json();
  console.log(albums);

  // Function to perform search
  async function performSearch(query) {
    const searchResults = document.querySelector("#search-results");
    searchResults.innerHTML = "";

    const filteredAlbums = albums.filter((album) => {
      const artistMatch = album.artistName.toLowerCase().includes(query);
      const albumMatch = album.albumName.toLowerCase().includes(query);
      return artistMatch || albumMatch;
    });

    renderFilteredAlbums(filteredAlbums);
  }

  // Function to render filtered albums
  function renderFilteredAlbums(filteredAlbums) {
    const container = masterCopy.cloneNode(true);

    filteredAlbums.forEach((album) => {
      // template
      const template = ` 
         <li class="list-group-item d-flex justify-content-between align-items-start">
         <div class="ms-2 me-auto">
         <div class="fw-bold">
        ${album.albumName}
         <span class="badge bg-primary rounded-pill">${album.averageRating}</span>
         </div>
         <span>${album.artistName}</span>
         </div>
         <button data-uid=${album.uid} type="button" class="btn btn-success">Add to Favorites</button>
       </li>
         `;

      //convert the template to an element string
      const elem = document.createRange().createContextualFragment(template)
        .children[0];

      // Add event listener to the "Add to Favorites" button
      elem.querySelector(".btn-success").addEventListener("click", function () {
        const albumUid = album.uid;
        const albumToAdd = filteredAlbums.find(
          (album) => album.uid === albumUid
        );
        console.log(albumToAdd);

        const doesExist = favoriteAlbums.find(
          (album) => album.uid === albumUid
        );
        if (!doesExist) {
          favoriteAlbums.push(albumToAdd);
          renderFavoriteAlbums();
          postRequest(albumToAdd);
        }
      });

      container.append(elem);
    });

    document.querySelector("#search-results").replaceWith(container);
  }

  // Function to render favorite albums
  function renderFavoriteAlbums() {
    const container = favoritesMasterCopy.cloneNode(true);

    favoriteAlbums.forEach((album) => {
      // template
      const template = ` 
         <li class="list-group-item d-flex justify-content-between align-items-start">
         <div class="ms-2 me-auto">
         <div class="fw-bold">
        ${album.albumName}
         <span class="badge bg-primary rounded-pill">${album.averageRating}</span>
         </div>
         <span>${album.artistName}</span>
         </div>
         <button data-uid=${album.uid} type="button" class="btn btn-success">Remove from Favorites</button>
       </li>
         `;

      //convert the template to an element string
      const elem = document.createRange().createContextualFragment(template)
        .children[0];

      // Add event listener to the "Remove from Favorites" button
      elem
        .querySelector(".btn-success")
        .addEventListener("click", function (e) {
          const albumUid = e.currentTarget.dataset.uid;
          const indexToRemove = favoriteAlbums.findIndex(
            (album) => album.uid === albumUid
          );
          e.currentTarget.parentElement.remove();
        });

      container.append(elem);
    });

    document.querySelector("#favorites").replaceWith(container);
  }

  // Function to perform POST request
  async function postRequest(favorites) {
    const requestHeader = new Headers();
    requestHeader.append("content-type", "application/json");

    const albumToAdd = JSON.stringify(favorites);

    const requestObject = {
      method: "POST",
      headers: requestHeader,
      body: albumToAdd,
      redirect: "follow",
    };

    const res = await fetch(
      "https://660f5001356b87a55c5127e0.mockapi.io/api/v1/favorites",
      requestObject
    );

    console.log(await res.json());
  }

  // Function to perform GET request
  async function getRequest(url) {
    const res = await fetch(url);
    return await response.json();
  }

  // Event listener for search form submission
  const searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const query = document
      .querySelector("input[name='query']")
      .value.trim()
      .toLowerCase();
    performSearch(query);
  });

  // Function to handle tab switching
  function switchTabs(activeTabId) {
    const searchButton = document.querySelector("#search-button");
    const favoritesButton = document.querySelector("#favorites-button");
    const searchTab = document.querySelector("#search-tab");
    const favoritesTab = document.querySelector("#favorites-tab");

    if (activeTabId === "search") {
      // Add 'active' class to search button
      searchButton.classList.add("active");
      favoritesButton.classList.remove("active");
      favoritesTab.classList.add("d-none");
      searchTab.classList.remove("d-none");
    } else if (activeTabId === "favorites") {
      // Add 'active' class to favorites button
      favoritesButton.classList.add("active");
      searchButton.classList.remove("active");
      searchTab.classList.add("d-none");
      favoritesTab.classList.remove("d-none");
    }
  }

  // Event listener for tab buttons
  const searchButton = document.querySelector("#search-button");
  const favoritesButton = document.querySelector("#favorites-button");
  searchButton.addEventListener("click", function () {
    switchTabs("search");
  });
  favoritesButton.addEventListener("click", function () {
    renderFavoriteAlbums();
    console.log(favoriteAlbums);
    switchTabs("favorites");
  });

  switchTabs("search");
}

const favoriteAlbums = [];

appInit();
