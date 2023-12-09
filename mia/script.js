// === Fetching article data from API ===
// Define an asynchronous function to fetch and process article data
const endpoint = "https://656bc554e1e03bfd572dd28f.mockapi.io/parenting/article";
const getArticles = async () => {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    const listArticles = document.getElementById('list-articles');

    if (Array.isArray(data)) {
      data.forEach(article => {
        const articleCard = document.createElement('div');
        articleCard.classList.add('card', 'mb-5');

        articleCard.innerHTML = `
          <div class="row g-3">
            <div class="col-md-6 order-md-2">
              <img src="./image/${article.image}" class="img-fluid" style="float: right;">
            </div>
            <div class="col-md-6">
              <div class="card-body">
                <h5 class="card-title">${article.title}</h5>
                <p class="card-text mt-3">${article.description}</p>
                <a id="bacaSelanjutnyaBtn-${article.id}" href="#" class="btn mt-3">Baca Selanjutnya</a>
              </div>
            </div>
          </div>`;

        const bacaSelanjutnyaBtn = articleCard.querySelector(`#bacaSelanjutnyaBtn-${article.id}`);
        bacaSelanjutnyaBtn.addEventListener('click', (event) => {
          event.preventDefault();
          handleBacaSelanjutnyaClick(article.id);
        });

        listArticles.appendChild(articleCard);
      });
    } else {
      console.error('Error: "articles" field is not an array.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const changeChildAge = (selectedAge) => {
  document.getElementById('childAgeBtn').innerText = selectedAge;
};

const changeCategory = (selectedCategory) => {
  document.getElementById('categoryBtn').innerText = selectedCategory;
};

const displayArticles = (category = null) => {
  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      const listArticles = document.getElementById('list-articles');
      listArticles.innerHTML = '';
      console.log('semua artikel:', data)
      console.log('kategori:0', category)

      if (Array.isArray(data)) {
        data.forEach(article => {
          // Check if a category is specified or if the category matches
          if (!category || article.category === category) {
            const articleCard = document.createElement('div');
            articleCard.classList.add('card', 'mb-5');

            articleCard.innerHTML = `
              <div class="row g-3">
                <div class="col-md-6 order-md-2">
                  <img src="image/${article.image}" class="img-fluid" style="float: right;">
                </div>
                <div class="col-md-6">
                  <div class="card-body">
                    <h5 class="card-title">${article.title}</h5>
                    <p class="card-text mt-3">${article.description}</p>
                    <a id="bacaSelanjutnyaBtn-${article.id}" href="#" class="btn mt-3">Baca Selanjutnya</a>
                  </div>
                </div>
              </div>`;

            const bacaSelanjutnyaBtn = articleCard.querySelector(`#bacaSelanjutnyaBtn-${article.id}`);
            bacaSelanjutnyaBtn.addEventListener('click', (event) => {
              event.preventDefault();
              handleBacaSelanjutnyaClick(article.id);
            });

            listArticles.appendChild(articleCard);
            console.log("artikel sesuai topik", article); // <--- Log the article here
          }
        });
      }else{
        console.error('Error: Data format is incorrect.');
      }
    })
    .catch(error => console.error('Error fetching data:', error));
};

document.getElementById('all').addEventListener('click', () => {
  displayArticles('');
});

document.getElementById('Pola Asuh').addEventListener('click', () => {
  displayArticles('Pola Asuh');
  changeStyle('Pola Asuh');
  sessionStorage.setItem('selectedTopic', 'Pola Asuh');
});

// ... (event listeners for other categories)
document.getElementById('Emosi & Self Awarness').addEventListener('click', () => {
  displayArticles('Emosi & Self Awarness');
  changeStyle('Emosi & Self Awarness');
  sessionStorage.setItem('selectedTopic', 'Emosi & Self Awarness');
});
document.getElementById('Perilaku').addEventListener('click', () => {
  displayArticles('Perilaku');
  changeStyle('Perilaku');
  sessionStorage.setItem('selectedTopic', 'Perilaku');
});
document.getElementById('Sosial').addEventListener('click', () => {
  displayArticles('Sosial');
  changeStyle('Sosial');
  sessionStorage.setItem('selectedTopic', 'Sosial');
});
const changeStyle = (selectedTopic) => {
  document.querySelectorAll('.topics p').forEach(topic => {
    topic.style.fontWeight = 'normal';
    topic.style.textDecoration = 'none';
  });

  const selectedElement = document.getElementById(selectedTopic);
  selectedElement.style.fontWeight = '600';
  selectedElement.style.textDecoration = 'underline';
};

document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const topicParam = urlParams.get('topic');
  const storedTopic = sessionStorage.getItem('selectedTopic');

  if (storedTopic) {
    displayArticles(storedTopic);
    changeStyle(storedTopic);
  } else if (topicParam) {
    displayArticles(topicParam);
    changeStyle(topicParam);
    sessionStorage.setItem('selectedTopic', topicParam);
  }
});



// fetch('https://656bc554e1e03bfd572dd28f.mockapi.io/parenting/comments')
//   .then(response => response.json())
//   .then(data => {
//     const commentSection = document.getElementById('comment-section');
//     console.log(data)

//     // Create HTML for comments
//     const commentHTML = data.map(comments => `
//       <div class="user-comments-container mt-5 mb-5">
//         <div class="row d-flex justify-content-center">
//           <div class="col-md-12">
//             <p class="mb-4">Komentar <span> 1 </span></p>
//             <div class="card">
//               <div class="col">
//                 <div class="mt-4 d-flex flex-start">
//                   <img class="rounded-circle shadow-1-strong me-3" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp" alt="avatar" width="65" height="65" />

//                   <div class="flex-grow-1 flex-shrink-1">
//                     <div class="d-flex justify-content-between align-items-center">
//                       <p class="mb-1">${comments.username} <span class="small">- 2 hours ago</span></p>
//                     </div>
//                     <p class="small mb-0">${comments.comment}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>  
//     `).join('');

//     // Set innerHTML to display comments
//     commentSection.innerHTML = commentHTML;
//   })
//   .catch(error => console.error('Error fetching comments:', error));

  

// const commentSection = document.getElementById('commentSection');
// console.log(data);
//   // Create HTML for comments
//   const commentsHTML = data.map(article => `
//    <div class="card mt-3">
//      <div class="card-body">
//        <h5 class="card-title">${article.username}</h5>
//        <p class="card-text">${article.comment}</p>
//      </div>
//    </div>
//  `).join('');

//   // Set innerHTML to display comments
//   commentSection.innerHTML = commentsHTML;
// })
// .catch(error => console.error('Error fetching comments:', error));




// const getDataComments = async () => {
//   try {
//     const response = await fetch('https://656bc554e1e03bfd572dd28f.mockapi.io/parenting/articles'); // Fetch data from a JSON file (mockAPI)
//     const data = await response.json(); // Parse the JSON data
//     // Check if the articles field is an array
//     if (Array.isArray(data)) {
//       // Get the element where articles will be displayed
//       const listArticles = document.getElementById('comment-section');

//       // Iterate through each article and append HTML to the list
//       data.forEach((article) => {
//         listArticles.innerHTML += `
//         <div class="row-md-3">
//             <div class="card mb-5">
//               <div class="row g-3">
//                 <div class="col-md-6 order-md-2">
//                   <img src="image/${article.image}" class="img-fluid" style="float: right;">
//                 </div>
//                 <div class="col-md-6">
//                   <div class="card-body">
//                     <h5 class="card-title">${article.title}</h5>
//                     <p class="card-text mt-3">${article.description}</p>
//                     <a href="/Parenting/articles/article1.html" class="btn mt-3">Baca Selanjutnya</a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>`;
//       });

//       // Log the array of articles to the console
//       // console.log(data.articles);
//     } else {
//       // Log an error if the articles field is not an array
//       console.error('Error: "articles" field is not an array.');
//     }
//   } catch (error) {
//     // Log an error if there's an issue with fetching or parsing data
//     console.error('Error:', error);
//   }
// }

// // Call the function to fetch and display articles
// getDataComments();






















// === Icon back ===
// document.addEventListener("DOMContentLoaded", () => {
//   // Add click event to the back link 
//   document.getElementById("backLink").addEventListener("click", () => {
//     window.history.back();
//   });
// });





// //===== 
// const displayTips = (tips = null, age = null, category = null) => {
//   fetch('data/articles.json')
//     .then(response => response.json())
//     .then(data => {
//       const listArticles = document.getElementById('list-articles');
//       listArticles.innerHTML = ''; // Clear existing content

//       const articles = data.articles;

//       articles.forEach(article => {
//         // Check if the article matches the specified tips, age, and category
//         if ((!tips || article.tips === tips) &&
//           (!age || article.age === age) &&
//           (!category || article.category === category)) {
//           listArticles.innerHTML += `
//             <div class="row-md-4">
//               <div class="card mb-5">
//                 <div class="row">
//                     <div class="col-md-6 order-md-2">
//                         <img src="image/${article.image}" class="img-fluid" style="float: right;">
//                     </div>
//                     <div class="col-md-6">
//                         <div class="card-body">
//                             <h5 class="card-title">${article.title}</h5>
//                             <p class="card-text mt-3">${article.description}</p>
//                             <a href="/Parenting/articles/article1.html" class="btn mt-3">Baca Selanjutnya</a>
//                         </div>
//                     </div>
//                 </div>
//               </div>
//           </div>`;
//         }
//       });
//     })
//     .catch(error => console.error('Error fetching data:', error));
// };

// // Example usage:
// // Display articles with tips 'Tips Parenting', age '3 tahun', and category 'Emosi & Self Awarness'
// // displayTips('Tips Parenting', '3 tahun', 'Emosi & Self Awarness');



// // === Selected age and category on dropdown menu ===
// // Change the text on the button to the selected age

// // Click event listener for "Tips Parenting" category
// document.getElementById('tips-parenting').addEventListener('click', () => {
//   displayTips('Tips Parenting');
// });

// // Click event listener for "All" category
// document.getElementTips('topic-all').addEventListener('click', () => {
//   displayArticles('');
// });

// // Click event listener for "Pola Asuh" category
// document.getElementById('topic-polaasuh').addEventListener('click', () => {
//   displayTips('Pola Asuh');
// });

// //=====



