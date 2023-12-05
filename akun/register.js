document.addEventListener('DOMContentLoaded', function () {
  let form = document.querySelector('.form');

  form.addEventListener('submit', function (event) {
      event.preventDefault();

      let username = document.getElementById('username').value;
      let email = document.getElementById('email').value;
      let password = document.getElementById('password').value;
      let confirmPassword = document.getElementById('confirmPassword').value;

      let defaultProfilePicture = 'Profile.png';

      localStorage.setItem('profilePicture', defaultProfilePicture);

      if (password !== confirmPassword) {
          alert('Password dan Konfirmasi Password tidak cocok');
          return;
      }

      let existingUserData = JSON.parse(localStorage.getItem('userList')) || [];

      let userData = {
          username: username,
          email: email,
          password: password,
          profilePicture: localStorage.getItem('profilePicture') || defaultProfilePicture,
      };

      existingUserData.push(userData);

      localStorage.setItem('userList', JSON.stringify(existingUserData));

      alert('Pendaftaran akun anda berhasil');

      window.location.href = 'login-page.html';
  });
});
