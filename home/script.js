// Fungsi untuk menangani perubahan ukuran layar
function handleScreenSizeChange() {
  const isLargeScreen = window.matchMedia("(min-width: 930px)").matches;
  const isMediumScreen = window.matchMedia("(min-width: 700px) and (max-width: 929px)").matches;
  
  if (isLargeScreen) {
    initializeCarousel($(".carousel-item").width() * 5);
  } else if (isMediumScreen) {
    initializeCarousel($(".carousel-item").width() * 3);
  }
}

// Mendapatkan carousel yang digunakan
var multipleCardCarousel = document.querySelector("#carouselExampleControls");

// Fungsi untuk menginisialisasi carousel
function initializeCarousel(cardWidth) {
  var carousel = new bootstrap.Carousel(multipleCardCarousel, { interval: false });
  var carouselWidth = $(".carousel-inner")[0].scrollWidth;
  var scrollPosition = 0;

  $("#carouselExampleControls .carousel-control-prev").hide();

  $("#carouselExampleControls .carousel-control-next").on("click", function () {
    if (scrollPosition < carouselWidth - cardWidth) {
      scrollPosition += cardWidth;
      $("#carouselExampleControls .carousel-inner").animate({ scrollLeft: scrollPosition }, 600);
      $("#carouselExampleControls .carousel-control-prev").show();
      if (scrollPosition >= carouselWidth - cardWidth) {
        $("#carouselExampleControls .carousel-control-next").hide();
      }
    }
  });

  $("#carouselExampleControls .carousel-control-prev").on("click", function () {
    if (scrollPosition > 0) {
      scrollPosition -= cardWidth;
      $("#carouselExampleControls .carousel-inner").animate({ scrollLeft: scrollPosition }, 600);
      $("#carouselExampleControls .carousel-control-next").show();
      if (scrollPosition === 0) {
        $("#carouselExampleControls .carousel-control-prev").hide();
      }
    }
  });
}

// Fungsi untuk mengambil data dari API
async function fetchData() {
  try {
    const response = await fetch('https://656bc554e1e03bfd572dd28f.mockapi.io/parenting/article');
    const data = await response.json();
    return data; // Mengembalikan data dari API
  } catch (error) {
    console.error('Error fetching data:', error);
    return []; // Mengembalikan array kosong jika terjadi error
  }
}

// Fungsi untuk mengisi carousel dengan data dari API
async function isiCarouselDenganData() {
  const carouselInner = document.querySelector('.carousel-inner');

  try {
    const data = await fetchData(); // Ambil data dari API

    // Hapus semua card yang ada di dalam carousel
    carouselInner.innerHTML = '';
    console.log('Data API:', data);
    // Loop melalui setiap item data dari API dan buat card baru untuk setiap data
    data.forEach((item, index) => {
      const card = document.createElement('div');
      card.classList.add('carousel-item');
      if (index === 0) {
        card.classList.add('active');
      }

      card.innerHTML = `
        <div class="card">
          <div class="card-img-top">
            <img src="../image/${item.image}" alt="${item.title}" />
          </div>
          <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text">${item.description}</p>
            <a id="bacaSelanjutnyaBtn-${item.id}" href="../articles/article1.html?id=${item.id}" class="btn btn-primary">Baca Selengkapnya</a>
          </div>
        </div>
      `;
      carouselInner.appendChild(card);
    });
  } catch (error) {
    console.error('Gagal mengisi carousel:', error);
  }
}

// Ketika DOM telah dimuat, isi carousel dengan data dan tambahkan event listener untuk resize
document.addEventListener('DOMContentLoaded', async () => {
  await isiCarouselDenganData();
  handleScreenSizeChange(); // Panggil fungsi ini saat DOM telah dimuat untuk menyesuaikan tampilan awal
  
  // Tambahkan event listener untuk resize
  window.addEventListener('resize', handleScreenSizeChange);
});