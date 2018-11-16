var xmlHttp;

function loadText(){
  var title = document.getElementById("title").value
  var author = document.getElementById("author").value

  xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = checkStatus;
  xmlHttp.open("GET", '/books/new?title='+title+'&author='+author, true);

  xmlHttp.send(null);
}

function checkStatus(){
  if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
    alert(xmlHttp.responseText);
  }
}
