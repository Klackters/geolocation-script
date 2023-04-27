navigator.geolocation.getCurrentPosition(function(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log("Latitude: " + latitude + " Longitude: " + longitude);
  });

$('#form').submit((e) => {
  e.preventDefault()

  var url = $('#url').val()

  var number = $("#number").val()

  getBlogPosts(url, number)
})

$("#number").change((e) => {
  number = $(this).val()
})

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

