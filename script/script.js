const loadPosts = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((json) => getLesson(json.data));
};
// Load Data
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => getWords(data.data));
};
// {id: 7, level: 3, word: 'Grateful', meaning: 'কৃতজ্ঞ', pronunciation: 'গ্রেটফুল'}
const getWords = (words) => {
  const wordsContainer = document.getElementById("word-container");
  wordsContainer.innerHTML = "";
  words.forEach((word) => {
    console.log(word);
    const div = document.createElement("div");
    div.innerHTML = `
   <div class= "bg-white rounded-xl shadow-sm p-3 text-center" >
   <h1 class="font-bold text-3xl mt-2">${word.word} </h1>
   <p class="text-[20px] mt-2">Meaning/Pronuciation</P>

   <h1 class="font-bold text-2xl mt-2"> ${word.meaning}/${word.pronunciation}
    </h1>
    <div class="flex justify-between p-4 mt-3">
      <div class="bg-[#1a91ff1a] hover:bg-blue-300 rounded-xl h-[50px] w-[50px] flex items-center justify-center"><i class="fa-solid fa-circle-info"></i></i></div>
      <div class="bg-[#1a91ff1a]  hover:bg-blue-300 rounded-xl h-[50px] w-[50px] flex items-center justify-center"><i class="fa-solid fa-volume-low "></i></div>
      
    </div>
    </div>
   `;
    wordsContainer.appendChild(div);
  });
};
// {id: 101, level_no: 1, lessonName: 'Basic Vocabulary'}

const getLesson = (lessons) => {
  // get element
  const lessonsContainer = document.getElementById("lessons-container");
  lessonsContainer.innerHTML = "";
  lessons.forEach((lesson) => {
    //   create element
    const div = document.createElement("div");
    div.innerHTML = `
    <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-dash btn-primary">
            <i class="fa-solid fa-bookmark"></i> Lesson-${lesson.level_no}
         </button>
`;
    lessonsContainer.appendChild(div);
  });
};
loadPosts();
