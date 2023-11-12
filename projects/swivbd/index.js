function makeHtmlDisplay(array) {
    let result =  '';
        var arrayLength = array.length/2;
for (var i = 0; i < arrayLength; i++) {
    action = array[i*2];
    time = array[i*2+1];
    current = '<div class="display"><p class="action">'+action+'</p><p class="time">'+time+'</p></div><br>';
    result = result + current
}
return result
}

function getswivbd() {
    document.getElementById('loading_out').innerHTML = '<div class="loading" id="loading"></div>';
    let user = document.getElementById('input').value;
    let url = "https://cors-anywhere.herokuapp.com/"+"https://programordie-1-b6431438.deta.app/swivbd/get?user="+user+"&max=-1";
  fetch(url, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  }) 
    .then(response => response.json())
    .then(data => {
      document.getElementById('loading_out').innerHTML = '<div class="loading" id="loading"></div>';
        let all =  [];
        var arrayLength = data.length;
for (var i = 0; i < arrayLength; i++) {
    toProcces = data[i];
    all.push(toProcces.message);
    all.push(toProcces.time);
}
      all = makeHtmlDisplay(all);
      let result = document.getElementById('result');
      result.innerHTML = all;
      document.getElementById('loading').classList.remove("loading");
    })
}

var input = document.getElementById("input");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    document.getElementById("getswivbd").click();
  }
});