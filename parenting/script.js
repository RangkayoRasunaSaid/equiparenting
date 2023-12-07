// =============  Fetching article data from API ============= 
// Define an asynchronous function to fetch and process article data
const endpoint = "https://65717eedd61ba6fcc012b991.mockapi.io/parenting/articles"
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
        // Create elements for the article
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('row-md-3');
      
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'mb-5');
      
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row', 'g-3');
      
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('col-md-6', 'order-md-2');
      
        const image = document.createElement('img');
        image.src = article.image;
        image.classList.add('img-fluid');
        image.style.float = 'right';
      
        imageDiv.appendChild(image);
      
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('col-md-6');
      
        const cardBodyDiv = document.createElement('div');
        cardBodyDiv.classList.add('card-body');
      
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = article.title;
      
        const cardText = document.createElement('p');
        cardText.classList.add('card-text', 'mt-3');
        cardText.textContent = article.description;
      
        const readMoreLink = document.createElement('div');
        readMoreLink.classList.add('btn', 'mt-2', 'read-more');
        readMoreLink.setAttribute('data-title', article.title);
        readMoreLink.setAttribute('data-image-url', article.image);
        readMoreLink.setAttribute('data-markdown-url', article.content);
        readMoreLink.textContent = 'Baca Selanjutnya';
      
        // Append elements in the hierarchy
        cardBodyDiv.appendChild(cardTitle);
        cardBodyDiv.appendChild(cardText);
        cardBodyDiv.appendChild(readMoreLink);
      
        contentDiv.appendChild(cardBodyDiv);
      
        rowDiv.appendChild(imageDiv);
        rowDiv.appendChild(contentDiv);
      
        cardDiv.appendChild(rowDiv);
      
        articleDiv.appendChild(cardDiv);
      
        // Append the article to the listArticles container
        listArticles.appendChild(articleDiv);
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
document.querySelector('#article').style.display = 'none';


// Add event listener to the links with the class 'read-more'
document.addEventListener('DOMContentLoaded', function () {
  // Create a new Showdown converter
  const converter = new showdown.Converter();

  // Add click event listener to a parent element
  document.body.addEventListener('click', async (event) => {
    const button = event.target.closest('.read-more');
    if (button) {
      // Hide the 'main' class
      document.querySelector('.main').style.display = 'none';
      document.querySelector('#article').style.display = 'block';
  
      // Fetch the content of the markdown file from GitHub
      const response = await fetch(button.getAttribute('data-markdown-url'));
      const markdownContent = await response.text();
  
      // Convert Markdown to HTML using showdown.js
      const htmlContent = converter.makeHtml(markdownContent);
  
      // Replace the content of the 'main' class with the generated HTML
      const articleContainer = document.querySelector('#markdown-container');
      articleContainer.innerHTML = ''; // Clear existing content
  
      // Additional content (e.g., heading and image)
      const headingDiv = document.createElement('div');
      headingDiv.classList.add('heading');
      const headingP = document.createElement('p');
      headingP.classList.add('h3', 'my-4');
      headingP.textContent = button.getAttribute('data-title');
  
      const imageDiv = document.createElement('div');
      imageDiv.classList.add('image');
      const articleImg = document.createElement('img');
      articleImg.src = button.getAttribute('data-image-url');
      articleImg.classList.add('img-fluid', 'rounded-start', 'mb-4');
      articleImg.style.width = '100%';
  
      headingDiv.appendChild(headingP);
      imageDiv.appendChild(articleImg);
  
      articleContainer.appendChild(headingDiv);
      articleContainer.appendChild(imageDiv);
  
      // Create a temporary container for the HTML content
      const tempContainer = document.createElement('div');
      tempContainer.innerHTML = htmlContent;
  
      // Append each child node from the temporary container to the article container
      tempContainer.childNodes.forEach((childNode) => {
        articleContainer.appendChild(childNode.cloneNode(true));
      });
    }
  });  

  document.querySelector('#backLink').addEventListener('click', () => {
    document.querySelector('#article').style.display = 'none';
    document.querySelector('.main').style.display = 'block';
  });
});



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
  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      const listArticles = document.getElementById('list-articles');
      listArticles.innerHTML = ''; // Clear existing content

      const article = data;

      article.forEach(article => {
        // Check if a category is specified or if the category matches
        if (!category || article.category === category) {
          // Create elements for the article
          const articleDiv = document.createElement('div');
          articleDiv.classList.add('row-md-3');
        
          const cardDiv = document.createElement('div');
          cardDiv.classList.add('card', 'mb-5');
        
          const rowDiv = document.createElement('div');
          rowDiv.classList.add('row', 'g-3');
        
          const imageDiv = document.createElement('div');
          imageDiv.classList.add('col-md-6', 'order-md-2');
        
          const image = document.createElement('img');
          image.src = article.image;
          image.classList.add('img-fluid');
          image.style.float = 'right';
        
          imageDiv.appendChild(image);
        
          const contentDiv = document.createElement('div');
          contentDiv.classList.add('col-md-6');
        
          const cardBodyDiv = document.createElement('div');
          cardBodyDiv.classList.add('card-body');
        
          const cardTitle = document.createElement('h5');
          cardTitle.classList.add('card-title');
          cardTitle.textContent = article.title;
        
          const cardText = document.createElement('p');
          cardText.classList.add('card-text', 'mt-3');
          cardText.textContent = article.description;
        
          const readMoreLink = document.createElement('div');
          readMoreLink.classList.add('btn', 'mt-2', 'read-more');
          readMoreLink.setAttribute('data-title', article.title);
          readMoreLink.setAttribute('data-image-url', article.image);
          readMoreLink.setAttribute('data-markdown-url', article.content);
          readMoreLink.textContent = 'Baca Selanjutnya';
        
          // Append elements in the hierarchy
          cardBodyDiv.appendChild(cardTitle);
          cardBodyDiv.appendChild(cardText);
          cardBodyDiv.appendChild(readMoreLink);
        
          contentDiv.appendChild(cardBodyDiv);
        
          rowDiv.appendChild(imageDiv);
          rowDiv.appendChild(contentDiv);
        
          cardDiv.appendChild(rowDiv);
        
          articleDiv.appendChild(cardDiv);
        
          // Append the article to the listArticles container
          listArticles.appendChild(articleDiv);
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