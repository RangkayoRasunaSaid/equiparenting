document.addEventListener('DOMContentLoaded', function () {
    let form = document.querySelector('.form');
  
    form.addEventListener('submit', function (event) {
      event.preventDefault(); 
  
      let email = document.getElementById('email').value;
      let password = document.getElementById('password').value;
  
      let userList = JSON.parse(localStorage.getItem('userList')) || [];
  
      let user = userList.find(user => user.email === email);
  
      if (!user) {
        alert('E-mail tidak terdaftar');
        return;
      }
  
      if (user.password !== password) {
        alert('Password yang dimasukkan salah');
        return;
      }
  
      localStorage.setItem('currentUser', JSON.stringify(user));

      alert('Login berhasil');
      window.location.href = '../home/index.html';
    });
  });
  