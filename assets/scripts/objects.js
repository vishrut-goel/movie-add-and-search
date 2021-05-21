const addMovieBtn = document.getElementById("add-movie-btn");
const searchBtn = document.getElementById("search-btn");
const filterByTitleInput = document.getElementById("filter-title").value;
const usrInputTitle = document.getElementById("title");
const extraNameInput = document.getElementById("extra-name");
const extraValueInput = document.getElementById("extra-value");
const movies = [];
const inputs = [usrInputTitle, extraNameInput, extraValueInput];

const addMovieHandler = () => {
  const title = usrInputTitle.value;
  const extraName = extraNameInput.value;
  const extraVal = extraValueInput.value;

  if (title.trim() === " ") {
    alert("Enter a valid movie title");
    return;
  }
  const newMovie = {
    info: {
      title,
      [extraName]: extraVal,
    },
    id: Math.random(),
    getFormattedTitle() {
      return this.info.title.toUpperCase();
    },
  };

  movies.push(newMovie);
  clearInputs();
  renderMovie();
  console.log(newMovie);
};

const clearInputs = () => {
  for (const input of inputs) {
    input.value = "";
  }
};
const renderMovie = (filter = "") => {
  const listRoot = document.getElementById("movie-list");
  if (movies.length === 0) {
    listRoot.classList.remove("visible");
    return;
  } else {
    listRoot.classList.add("visible");
  }
  listRoot.innerHTML = "";
  const filteredTitle = !filter
    ? movies
    : movies.filter((movie) => movie.info.title.includes(filter));

  filteredTitle.forEach((movie) => {
    const newMovieEl = document.createElement("li");
    const { info } = movie;
    const { title } = info;
    let { getFormattedTitle } = movie;
    let text = `${getFormattedTitle.call(movie)} - ${Object.keys(info)[1]}: ${
      Object.values(info)[1]
    }`;
    newMovieEl.textContent = text;
    listRoot.append(newMovieEl);
  });
};

const searchMovie = () => {
  const searchInput = document.getElementById("filter-title").value;
  renderMovie(searchInput);
};

addMovieBtn.addEventListener("click", addMovieHandler);
searchBtn.addEventListener("click", searchMovie);
