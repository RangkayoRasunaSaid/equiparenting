// =============  Fetching article data from API ============= 
// Define an asynchronous function to fetch and process article data
const endpoint = "https://656bc554e1e03bfd572dd28f.mockapi.io/parenting/article"
const getArticles = async () => {
  try {
    const response = await fetch(endpoint); // Fetch data from API
    const data = await response.json(); // Parse the JSON data
    console.log(data)

    // Check if the articles field is an array
    if (Array.isArray(data)) {
      // Get the element where articles will be displayed
      const listArticles = document.getElementById('list-articles');

      // Iterate through each article and append HTML to the list
      data.forEach((article) => {
        listArticles.innerHTML += `
        <div class="row-md-3">
            <div class="card mb-5">
              <div class="row g-3">
                <div class="col-md-6 order-md-2">
                  <img src="image/${article.image}" class="img-fluid" style="float: right;">
                </div>
                <div class="col-md-6">
                  <div class="card-body">
                    <h5 class="card-title">${article.title}</h5>
                    <p class="card-text mt-3">${article.description}</p>
                    <a href="articles/article1.html?id=${article.id}" class="btn mt-2">Baca Selanjutnya</a>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
      });

      // Log the array of articles to the console
      console.log(data.articles);
    } else {
      // Log an error if the articles field is not an array
      console.error('Error: "articles" field is not an array.');
    }
  } catch (error) {
    // Log an error if there's an issue with fetching or parsing data
    console.error('Error:', error);
  }
}

// Call the function to fetch and display articles
getArticles();




// ============= Category button ============= 
// Change the text on the button to the selected age
const changeChildAge = (selectedAge) => {
  document.getElementById('childAgeBtn').innerText = selectedAge;
};

// Change the text on the button to the selected category
const changeCategory = (selectedCategory) => {
  document.getElementById('categoryBtn').innerText = selectedCategory;
};


// =============  Fetch and display articles based on topic category ============= 
const displayArticles = (category = null) => {
  fetch('https://656bc554e1e03bfd572dd28f.mockapi.io/parenting/article')
    .then(response => response.json())
    .then(data => {
      const listArticles = document.getElementById('list-articles');
      listArticles.innerHTML = ''; // Clear existing content

      const article = data;

      article.forEach(article => {
        // Check if a category is specified or if the category matches
        if (!category || article.category === category) {
          listArticles.innerHTML += `
            <div class="row-md-4">
              <div class="card mb-5">
                <div class="row">
                  <div class="col-md-6 order-md-2">
                    <img src="image/${article.image}" class="img-fluid" style="float: right;">
                  </div>
                  <div class="col-md-6">
                    <div class="card-body">
                      <h5 class="card-title">${article.title}</h5>
                      <p class="card-text mt-3">${article.description}</p>
                      <a href="articles/article1.html?id=${article.id}" class="btn mt-2">Baca Selanjutnya</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;
        }
      });
    })
    .catch(error => console.error('Error fetching data:', error));
};

// Click event listener for "All" category
document.getElementById('topic-all').addEventListener('click', () => {
  displayArticles('');
});

// Click event listener for "Pola Asuh" category
document.getElementById('topic-polaasuh').addEventListener('click', () => {
  displayArticles('Pola Asuh');
});

// Click event listener for "Emosi & Self Awarness" category
document.getElementById('topic-emosi').addEventListener('click', () => {
  displayArticles('Emosi & Self Awarness');
});

// Click event listener for "Perilaku" category
document.getElementById('topic-perilaku').addEventListener('click', () => {
  displayArticles('Perilaku');
});

// Click event listener for "Sosial" category
document.getElementById('topic-sosial').addEventListener('click', () => {
  displayArticles('Sosial');
});


// ============= Change styles for the clicked element in the category based on the article topics (footer) ============= 
const changeStyle = selectedTopic => {
  // Remove styles from all elements
  document.querySelectorAll('.topics p').forEach(topic => {
    topic.style.fontWeight = 'normal';
    topic.style.textDecoration = 'none';
  });

  // Add styles to the clicked element
  const selectedElement = document.getElementById(selectedTopic);
  selectedElement.style.fontWeight = '600';
  selectedElement.style.textDecoration = 'underline';
};

// Click event listener for "Pola Asuh" category (footer)
document.getElementById('footer-polaasuh').addEventListener('click', () => {
  displayArticles('Pola Asuh');
});

// Click event listener for "Emosi & Self Awarness" category (footer)
document.getElementById('footer-emosi').addEventListener('click', () => {
  displayArticles('Emosi & Self Awarness');
});

// Click event listener for "Perilaku" category (footer)
document.getElementById('footer-perilaku').addEventListener('click', () => {
  displayArticles('Perilaku');
});

// Click event listener for "Sosial" category (footer)
document.getElementById('footer-sosial').addEventListener('click', () => {
  displayArticles('Sosial');
});



// ============= Change styles for the clicked element in the category based on the article topics (footer) ============= 
const changeTopic = selectedTopic => {
  // Remove styles from all elements
  document.querySelectorAll('.topicFooter p').forEach(topic => {
    topic.style.fontWeight = 'normal';
    topic.style.textDecoration = 'none';
  });

  // Add styles to the clicked element
  const selectedElement = document.getElementById(selectedTopic);
  selectedElement.style.fontWeight = '600';
};
























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