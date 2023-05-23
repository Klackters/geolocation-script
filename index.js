var cidade;

var contadorRegiaoDeCampinas = 0;
var contadorRegiaoDePiracicaba = 0;

var postsExclude = [];

const cidadesRegiaoCampinas = [
  'AMERICANA',
  'ARTUR NOGUEIRA',
  'CAMPINAS',
  'COSMÓPOLIS',
  'ENGENHEIRO COELHO',
  'HOLAMBRA',
  'HORTOLÂNDIA',
  'INDAIATUBA',
  'ITATIBA',
  'JAGUARIÚNA',
  'MONTE MOR',
  'MORUNGABA',
  'NOVA ODESSA',
  'PAULÍNIA',
  'PEDREIRA',
  "SANTA BÁRBARA D'OESTE",
  'SANTO ANTÔNIO DE POSSE',
  'SUMARÉ',
  'VALINHOS',
  'VINHEDO'
];

const cidadesRegiaoPiracicaba = [
  'ÁGUAS DE SÃO PEDRO',
  'ANALÂNDIA',
  'ARARAS',
  'CAPIVARI',
  'CHARQUEADA',
  'CONCHAL',
  'CORDEIRÓPOLIS',
  'CORUMBATAÍ',
  'ELIAS FAUSTO',
  'IPEÚNA',
  'IRACEMÁPOLIS',
  'LEME',
  'LIMEIRA',
  'MOMBUCA',
  'PIRACICABA',
  'PIRASSUNUNGA',
  'RAFARD',
  'RIO CLARO',
  'RIO DAS PEDRAS',
  'SALTINHO',
  'SANTA CRUZ DA CONCEIÇÃO',
  'SANTA GERTRUDES',
  'SANTA MARIA DA SERRA',
  'SÃO PEDRO'
]

// On button submit event, use link and number of posts per page to create a table with all the blog posts
$('#form').submit((e) => {
  e.preventDefault()
  fetchCity();
})

// Create the table dynamically with the blog posts sorted by the user's region
function getBlogPosts(id) {
  $("#data").html('');
  var postsId = [];
  $.ajax({
    method: "GET",
    url: `https://policialpadrao.com.br/wp-json/wp/v2/posts?categories=${id}&per_page=5&_embed`,
    success: function (data) {
      console.log(data);

      data.forEach((post, index) => {
        const postImage = post._embedded['wp:featuredmedia'][0].source_url || 'https://via.placeholder.com/150';
        const categoryName = post._embedded['wp:term'][0][0].name;

        const columnClass = (index === 1 || index === 2) ? 'col-1' : (index === 3 || index === 4) ? 'col-3' : 'col-2';

        const columnSelector = `.column.${columnClass}`;

        const columnContent = `
    <div class="news-item">
      <a href="${post.link}" target="_blank">
        <img src="${postImage}" alt="${post.title.rendered}">
      </a>
      <div class="news-content">
        <p><strong></strong> ${categoryName}</p>
        <h3><a href="${post.link}" target="_blank">${post.title.rendered}</a></h3>
        <p>${post.excerpt.rendered}</p>
      </div>
    </div>
  `;

        $(columnSelector).append(columnContent);

        postsId.push(post.id);

      });

      console.log("IDs dos posts:", postsId);
      postsExclude = postsId;

    }
  });

  if (cidadesRegiaoCampinas.includes(cidade.toUpperCase())) {
    contadorRegiaoDeCampinas += 5;
    console.log("Posts relacionados à Região de Campinas: ", contadorRegiaoDeCampinas);
  } else if (cidadesRegiaoPiracicaba.includes(cidade.toUpperCase())) {
    contadorRegiaoDePiracicaba += 5;
    console.log("Posts relacionados à Região de Piracicaba: ", contadorRegiaoDePiracicaba);
  }

}

// Search for the category ID by it's slug
function searchCategoryID(slug) {
  $.ajax({
    url: `https://policialpadrao.com.br/wp-json/wp/v2/categories?slug=${slug}`,
    method: 'GET',
    success: function (data) {
      var id = data[0].id;
      getBlogPosts(id);
    }
  });
}



// Fetch user city and stores it into the cookie "Cidade".

async function fetchCity() {
  const response = await fetch('https://geo.ipify.org/api/v1?apiKey=at_fxWAhg0RvfkDmduO07PzPDZpTm8hJ');
  const data = await response.json();

  cidade = data.location.city;

  $('#city').html(cidade);

  document.cookie = `Cidade=${cidade}`;

  console.log("Cidade:", cidade);

  searchCategoryID(cidade);
}

function regionCounter() {

}