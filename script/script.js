const loadPosts = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((json) => getLesson(json.data));
};
// Load Data

const removeClass = () => {
  const btns = document.querySelectorAll(".lesson-btn");
  btns.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const loadBtn = document.getElementById(`load-btn-${id}`);
      removeClass();
      loadBtn.classList.add("active");

      getWords(data.data);
    });
};
// Load Word Detail
const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;

  const res = await fetch(url);
  const details = await res.json();
  displayWordDetail(details.data);
};

const displayWordDetail = (words) => {
  const detailBox = document.getElementById("detail-container");
  detailBox.innerHTML = `
  <div>
      <h2 class="font-bold text-2xl ">${
        words.word
      } (<i class="fa-solid fa-microphone-lines"></i> :${
    words.pronunciation
  }) </h2>
      <h3 class="font-semibold mt-2">Meaning</h3>
      <p >${words.meaning}</p>
      <h2 class="font-semibold mt-2">Example</h2>
      <p>${words.sentence}</p>
      <h2 class="font-semibold mt-2">সমার্থক শব্দ গুলো</h2>
      <div class="flex gap-2 ">
       ${createElement(words.synonyms)}
      </div>
    </div>
  `;
  document.getElementById("my_modal").showModal();
};
const getWords = (words) => {
  const wordsContainer = document.getElementById("word-container");
  wordsContainer.innerHTML = "";
  if (words.length == 0) {
    wordsContainer.innerHTML = `<div class=" bg-sky-100 col-span-full text-center text-gray-400 rounded-lg p-10 font-bangla">
   <img class="mx-auto" src="assets/alert-error.png" alt="">
   <h1 class="">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h1>
   <p class="font-bold text-4xl mt-4 ">একটি Lesson Select করুন। </p>
 </div>`;
    return;
  }

  words.forEach((word) => {
    const div = document.createElement("div");
    div.innerHTML = `
   <div class= "bg-white rounded-xl shadow-sm p-3 text-center" >
   <h1 class="font-bold md:text-3xl text-2xl mt-2">${
     word.word ? word.word : "কোনো শব্দ পাওয়া যাইনি"
   } </h1>
   <p class="md:text-[20px] text-[13px] mt-2">Meaning/Pronuciation</p>

   <h1 class="font-bold text-2xl mt-2"> ${
     word.meaning ? word.meaning : "কোনো অর্থ পাওয়া যাইনি"
   } /${
      word.pronunciation ? word.pronunciation : "কোনো Pronunciation পাওয়া যাইনি"
    }
    </h1>
    <div class="flex justify-between p-4 mt-3">
      <button onclick="loadWordDetail(${
        word.id
      })" class="bg-[#1a91ff1a] hover:bg-blue-300 rounded-xl h-[50px] w-[50px] flex items-center justify-center"><i class="fa-solid fa-circle-info"></i></i></button>
      <button class="bg-[#1a91ff1a]  hover:bg-blue-300 rounded-xl h-[50px] w-[50px] flex items-center justify-center"><i class="fa-solid fa-volume-low "></i></button>
      
    </div>
    </div>
   `;
    wordsContainer.appendChild(div);
  });
};

const getLesson = (lessons) => {
  // get element
  const lessonsContainer = document.getElementById("lessons-container");
  lessonsContainer.innerHTML = "";
  lessons.forEach((lesson) => {
    //   create element
    const div = document.createElement("div");
    div.innerHTML = `
    <button id="load-btn-${lesson.level_no}" 
    onclick="loadLevelWord(${lesson.level_no})" class="btn btn-dash btn-primary lesson-btn">
            <i class="fa-solid fa-bookmark"></i> Lesson-${lesson.level_no}
         </button>
`;
    lessonsContainer.appendChild(div);
  });
};
const createElement = (arr) => {
  const html = arr.map((el) => `<span class="btn">  ${el}</span>`);
  return html.join(" ");
};
const syno = ["hi", "helo", "how"];
createElement(syno);
loadPosts();
