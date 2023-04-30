var cidade;

// On button submit event, use link and number of posts per page to create a table with all the blog posts
$('#form').submit((e) => {
  e.preventDefault()
  fetchCity();
})

// Create the table dynamically with the blog posts sorted by the user's region
function getBlogPosts(id) {
  $("#data").html('');
  $.ajax({
    method: "GET",
    url: `https://policialpadrao.dmxdesign.com.br/wp-json/wp/v2/posts?categories=${id}&per_page=5&_embed`,
    success:function(data) {
      console.log(data);

      data.forEach(post => {
        const postImage = post._embedded['wp:featuredmedia'][0].source_url || 'https://via.placeholder.com/150';
        const categoryName = post._embedded['wp:term'][0][0].name;
        $("#news-section").append(`
        
        <div class="news-item">
          <a href="${post.link}" target="_blank">
            <img src="${postImage}" alt="${post.title.rendered}">
          </a>
          <div class="news-content">
            <h3><a href="${post.link}" target="_blank">${post.title.rendered}</a></h3>
            <p>${post.excerpt.rendered}</p>
            <p><strong></strong> ${categoryName}</p>
            <a href="${post.link}" target="_blank" class="read-more">Leia mais</a>
          </div>
        </div>

        `);
      });
    }
  });
}

// Search for the category ID by it's slug
function searchCategoryID(slug) {
  $.ajax({
    url: `https://policialpadrao.dmxdesign.com.br/wp-json/wp/v2/categories?slug=${slug}`,
    method: 'GET',
    success: function (data) {
        var id = data[0].id;
        getBlogPosts(id);
    }
});
}



// Fetch user city and stores it into the cookie "Cidade".

async function fetchCity(){
  const response = await fetch('https://geo.ipify.org/api/v1?apiKey=at_fxWAhg0RvfkDmduO07PzPDZpTm8hJ');
  const data = await response.json();
  
  cidade = data.location.city;
  
  $('#city').html(cidade);
  
  document.cookie = `Cidade=${cidade}`;
  
  console.log("Cidade:", cidade);

  searchCategoryID(cidade);
}
