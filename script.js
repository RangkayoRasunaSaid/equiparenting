document.addEventListener('DOMContentLoaded', function() {
    const apiUrlThreads = 'https://656b308bdac3630cf727d22c.mockapi.io/ceritaku/v1/threads/';
    document.getElementById('writingView').style.display = 'none';

    // Call the function to update the navbar on page load
    updateNavbar();    

    // Fetch threads from the API
    fetch(apiUrlThreads)
    .then(response => response.json())
    .then(threads => {
      // Reverse the order of threads
      threads.reverse();

      // Process threads
      threads.forEach(thread => {
        // Create HTML elements for threads
        const threadDiv = createThreadElement(thread);
  
        // Fetch comments for each thread
        fetch(apiUrlThreads + thread.id + '/comments')
          .then(response => response.json())
          .then(comments => {
            // Process comments
            const komentar = document.createElement('h6');
            komentar.classList.add('fw-bolder', 'mt-5');
            komentar.textContent = 'Komentar';
            threadDiv.appendChild(komentar);
            const threadComment = document.createElement('div');
  
            if (comments.length === 0) {
              const noCommentMessage = document.createElement('p');
              noCommentMessage.classList.add('mt-4', 'text-muted');
              noCommentMessage.textContent = 'Belum ada komentar. Jadilah yang pertama!';
              threadComment.appendChild(noCommentMessage);
            }
            comments.forEach(comment => {
              // Create HTML elements for comments
              const commentDiv = createCommentElement(comment);
              threadComment.appendChild(commentDiv);
            });
  
            // Add a textarea with character limit
            const textarea = document.createElement('textarea');
            textarea.classList.add('form-control', 'mt-3');
            textarea.setAttribute('rows', '1');

            // Check if currentUser exists
            if (!localStorage.getItem('currentUser')) {
                // If currentUser doesn't exist, change placeholder and add event listener for redirection
                textarea.setAttribute('placeholder', 'Sign in to comment');
                textarea.classList.add('text-center');
                textarea.style.cursor = 'pointer';
                textarea.addEventListener('click', function() {
                    window.location.href = 'akun/login-page.html';
                });
            } else {
                // If currentUser exists, set the regular placeholder
                textarea.setAttribute('placeholder', 'Tambahkan komentar...');
            }
            
            // Add a span to display characters left
            const charactersLeftSpan = document.createElement('p');
            charactersLeftSpan.classList.add('text-muted', 'small');
            charactersLeftSpan.textContent = '200 characters left';
            charactersLeftSpan.style.display = 'none';
            let lenRowAdded = [];
            
            textarea.addEventListener('input', function () {
              // Update characters left
              const maxCharacters = 200;
              const remainingCharacters = maxCharacters - this.value.trim().length;
              charactersLeftSpan.textContent = `${remainingCharacters} characters left`;
            
              // Show/hide the "Post" button based on textarea value
              if (this.value.trim().length > 0) {
                postButton.style.display = 'block';
                charactersLeftSpan.style.display = 'block';
              } else {
                this.rows = 1;
                postButton.style.display = 'none';
                charactersLeftSpan.style.display = 'none';
              }
    
              // Calculate the number of rows based on the length of the content
              this.maxLength = maxCharacters;
              if (isTextareaScrollable(this)) {
                this.rows += 1;
                lenRowAdded.push(remainingCharacters);
              } else if (lenRowAdded[lenRowAdded.length - 1] < remainingCharacters) {
                this.rows -= 1;
                lenRowAdded.pop();
              }
            });
            
            // Add a "Post" button
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            const postButton = document.createElement('button');
            postButton.classList.add('btn', 'mt-3', 'ms-2', 'post-button'); // Added margin to separate the "Post" button
            postButton.textContent = 'Post';
            postButton.style.display = 'none'; // Initially hide the button
            postButton.addEventListener('click', function () {
              // Handle posting the comment to the mock API
              const commentContent = textarea.value.trim();
            
              // Make a POST request to the API
              fetch(apiUrlThreads + thread.id + '/comments', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  username: currentUser.username.toLowerCase().split(" ").join(""),
                  avatar: currentUser.profilePicture,
                  content: commentContent,
                }),
              })
                .then(response => response.json())
                .then(data => {
                  console.log('Comment posted successfully:', data);
                  textarea.value = '';
                  postButton.style.display = 'none';
                  charactersLeftSpan.style.display = 'none';
                  const commentDiv = createCommentElement(data);

                  // Check if this is the first comment of the thread
                  let hasDirectParagraphChild = Array.from(threadComment.children).some(function(child) {
                    return child.tagName.toLowerCase() === 'p';
                  });

                  if (hasDirectParagraphChild) {
                    threadComment.innerHTML = '';
                  }
                  threadComment.appendChild(commentDiv);
                })
                .catch(error => console.error('Error posting comment:', error));
            });
            
            // Create a container for textarea, characters left, and the "Post" button
            const commentContainer = document.createElement('div');
            commentContainer.classList.add('d-flex', 'justify-content-between', 'align-items-center');
            commentContainer.appendChild(charactersLeftSpan);
            commentContainer.appendChild(postButton);
            
            threadDiv.appendChild(threadComment);  
            threadDiv.appendChild(textarea);  
            threadDiv.appendChild(commentContainer);            
          })
          .catch(error => console.error('Error fetching comments:', error));
  
        // Append the created thread element to the DOM
        document.getElementById('app').appendChild(threadDiv);
      });
    })
    .catch(error => console.error('Error fetching threads:', error));

  function isTextareaScrollable(textarea) {
    // Check if the content overflows vertically
    const isOverflowing = textarea.scrollHeight > textarea.clientHeight;

    // Check if the textarea has the overflow property set to 'auto' or 'scroll'
    const hasOverflowProperty = getComputedStyle(textarea).overflowY === 'auto' || getComputedStyle(textarea).overflowY === 'scroll';

    return isOverflowing && hasOverflowProperty;
  }
  
  function createThreadElement(thread) {
    const threadDiv = document.createElement('div');
    threadDiv.classList.add('ceritaku', 'rounded-5', 'mt-5', 'p-5');
  
    const userDiv = document.createElement('div');
    userDiv.classList.add('d-flex', 'align-items-center');
  
    const avatarContainer = document.createElement('div');
    avatarContainer.classList.add('me-3', 'square-image-container', 'flex-shrink-0');
  
    // Check if thread.avatar is empty
    if (!thread.avatar || thread.avatar == 'Profile.png') {
      // Create default avatar structure
      const defaultAvatar = document.createElement('div');
      defaultAvatar.classList.add('rounded-circle', 'bg-body', 'd-flex', 'justify-content-center', 'p-4');
  
      const defaultAvatarImg = document.createElement('img');
      defaultAvatarImg.src = 'https://cdn4.iconfinder.com/data/icons/eon-ecommerce-i-1/32/user_profile_man-256.png';
      defaultAvatarImg.width = '20';
      defaultAvatarImg.height = '20';
  
      defaultAvatar.appendChild(defaultAvatarImg);
      avatarContainer.appendChild(defaultAvatar);
    } else {
      const avatarImg = document.createElement('img');
      avatarImg.src = thread.avatar;
      avatarImg.classList.add('square-image');
      avatarContainer.appendChild(avatarImg);
    }
  
    const userInfoDiv = document.createElement('div');
    userInfoDiv.classList.add('flex-grow-1');
    const threadTitle = document.createElement('h5');
    threadTitle.classList.add('fw-bold');
    threadTitle.textContent = thread.title;
  
    userInfoDiv.appendChild(threadTitle);
  
    const username = document.createElement('p');
    username.classList.add('fw-medium', 'm-0');
    username.textContent = '@' + thread.username.toLowerCase().split(" ").join("");
    userInfoDiv.appendChild(username);
  
    const contentP = document.createElement('p');
    contentP.classList.add('mt-4');
    contentP.textContent = thread.content;
  
    userDiv.appendChild(avatarContainer);
    userDiv.appendChild(userInfoDiv);
    threadDiv.appendChild(userDiv);
    threadDiv.appendChild(contentP);
  
    return threadDiv;
  }
      
  function createCommentElement(comment) {
    const commentDiv = document.createElement('div');
  
    const picName = document.createElement('div');
    picName.classList.add('d-flex', 'align-items-center', 'mt-4');
  
    const avatarContainer = document.createElement('div');
    avatarContainer.classList.add('me-3', 'comment-image-container');
  
    // Check if comment.avatar is empty
    if (!comment.avatar || comment.avatar == 'Profile.png') {
      // Create default avatar structure
      const defaultAvatar = document.createElement('div');
      defaultAvatar.classList.add('rounded-circle', 'bg-body', 'd-flex', 'justify-content-center', 'p-2');
  
      const defaultAvatarImg = document.createElement('img');
      defaultAvatarImg.src = 'https://cdn4.iconfinder.com/data/icons/eon-ecommerce-i-1/32/user_profile_man-256.png';
      defaultAvatarImg.width = '20';
      defaultAvatarImg.height = '20';
  
      defaultAvatar.appendChild(defaultAvatarImg);
      avatarContainer.appendChild(defaultAvatar);
    } else {
      const avatarImg = document.createElement('img');
      avatarImg.src = comment.avatar;
      avatarImg.classList.add('square-image');
      avatarContainer.appendChild(avatarImg);
    }
  
    const username = document.createElement('h6');
    username.classList.add('fw-bolder', 'm-0');
    username.textContent = '@' + comment.username.toLowerCase().split(" ").join("");
  
    const commentContent = document.createElement('p');
    commentContent.classList.add('ms-5', 'ps-1');
    commentContent.textContent = comment.content;
  
    picName.appendChild(avatarContainer);
    picName.appendChild(username);
    commentDiv.appendChild(picName);
    commentDiv.appendChild(commentContent);
  
    return commentDiv;
  }
    
});
    
// Function to show the post form and hide the threads
function showPostForm() {
    if (!localStorage.getItem('currentUser')) {
        window.location.href = 'akun/login-page.html';
    }
    // Hide threads
    document.getElementById('threadView').style.display = 'none';

    const writeView = document.getElementById('writingView');
    writeView.style.display = 'block';
    writeView.innerHTML = '';

    // Create a form for posting
    const postForm = document.createElement('form');
    postForm.classList.add('post-form');

    // Create the elements for the form
    const closeButtonDiv = document.createElement('div');
    closeButtonDiv.classList.add('d-flex', 'justify-content-end');
    const closeButton = document.createElement('h4');
    closeButton.setAttribute('type', 'button');
    closeButton.innerHTML = '<i class="fas fa-times"></i>';
    
    // Create a container for the input and character count span
    const inputContainer = document.createElement('div');
    inputContainer.classList.add('position-relative', 'w-100');
    
    const titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.classList.add('form-control', 'rounded-5', 'form-control-lg', 'fw-bold');
    titleInput.setAttribute('id', 'postTitle');
    titleInput.setAttribute('required', 'true');
    titleInput.setAttribute('maxlength', '50'); // Set the character limit to 50
    titleInput.setAttribute('placeholder', 'Judul Cerita');
    
    // Create a span to display the character count
    const charCountSpan = document.createElement('span');
    charCountSpan.classList.add('border-0', 'text-muted', 'input-group-text', 'bg-transparent', 'm-0', 'position-absolute', 'end-0', 'bottom-0');
    charCountSpan.textContent = '0/50';
    
    // Add an input event listener to update the character count
    titleInput.addEventListener('input', function() {
      charCountSpan.textContent = this.value.length + '/50';
    });
    
    // Append the input and character count span to the container
    inputContainer.appendChild(titleInput);
    inputContainer.appendChild(charCountSpan);

    const contentGroup = document.createElement('div');
    contentGroup.classList.add('input-group', 'mt-3');

    // Create a container for the textarea and character count span
    const textareaContainer = document.createElement('div');
    textareaContainer.classList.add('position-relative', 'w-100');

    const contentTextarea = document.createElement('textarea');
    contentTextarea.classList.add('form-control', 'rounded-5', 'fs-5');
    contentTextarea.setAttribute('id', 'postContent');
    contentTextarea.setAttribute('rows', '7');
    contentTextarea.setAttribute('required', 'true');
    contentTextarea.setAttribute('maxlength', '200'); // Set the character limit to 200
    contentTextarea.setAttribute('placeholder', 'Tulis cerita parentingmu disini');

    // Create a span to display the character count
    const charCountSpanContent = document.createElement('span');
    charCountSpanContent.classList.add('border-0', 'text-muted', 'input-group-text', 'bg-transparent', 'm-0', 'position-absolute', 'end-0', 'bottom-0');
    charCountSpanContent.textContent = '0/200';

    // Add an input event listener to update the character count
    contentTextarea.addEventListener('input', function() {
      charCountSpanContent.textContent = this.value.length + '/200';
    });

    // Append the textarea and character count span to the container
    textareaContainer.appendChild(contentTextarea);
    textareaContainer.appendChild(charCountSpanContent);

    // Append the container to the content group
    contentGroup.appendChild(textareaContainer);

    closeButton.addEventListener('click', function() {
        if (titleInput.value.trim() !== '' || contentTextarea.value.trim() !== '') {
          closeButton.setAttribute('data-bs-toggle', 'modal');
          closeButton.setAttribute('data-bs-target', '#exampleModal');
        } else {
          showThreads();
        }
    });

    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'button');
    submitButton.classList.add('btn', 'post-button', 'btn-lg', 'rounded-5', 'form-control', 'fw-bolder', 'mt-3');
    submitButton.innerHTML = 'Bagikan';
    submitButton.addEventListener('click', submitPost);

    // Append the elements to the form
    closeButtonDiv.appendChild(closeButton);
    postForm.appendChild(closeButtonDiv);
    postForm.appendChild(document.createElement('div').appendChild(inputContainer).parentNode);
    postForm.appendChild(document.createElement('div').appendChild(contentGroup).parentNode);
    postForm.appendChild(submitButton);

    // Append the form to the body
    writeView.appendChild(postForm);

    // Create elements for the modal
    const modal = document.createElement('div');
    modal.classList.add('modal', 'fade');
    modal.setAttribute('id', 'exampleModal');
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby', 'exampleModalLabel');
    modal.setAttribute('aria-hidden', 'true');
    
    const modalDialog = document.createElement('div');
    modalDialog.classList.add('modal-dialog');
    
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    
    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');
    
    const modalTitle = document.createElement('h1');
    modalTitle.classList.add('modal-title', 'fs-5');
    modalTitle.setAttribute('id', 'exampleModalLabel');
    modalTitle.innerHTML = 'Hapus Perubahan';
    
    const closeButtonModal = document.createElement('button');
    closeButtonModal.setAttribute('type', 'button');
    closeButtonModal.classList.add('btn-close');
    closeButtonModal.setAttribute('data-bs-dismiss', 'modal');
    closeButtonModal.setAttribute('aria-label', 'Close');
    
    const modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');
    modalBody.innerHTML = 'Apakah Anda ingin menghapus perubahan?';
    
    const modalFooter = document.createElement('div');
    modalFooter.classList.add('modal-footer');
    
    const cancelButton = document.createElement('button');
    cancelButton.setAttribute('type', 'button');
    cancelButton.classList.add('btn', 'btn-secondary');
    cancelButton.setAttribute('data-bs-dismiss', 'modal');
    cancelButton.innerHTML = 'Batal';
    
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('type', 'button');
    deleteButton.classList.add('btn', 'btn-primary');
    deleteButton.setAttribute('data-bs-dismiss', 'modal');
    deleteButton.addEventListener('click', function() {
      modal.remove();
      showThreads();
  });
    deleteButton.innerHTML = 'Hapus';
    
    // Append elements to the modal
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButtonModal);
    modalFooter.appendChild(cancelButton);
    modalFooter.appendChild(deleteButton);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);

    // Append the modal to the body
    document.body.appendChild(modal);

}

// Function to submit the post to the API
function submitPost() {
    const postTitle = document.getElementById('postTitle').value;
    const postContent = document.getElementById('postContent').value;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Make a POST request to the API
    fetch('https://656b308bdac3630cf727d22c.mockapi.io/ceritaku/v1/threads', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        title: postTitle,
        content: postContent,
        username: currentUser.username.toLowerCase().split(" ").join(""),
        avatar: currentUser.profilePicture,
    }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Post submitted successfully:', data);
        // Remove the post form
        document.querySelector('.post-form').remove();
        location.reload();
    })
    .catch(error => console.error('Error submitting post:', error));
}

function showThreads() {
    document.getElementById('threadView').style.display = 'block';
    document.getElementById('writingView').style.display = 'none';
}

// Function to update the navigation bar based on the login status
function updateNavbar() {
  const navbarList = document.getElementById('navbarList');
  const threadProfPic = document.querySelector('#threadProfPic#threadProfPicImg');

  // Check if the currentUser exists in local storage
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (currentUser) {
    // If the user is logged in, display the profile picture
    const profileLink = document.createElement('li');
    profileLink.classList.add('nav-item', 'mx-2', 'd-flex', 'justify-content-center');

    const profileImage = document.createElement('a');
    profileImage.classList.add('nav-link', 'border-0');
    profileImage.href = 'akun/profile-page.html';
    const defaultProfileImg = 'https://cdn4.iconfinder.com/data/icons/eon-ecommerce-i-1/32/user_profile_man-256.png';

    if (!currentUser.profilePicture || currentUser.profilePicture == 'Profile.png') {
      // If using the default picture, add the default structure
      const defaultImgContainer = document.createElement('div');
      defaultImgContainer.classList.add('rounded-circle', 'border', 'bg-body', 'd-flex', 'justify-content-center', 'p-2');
      
      const defaultImg = document.createElement('img');
      defaultImg.src = defaultProfileImg;
      defaultImg.width = '20';
      defaultImg.height = '20';

      defaultImgContainer.appendChild(defaultImg);
      profileImage.appendChild(defaultImgContainer);
    } else {
      const profileImg = document.createElement('img');
      profileImg.src = currentUser.profilePicture || defaultProfileImg;
      profileImg.width = '40';
      profileImg.height = '40';
      profileImg.classList.add('rounded-circle');
      profileImage.appendChild(profileImg);
      document.getElementById('threadProfPicImg').src = profileImg.src;
      document.getElementById('threadProfPic').classList.remove('p-4');
    }
    
    profileLink.appendChild(profileImage);
    navbarList.innerHTML = ''; // Clear the existing navbar content
    navbarList.appendChild(profileLink);
  } else {
    // If the user is not logged in, display the login and register buttons
    const loginButton = document.createElement('li');
    loginButton.classList.add('nav-item', 'mx-2', 'd-flex', 'justify-content-center');

    const loginLink = document.createElement('a');
    loginLink.classList.add('nav-link', 'masuk', 'border');
    loginLink.href = 'akun/login-page.html';
    loginLink.textContent = 'Masuk';

    loginButton.appendChild(loginLink);
    navbarList.appendChild(loginButton);

    const registerButton = document.createElement('li');
    registerButton.classList.add('nav-item', 'mx-2', 'd-flex', 'justify-content-center');

    const registerLink = document.createElement('a');
    registerLink.classList.add('nav-link', 'daftar');
    registerLink.href = 'akun/register-page.html';
    registerLink.textContent = 'Daftar';

    registerButton.appendChild(registerLink);
    navbarList.appendChild(registerButton);
  }
}