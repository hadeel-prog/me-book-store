// ==========start animation =========

window.addEventListener('load', function() {
  setTimeout(function() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('content').style.display = 'block';
  }, 3000);
});


// ==========global virables  =========

var bookName = document.getElementById("bookName");
var bookWeb = document.getElementById("bookWeb");
var bookPrice = document.getElementById("bookPrice");
var bookImg = document.getElementById("bookImg");
var bookRate = document.getElementById("bookRate");
var searchBook= document.getElementById("searchBook");
var buttonUpdate= document.getElementById("btnUpdate");
var buttonAdd= document.getElementById("btnAdd");
var buttonUrl=document.getElementById("buttonUrl");
var formBook=document.querySelectorAll(".formBook .form-control");
var formalert=document.querySelector(".formalert")
var updateIndex=0;
var updateindexUrl=0;




var bookList=[]; 
// =========================local storge:==========

if( localStorage.getItem('productContainer')!=null){ 
    bookList  =JSON.parse(localStorage.getItem('productContainer'));
    displayData(bookList);
  }

 // =================عبارة عن objectفيها القيمة الفي ال input============

 function addbBook(){
  
if(validateBook(bookName)&&
   validateBook(bookImg)&&
   validateBook(bookPrice)&&
   validateBook(bookRate)&&
   validateBook(bookWeb)){

    var book = {
      name:bookName.value,
      web:bookWeb.value,
      price: bookPrice.value,
      rate: bookRate.value,
      img:bookImg.files[0] ? `/img/${bookImg.files[0].name}` :" /img/untitled.png",
      
     };
  
if(formalert.classList.contains('d-block'))
    {formalert.classList.replace('d-block','d-none')}


     bookList.push(book);  // المصفوفه اللي بتحتفظ بالعنصر الجديد الموجود في الاوبجكت 
     localStorage.setItem("productContainer" , JSON.stringify(bookList));  //    بحفظ في اللوكل استورج
     displayData(bookList);
     clearForm();   
     removeMark();
   }

else
{

  formalert.classList.replace('d-none', 'd-block');

}

 

}

// ======================clear function  ====================

function clearForm(){  // دالهة الحذف اللي بتفضي الجدول بعد ما اضغط الزر بتاع الادد
    bookName.value=null,
    bookWeb.value= null,
    bookPrice.value=null,
    bookImg.value=null,
    bookRate.value=null


}

// ==================display function ==========================
function displayData(list){ // دي الداله البعرض بيها البيانات ح اعرض المصفوفه الفاضيه عشان دي البتخزن فيها العنصر المضاف و ح انادي الداله جوه اللدله اللي بتشتغل لما اضغط على المفتاح
  list.sort((a, b) => a.name.localeCompare(b.name)); 
    var container="";
    for(var i=0; i< list.length; i++){
        container+=`
                 <tr>
                 <td> ${i+1}</td>
                <td> ${list[i].name}</td>
                <td>${list[i].price+"$"}</td>
                <td> <img src="${list[i].img}" alt=""></td>
                <td> <button id="buttonUrl" onclick="urlVisit(${i})" class=" btn bg-primary text-white "> <i class="fa-solid fa-globe"></i> </button> </td>
                 
                <td>  <button onclick="deletItem(${i})" class=" btn bg-danger text-white m-2 "> <i class="fa-solid fa-trash"> </i></button>
                    <button  onclick="setUptedItem(${i})" class="btn bg-success text-white  "> <i class="fa-solid fa-pen-to-square"> </i> </button>
                </td> 
                  </tr>
 `
    }
    document.getElementById("bodyData").innerHTML=container;
  

}
// =========================================================================
buttonAdd.addEventListener('click',addbBook);

// =========================delete function==============================
function deletItem(index){

    Swal.fire({
        title: 'Delete Book From Table',
        text: "Are you Sure You Wanted To Deleted This Book??",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            bookList.splice(index , 1);
            displayData(bookList);
           localStorage.setItem("productContainer" , JSON.stringify(bookList));
        }
    });
    
  

}
// ==========================================================



// =====================Search function  ========================


function bookSearch() {
  var res = [];
  for (var i = 0; i < bookList.length; i++) {
    if (bookList[i].name.toLowerCase().includes(searchBook.value.toLowerCase())) {
      res.push(bookList[i]); 
    }
  }
  displayData(res);
}




// =========================Update Funcation ====================

function setUptedItem(index){

  bookName.value= bookList[index].name;
  bookPrice.value=bookList[index].price;
    // productImg.src = bookList[index].img;
    buttonAdd.classList.add("d-none");
  buttonUpdate.classList.remove("d-none");
  updateIndex=index;

}

// ===============================Update function =========
buttonUpdate.addEventListener('click', updateData);
// ==========================================================================
function updateData(){

bookList[updateIndex].name=bookName.value;
bookList[updateIndex].price=bookPrice.value;

localStorage.setItem("productContainer" , JSON.stringify(bookList));
displayData(bookList);
buttonAdd.classList.remove("d-none");
buttonUpdate.classList.add("d-none");
updateUrl();
clearForm();
 
    
}

// ===========================URL function ===========================

function urlVisit(index1){
    bookWeb.value=bookList[index1].web;
    var url = bookList[index1].web;
    if (url) {window.open(url, "_blank");} 
    updateindexUrl=index1;
}
// ============================================================================
function updateUrl(){
    bookList[updateindexUrl].web=bookWeb.value.trim();
    localStorage.setItem("productContainer" , JSON.stringify(bookList)); 
displayData(bookList);
clearForm();
console.log(updateindexUrl)
}

// =======================================================================

// ==========================validation book name============================


function validateBook(elementList){

  var regex={
    bookName: /^[A-Z][a-z]{3,10}$/,
    bookPrice: /^(?:[0-9]|[1-9][0-9]{1,2}|[1-2][0-9]{3}|3000)$/,
    bookWeb:/^www\.[a-z0-9/]+\.com$/,
    bookRate:/\b\w{3,}\b/


  }


console.log(regex[elementList.id]);

// ==========conation for alert and mark validtion==============
if(regex[elementList.id].test(elementList.value)){

         if(elementList.nextElementSibling.classList.contains('d-block'))
          {elementList.nextElementSibling.classList.replace('d-block', 'd-none') }

         if(elementList.classList.contains("is-invalid"))
         {elementList.classList.remove('is-invalid');}

  elementList.classList.add('is-valid');
  return true;

}
else{
            if(elementList.nextElementSibling.classList.contains('d-none'))
             { elementList.nextElementSibling.classList.replace('d-none', 'd-block') }

             if(elementList.classList.contains('is-valid'))
               { elementList.classList.remove('is-valid')}

  elementList.classList.add('is-invalid');
  return false;
}


}
// ====================================================================

// ==============================loop for blur============

for(var i=0 ; i < formBook.length; i++){

formBook[i].addEventListener('blur', function(){
  validateBook(this, );


})

}

// =================remove mark=============================

function removeMark(){
for(var i=0; i<formBook.length;i++){
  formBook[i].classList.remove('is-valid');
}

}

// ===========================================================



