document.addEventListener('DOMContentLoaded', function () {
  let profileForm = document.querySelector('.ubah-profile');

  let profilePicture = document.getElementById('picture');
  let usernameInput = document.querySelector('.username-input input');
  let fileInput = document.getElementById('file');

  let currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
  let userList = JSON.parse(localStorage.getItem('userList')) || [];

  if (currentUser) {
    profilePicture.setAttribute('src', currentUser.profilePicture);
    usernameInput.value = currentUser.username;
  }

  fileInput.addEventListener('change', function () {
    const chosenFile = this.files[0];

    if (chosenFile) {
      const reader = new FileReader();

      reader.addEventListener('load', function () {
        profilePicture.setAttribute('src', reader.result);
      });

      reader.readAsDataURL(chosenFile);
    }
  });

  profileForm.addEventListener('submit', function (event) {
    event.preventDefault(); 

    let newProfilePicture = profilePicture.getAttribute('src');
    let newUsername = usernameInput.value;

    currentUser.profilePicture = newProfilePicture;
    currentUser.username = newUsername;

    let userIndex = userList.findIndex(user => user.email === currentUser.email);

    if (userIndex !== -1) {
      userList[userIndex] = currentUser;
      localStorage.setItem('userList', JSON.stringify(userList));
    }

    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    alert('Perubahan berhasil disimpan');
  });

  
  
  
  // password's part
  let passwordForm = document.querySelector('.ubah-password');

  let passwordInput = document.getElementById('password');
  let newPasswordInput = document.getElementById('passwordNew');
  let confirmPasswordInput = document.getElementById('confirmPassword');

  passwordForm.addEventListener('submit', function (event) {
      event.preventDefault(); 

      let currentPassword = passwordInput.value;
      let newPassword = newPasswordInput.value;
      let confirmPassword = confirmPasswordInput.value;

      if (currentPassword !== currentUser.password) {
          alert('Password salah');
          return;
      }

      if (currentPassword === newPassword) {
          alert('Password baru harus berbeda dengan Password lama');
          return;
      }

      if (newPassword !== confirmPassword) {
          alert('Password baru harus sama dengan Konfirmasi Password');
          return;
      }

      currentUser.password = newPassword;

      let userIndex = userList.findIndex(user => user.email === currentUser.email);

      if (userIndex !== -1) {
          userList[userIndex].password = newPassword;
          localStorage.setItem('userList', JSON.stringify(userList));
      }

      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      alert('Perubahan password berhasil disimpan');

      passwordInput.value = '';
      newPasswordInput.value = '';
      confirmPasswordInput.value = '';
  });
});