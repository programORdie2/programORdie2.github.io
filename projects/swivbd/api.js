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
    x = x.replace('<span class="icon-xs black ', '');
    let array = x.split('"></span>');
    let type = array[0];
    x = x.replace(type, '');
    x = x.replace('"></span>', '');
    x = x.replace('<div>', '');
    x = x.replace('<span class="actor">', '');
    array = x.split('</span>');
    let author = array[0];
    x = x.replace('</span>', '');
    let all_text = x.split('<a href="');
    all_text = all_text[0];
    x = x.replace(all_text);
    x = x.replace('<a href="', '');
    array = x.split('">');
    let url = array[0];
    x = x.replace(url, '');
    x = x.replace('">', '');
    array = x.split('</a>');
    let name = array[0];
    x = x.replace(name, '');
    x = x.replace('</a>', '');
    all_text += name;
    x = x.replace('<span data-tag="time" class="time">', '');
    let when = x.split('</span>');
    when = when[0];
    url = url.replace('undefined', 'https://scratch.mit.edu');
    let currentData = {"author": author, "type": type, "url": url, "when": when, "fullText": all_text};
    returnData.push(currentData);
  }
  return returnData;
}

export { getSWIVBD };