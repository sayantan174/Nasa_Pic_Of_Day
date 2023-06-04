// API Key obtained from NASA website
const apiKey = "gEnv6W8DYw4nf6lkHcUTXgPs32blnFkZV1pzsz8J";

// Function to fetch data for the current date from the NASA API and display it in the UI
function getCurrentImageOfTheDay() {
  const currentDate = new Date().toISOString().split("T")[0];
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${currentDate}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => displayImageData(data))
    .catch((error) => console.error(error));
}

// Function to fetch data for the selected date from the NASA API and display it in the UI
function getImageOfTheDay() {
  const searchInput = document.getElementById("search-input").value;
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${searchInput}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      displayImageData(data);
      saveSearch(searchInput);
      addSearchToHistory();
    })
    .catch((error) => console.error(error));
}

// Function to save a date to local storage
function saveSearch(date) {
  const searches = JSON.parse(localStorage.getItem("searches")) || [];
  if (!searches.includes(date)) {
    searches.push(date);
    localStorage.setItem("searches", JSON.stringify(searches));
  }
}

// Function to add the date to the search history list in the UI
function addSearchToHistory() {
  const searches = JSON.parse(localStorage.getItem("searches")) || [];
  const searchHistory = document.getElementById("search-history");
  searchHistory.innerHTML = "";

  for (const search of searches) {
    const listItem = document.createElement("li");
    listItem.textContent = search;
    listItem.addEventListener("click", () => {
      getImageOfClickedDate(search);
    });
    searchHistory.appendChild(listItem);
  }
}

// Function to display the image data in the UI
function displayImageData(data) {
  const currentImageContainer = document.getElementById(
    "current-image-container"
  );
  currentImageContainer.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = data.title;

  const date = document.createElement("p");
  date.textContent = data.date;

  const image = document.createElement("img");
  image.src = data.url;
  image.alt = data.title;
  image.style.maxWidth = "100%";

  const explanation = document.createElement("p");
  explanation.textContent = data.explanation;

  currentImageContainer.appendChild(title);
  currentImageContainer.appendChild(date);
  currentImageContainer.appendChild(image);
  currentImageContainer.appendChild(explanation);
}

// Event listener for form submission
const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  getImageOfTheDay();
});

// Initial function call to display the current image of the day
getCurrentImageOfTheDay();

//
function getImageOfClickedDate(date) {
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      displayImageData(data);
      saveSearch(date);
      addSearchToHistory();
    })
    .catch((error) => console.error(error));
}
