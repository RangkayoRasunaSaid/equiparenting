document.addEventListener('DOMContentLoaded', function () {
  let form = document.querySelector('.form');

  form.addEventListener('submit', function (event) {
      event.preventDefault();

      let username = document.getElementById('username').value;
      let email = document.getElementById('email').value;
      let password = document.getElementById('password').value;
      let confirmPassword = document.getElementById('confirmPassword').value;

      let defaultProfilePicture = 'Profile.png';

      if (password !== confirmPassword) {
          alert('Password dan Konfirmasi Password tidak cocok');
          return;
      }

      let existingUserData = JSON.parse(localStorage.getItem('userList')) || [];

      let emailAlreadyExists = existingUserData.some(user => user.email === email);

      if (emailAlreadyExists) {
          alert('E-mail sudah terdaftar');
          return;
      }

      let userData = {
          username: username,
          email: email,
          password: password,
          profilePicture: defaultProfilePicture,
      };

      existingUserData.push(userData);

      localStorage.setItem('userList', JSON.stringify(existingUserData));

      alert('Pendaftaran akun anda berhasil');

      window.location.href = 'login-page.html';
  });
});
