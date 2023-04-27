// Fetch user city and stores it into the cookie "Cidade".
var cidade = "";

  //TODO: separate "fetch user city" and "store it into a cookie" in different functions.

function fetchCity(){

  fetch('https://geo.ipify.org/api/v1?apiKey=at_fxWAhg0RvfkDmduO07PzPDZpTm8hJ')
    .then(response => response.json())
    .then(data => {
      var city = data.location.city;
      $('#city').html(data.location.city);

      document.cookie = `Cidade=${data.location.city}`;
      console.log('Cidade:', city);

      cidade = Cookies.get('Cidade');

    })
    .catch(error => console.error(error));

}

fetchCity();

console.log(cidade);

// On submit event, use link and number of posts per page to create a table with all the blog posts.
$('#form').submit((e) => {
  e.preventDefault()

  var url = $('#url').val()

  var number = $("#number").val()

  getBlogPosts(url, number)
})


// Refresh the numer of posts per page once the user changes it.
$("#number").change((e) => {
  number = $(this).val()
})

// Create the table dynamically with the blog posts.
function getBlogPosts(url, number) {
  $("#data").html('')
  $.ajax({
    method: "GET",
    url: `https://${url}/wp-json/wp/v2/posts?_fields[]=title&_fields[]=link&_fields[]=date&per_page=${number}`,
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

