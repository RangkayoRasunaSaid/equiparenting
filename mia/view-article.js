// Mengambil ID artikel dari URL
const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get('id');

// URL API dengan ID artikel yang diambil dari URL
const articleEndpoint = `https://656bc554e1e03bfd572dd28f.mockapi.io/parenting/article/${articleId}`;

// Mendapatkan data artikel dari API berdasarkan ID
const getArticleDetails = async () => {
  try {
    const response = await fetch(articleEndpoint);
    const data = await response.json();
    console.log(data);

    // Tampilkan informasi artikel di halaman
    document.getElementById('articleTitle').innerHTML = data.title;
    document.getElementById('articleImage').src = `../mia/image/${data.image}`;
    document.getElementById('articleContent').innerHTML = data.content;
    // Tambahkan informasi lainnya sesuai kebutuhan
    
  } catch (error) {
    console.error('Error:', error);
  }
};

// Panggil fungsi untuk mendapatkan detail artikel saat halaman dimuat
getArticleDetails();
