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
    var data = JSON.parse(xmlHttp.responseText);
    var search_results_container = document.createElement("div");
    search_results_container.id ='search_results_container';
    var inner_container = document.getElementById('inner_container');

    var heading_space = document.createElement('div');
    heading_space.className = 'heading_space';
    var heading = document.createElement('h6');
    heading.innerHTML = "検索結果";
    heading_space.appendChild(heading);
    search_results_container.appendChild(heading_space);
    inner_container.appendChild(search_results_container);
    var results_space = document.createElement('div')
    results_space.id = "results_space"

    if (data === null) {
      results_space.textContent = '本が見つかりませんでした';
    } else {
      var ul = document.createElement('ul')
      ul.className = 'results_list'
      ul.style.listStyle = "none"

      var search_results = data.items
      var frag = document.createDocumentFragment();
      for (var i = 0; i < search_results.length; i++){
        var result = search_results[i].volumeInfo;
        var li = document.createElement('li');
        li.id = `result_${i}`;
        var result_space = document.createElement('div');
        result_space.className = 'result_space';
        var image_space = document.createElement('div');
        image_space.className = 'image_space';
        var image = document.createElement('img');
        image.setAttribute("src", "https://images-fe.ssl-images-amazon.com/images/I/41AjVRdoNvL._AC_US200_.jpg" );
        image_space.appendChild(image);

        var text_space = document.createElement('div')
        text_space.className = 'text_space pt-2'
        var text_frag = document.createDocumentFragment();
        var title_space = document.createElement('div')
        title_space.className = 'title_space'
        var title = document.createElement('h6');
        title.innerHTML = result.title
        title_space.appendChild(title);
        var author_space = document.createElement('div')
        author_space.className = 'author_space';
        var author = document.createElement('h6');
        author.innerHTML = result.authors;
        author_space.appendChild(author);
        var publisher_space = document.createElement('div')
        publisher_space.className = 'publisher_space'
        var publisher = document.createElement('h8');
        if (result.publisher) {
          publisher.innerHTML = result.publisher
        } else {
            publisher.innerHTML = "不明"
        }
        publisher_space.appendChild(publisher);
        var publishedDate_space = document.createElement('div')
        publishedDate_space.className = 'publishedDate_space'
        var publishedDate = document.createElement('h8');
        publishedDate.innerHTML = result.publishedDate;
        publishedDate_space.appendChild(publishedDate);

        text_frag.appendChild(title_space);
        text_frag.appendChild(author_space);
        text_frag.appendChild(publisher_space);
        text_frag.appendChild(publishedDate_space);
        text_space.appendChild(text_frag);

        result_space.appendChild(image_space);
        result_space.appendChild(text_space);
        li.appendChild(result_space);
        frag.appendChild(li);
      }
      ul.appendChild(frag);
      results_space.appendChild(ul);
    }

    search_results_container.appendChild(results_space);
  }
}
