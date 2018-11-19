var xmlHttp;

function loadText(){
  var title = document.getElementById("title").value
  var author = document.getElementById("author").value

  if (title == "" && author == ""){
    var err_msg = document.createElement('div');
    err_msg.id = "err_msg_space"
    var msg = document.createElement('h6');
    msg.innerHTML = "タイトルもしくは著者を入力して下さい";
    err_msg.appendChild(msg);
    var list = document.getElementById('src_rslt_container')

    while (list.hasChildNodes()) {list.removeChild(list.firstChild);}
    list.appendChild(err_msg);
  } else{
  xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = checkStatus;
  xmlHttp.open("GET", '/books/new?title='+title+'&author='+author, true);

  xmlHttp.send(null);
  }
}

function createInput(obj) {
  console.log("Success")
  console.log(obj)
  var input_book_container = document.getElementById('input_book_container')
  var src_rslt_container = document.getElementById('src_rslt_container')
  var input_heading = document.createElement('div')
  var input_book = document.createElement('div')
  var heading = document.createElement('h6')
  var input_title = document.createElement('input')
  var input_author = document.createElement('input')
  var input_publisher = document.createElement('input')
  var input_publishedDate = document.createElement('input')
  input_heading.className = 'input_heading'
  input_book.className = 'input_book'
  heading.innerHTML = '選択した書籍'
  input_title.value = obj.getElementsByClassName('title_space')[0].innerText;
  input_author.value = obj.getElementsByClassName('author_space')[0].innerText;
  input_publisher.value = obj.getElementsByClassName('publisher_space')[0].innerText;
  input_publishedDate.value = obj.getElementsByClassName('publishedDate_space')[0].innerText;
  input_title.id = 'input_title'
  input_title.setAttribute('form', 'create-image');
  input_title.setAttribute('name', 'book_title');
  input_title.setAttribute('size', '100');
  input_title.readOnly = true;
  input_author.id = 'input_author'
  input_author.setAttribute('form', 'create-image');
  input_author.setAttribute('name', 'book_author');
  input_author.setAttribute('size', '100');
  input_author.readOnly = true;
  input_publisher.id = 'input_publisher'
  input_publisher.setAttribute('form', 'create-image');
  input_publisher.setAttribute('name', 'book_publisher');
  input_publisher.setAttribute('size', '100');
  input_publisher.readOnly = true;
  input_publishedDate.id = 'input_publishedDate'
  input_publishedDate.setAttribute('form', 'create-image');
  input_publishedDate.setAttribute('name', 'book_publisedDate');
  input_publishedDate.setAttribute('size', '100');
  input_publishedDate.readOnly = true;

  while (src_rslt_container.hasChildNodes()) {
    src_rslt_container.removeChild(src_rslt_container.firstChild)
  }
  while (input_book_container.hasChildNodes()) {
    input_book_container.removeChild(input_book_container.firstChild)
  }
  var book_frag = document.createDocumentFragment()
  input_heading.appendChild(heading);
  book_frag.appendChild(input_title)
  book_frag.appendChild(input_author)
  book_frag.appendChild(input_publisher)
  book_frag.appendChild(input_publishedDate)
  input_book.appendChild(book_frag);
  input_book_container.appendChild(input_heading);
  input_book_container.appendChild(input_book);

}

function checkStatus(){
  if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
    var data = JSON.parse(xmlHttp.responseText);
    var src_rslt_container = document.getElementById("src_rslt_container");
    // var inner_container = document.getElementById('inner_container');

    var heading_space = document.createElement('div');
    heading_space.className = 'heading_space';
    var heading = document.createElement('h6');
    heading.innerHTML = "検索結果";
    heading_space.appendChild(heading);
    while (src_rslt_container.hasChildNodes()) {src_rslt_container.removeChild(src_rslt_container.firstChild);
    }
    src_rslt_container.appendChild(heading_space);

    var results_space = document.createElement('div')
    results_space.id = "results_space"
    if (data === null || data.items === undefined) {
      results_space.textContent = '本が見つかりませんでした';
    } else {
      var ul = document.createElement('ul');
      ul.className = 'results_list';
      ul.style.listStyle = "none";
      var search_results = data.items
      var frag = document.createDocumentFragment();

      for (var i = 0; i < search_results.length; i++){
        var result = search_results[i].volumeInfo;
        var li = document.createElement('li');
        li.id = `result_${i}`;
        li.setAttribute('onClick', 'createInput(this)');
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
    src_rslt_container.appendChild(results_space);
  }
}
