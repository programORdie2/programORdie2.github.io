function _getSWIVBD(user, max) {
  let url = 'https://scratch.mit.edu/messages/ajax/user-activity/?user='+user+'&max='+max;
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
    xhr.send();
  if (xhr.status === 404) {
    return {"message": "user not found"}
  }
  page = xhr.responseText;
  const parser = new DOMParser();
  const doc = parser.parseFromString(page, "text/html");
  let items = doc.querySelectorAll('li');
  let returnData = [];
  for (let x of items.values()) {
    x = x.innerHTML;
    x = x.replace(/\n/g, '');
    x = x.replace(/\s+/g, ' ');
    x = x.replace('&nbsp;', ' ');
    x = x.replace('&nbsp;', ' ');
    x = x.replace(' <span class="icon-xs black ', '');
    let array = x.split('"></span>');
    let type = array[0];
    x = x.replace(type, '');
    x = x.replace('"></span>', '');
    x = x.replace('<div>', '');
    x = x.replace('  <span class="actor">', '');
    array = x.split('</span>');
    x = x.replace('</span>', '');
    let author = array[0];
    let all_text = ''
    let target_url = ''
    let studio = false
    if (author.startsWith('<a href=\"/users/')) {
      author  = author.split('>')[1].replace('</a', '');
      x = x.replace('<a href="/users/'+author+'/">'+author+'</a>', '')
      array = x.split('<a href="')
      all_text = author+array[0]
      x = x.replace(array[0], '')
      studio = true
    } else {
    all_text = x.split('<a href="');
    all_text = all_text[0];
    x = x.replace(all_text);
  }
    x = x.replace('<a href="', '');
    array = x.split('">');
    let url = array[0];
    x = x.replace(url, '');
    x = x.replace('">', '');
    array = x.split('</a>');
    let name = array[0];
    if (studio) {
      target_url = target_url.replace(url+'\">'+name+'</a>', '')
    }
    x = x.replace(name, '');
    x = x.replace('</a> ', '');
    all_text += name;
    x = x.replace('<span data-tag="time" class="time">', '');
    let when = x.split('</span>');
    when = when[0];
    let target_name = ''
    if (studio) {
      array = x.split('<a href="');
      all_text += ' '
      all_text += array[0]
      array = array[1]
      array = array.split('\" data-tag=\"target\">')
      target_url = array[0]
      array = array[1].split('</a> ')
      when = array[1].replace('</span> </div> ', '')
      target_name = array[0]
      all_text += target_name
      target_url = 'https://scratch.mit.edu' + target_url
      url = 'https://scratch.mit.edu' + url
    }
    url = url.replace('undefined', 'https://scratch.mit.edu');
    let currentData = {"author": author, "type": type, "url": url, "when": when, "fullText": all_text, "name": name, "targetUrl": target_url, "targetName": target_name};
    returnData.push(currentData);
  }
  return returnData;
}

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
      data = _getSWIVBD(user, '18');
      console.log(data[16]);
      console.log(data[17]);
      document.getElementById('loading_out').innerHTML = '<div class="loading" id="loading"></div>';
        let all =  [];
        var arrayLength = data.length;
for (var i = 0; i < arrayLength; i++) {
    toProcces = data[i];
    let text = toProcces.fullText.replace(toProcces.name, '<a href="'+toProcces.url+'">'+toProcces.name+'</a>')
    text = text.replace(toProcces.targetName, '<a href="'+toProcces.targetUrl+'">'+toProcces.targetName+'</a>');
    text = text.replace(toProcces.author, '<a href="https://scratch.mit.edu/users/'+toProcces.author+'">'+toProcces.author+'</a>');
    all.push(text);
    all.push(toProcces.when);
}
      all = makeHtmlDisplay(all);
      let result = document.getElementById('result');
      result.innerHTML = all;
      document.getElementById('loading').classList.remove("loading");
    //})
}

var input = document.getElementById("input");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    document.getElementById("getswivbd").click();
  }
});