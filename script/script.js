const loadPosts = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((json) => getLesson(json.data));
};
// {id: 101, level_no: 1, lessonName: 'Basic Vocabulary'}

const getLesson = (lessons) => {
    // get element
  const lessonsContainer = document.getElementById("lessons-container");
  lessonsContainer.innerHTML = "";
  lessons.forEach((lesson) => {
    console.log(lesson)
//   create element
const div = document.createElement("div");
div.innerHTML =`
    <button class="btn btn-dash btn-primary">
            <i class="fa-solid fa-bookmark"></i> Lesson-${lesson. level_no}
         </button>
`
lessonsContainer.appendChild(div)
  })
  
};
loadPosts();
