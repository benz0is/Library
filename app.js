const save_btn = document.getElementById("save-btn");


var library = []

function Book(author, title, number_of_pages,isRead){
    this.author = author,
    this.title = title, 
    this.number_of_pages = number_of_pages,
    this.isRead = isRead
}



function openForm(){
    document.getElementById("div-form").style.display= "grid";
    

}
function closeForm(){
    document.getElementById("div-form").style.display="none";
}

var object_section = document.getElementById("object-section")

const database = firebase.database();
const rootRef = database.ref('books');
const autoId = rootRef.push().key;

    rootRef.on('value',gotData,errData);
    function gotData(data){
        var scores = data.val();
        var keys = Object.keys(scores);
        for(var i=0;i < keys.length;i++){
            var k = keys[i];
            var author = scores[k].author;
            var isRead = scores[k].isRead;
            var number_of_pages = scores[k].number_of_pages;
            var title = scores[k].title;
            var section_book = document.createElement('div')
            section_book.textContent = `The book ${title} is written by ${author}. The book has ${number_of_pages} pages. Has it been read :${isRead}.`
            section_book.style.height="50px";
            section_book.style.background="gray"
            section_book.style.border="1px solid black"
            object_section.appendChild(section_book)
            var del_button = document.createElement("BUTTON")
            var btn_text = document.createTextNode("X")
            del_button.appendChild(btn_text)
            del_button.style.borderRadius = '50%'
            del_button.style.border="none";
            del_button.style.background = "red";
            del_button.style.alignItems="right";
            section_book.appendChild(del_button)
            del_button.addEventListener('click', function(){
                object_section.removeChild(section_book)
                console.log('it is clicked')
            })
            }}
function errData(data){
    return
            }



function saveForm(){
     if (document.getElementById("author").value=== '' || document.getElementById("title").value==="" || document.getElementById("pages").value==="" || document.getElementById("hasRead").value ===""){
        save_btn.style.background="red";
        setTimeout(function(){
            save_btn.style.background="green"
        },500)
        }else{
            var page = new Book(document.getElementById("author").value,document.getElementById("title").value,document.getElementById("pages").value,document.getElementById("hasRead").value)
            library.unshift(page)
            rootRef.child(autoId).set({
                author:library[0].author,
                title:library[0].title,
                number_of_pages:library[0].number_of_pages,
                isRead:library[0].isRead
            });


    document.getElementById("author").value="";
    document.getElementById("title").value="";
    document.getElementById("pages").value="";
    document.getElementById("hasRead").value ="";
        }
}
