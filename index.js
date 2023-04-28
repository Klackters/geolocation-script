// On button submit event, use link and number of posts per page to create a table with all the blog posts
$('#form').submit((e) => {
  e.preventDefault()

  // var url = $('#url').val()
  // var number = $("#number").val()

  // getBlogPosts(url, number)

  fetchCity();

})


// Refresh the number of posts per page once the user changes it
$("#number").change((e) => {
  number = $(this).val()
})

// Create the table dynamically with the blog posts sorted by the user's region
function getBlogPosts(id) {
  $("#data").html('')
  $.ajax({
    method: "GET",
    url: `https://policialpadrao.dmxdesign.com.br/wp-json/wp/v2/posts?categories=${id}&per_page=5`,
    success:function(data) {
      console.log(data)

      data.forEach(post => {
        $("#data").append(`
        
        <tr>
          <td><a href="${post.link}" target="_blank">${post.title.rendered}</a></td>
          <td>${post.date}</td>
          </tr>

        `)
      });
    }
  })
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

  //TODO: separate "fetch user city" and "store it into a cookie" in different functions.

var cidade;

async function fetchCity(){
  const response = await fetch('https://geo.ipify.org/api/v1?apiKey=at_fxWAhg0RvfkDmduO07PzPDZpTm8hJ');
  const data = await response.json();
  
  cidade = data.location.city;
  
  $('#city').html(cidade);
  
  document.cookie = `Cidade=${cidade}`;
  
  console.log("Cidade:", cidade);

  searchCategoryID(cidade);
}
