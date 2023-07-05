let title =document.getElementById("title")
let price =document.getElementById("price")
let taxes =document.getElementById("taxes")
let ads =document.getElementById("ads")
let discount =document.getElementById("discount")
let total =document.getElementById("total")
let count =document.getElementById("count")
let category =document.getElementById("category")
let create =document.getElementById("create")
let search =document.getElementById("search")
let searchTitle =document.getElementById("Search-title")
let SearchCategory =document.getElementById("Search-Category")
let Deletall =document.getElementById("Deletall")
let update =document.getElementById("update")
let Delete =document.getElementById("Delete")
let tbody =document.getElementById("tbody")
let mode =`create`;
let tmp ;

function getTotal(){
    if(price.value != ""){
       let result = (+price.value + +taxes.value  + +ads.value) - +discount.value
       total.innerHTML =result;
       total.style.background =`rgb(35 114 38)`
    }else{
        total.style.background=`rgb(189, 6, 6)`
    }   
}

let datapro;
if(localStorage.product !=null){
    datapro= JSON.parse(localStorage.product)
}else{
    datapro =[];
}


create.onclick = function(){
let newpro= {
    title: title.value.toLowerCase() ,
    price: price.value ,
    taxes: taxes.value ,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count:count.value
    ,category: category.value.toLowerCase()
}

if(mode ===`create`){
    if(newpro.count >1){
    for(let i =0; i<newpro.count ;i++){
        datapro.push(newpro)

    }
}else{
    datapro.push(newpro)
    }

}else{
    datapro[tmp] =newpro;
    mode=`create`
    create.innerHTML =`create`
    count.style.display= `block`
}



localStorage.setItem(`product`, JSON.stringify(datapro))
console.log(datapro)
title.value ="";
    price.value ="";
    taxes.value ="";
    ads.value ="";
    discount.value ="";
    total.innerHTML="";
    category.value= "";
    count.value= "";
    showData()
    getTotal()
}



function showData(){
    getTotal()
    let tabel =``;
    for(let i=0 ;i < datapro.length ;i++){
       
tabel +=`

<tr>

        <td>${i}</td>
         <td>${datapro[i].title}</td>
     <td>${datapro[i].price}</td>
     <td>${datapro[i].taxes}</td>
     <td>${datapro[i].ads}</td>
     <td>${datapro[i].discount}</td>
     <td>${datapro[i].total}</td>
     <td>${datapro[i].category}</td>
     <td> <div class="btn btn-green rounded-pill" onclick="updData(${i})" id="update">update</div></td>
     <td> <div class="btn btn-red rounded-pill" onclick="deleteData(${i})" id="Delete">Delete</div></td>
 </tr>

`

    }
    tbody.innerHTML = tabel

    if(datapro.length >0){
        Deletall.innerHTML = `
        <button class="btn btn-danger w-100" onclick="deleteAll()">Delete all (${datapro.length})</button>
    `;
    }
    else{
        Deletall.innerHTML =""
    }
}
showData()

function deleteData(i){
    console.log(i)
    datapro.splice(i,1)
    localStorage.product =JSON.stringify(datapro)
    showData()
}

function deleteAll(){
    localStorage.clear()
    datapro.splice(0)
    showData()
}


function updData(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
        getTotal()
        count.style.display= "none"
        create.innerHTML= `Update`
    category.value = datapro[i].category;
    mode = `update`
    tmp =i ;
    scroll({

            top:0,
            behavior:`smooth`
    })
}

let searchMood = `title`

function getSearchMood(id){
if(id === `Search-title`){
    searchMood =`title`
    search.placeholder =`Search By Title`
}else{
    searchMood =`category`
    search.placeholder =`Search By Category`

}
search.focus()
search.value =""
showData()
}


// function getSearchData(value){
//     let table =""
//     if ( searchMood === `title`){
//         for(let i =0; i<datapro.length;i++){
//             if(datapro[i].title.includes(value.toLowerCase())){
//                 table +=`

//             <tr>
//                     <td>${i}</td>
//                      <td>${datapro[i].title}</td>
//                  <td>${datapro[i].price}</td>
//                  <td>${datapro[i].taxes}</td>
//                  <td>${datapro[i].ads}</td>
//                  <td>${datapro[i].discount}</td>
//                  <td>${datapro[i].total}</td>
//                  <td>${datapro[i].category}</td>
//                  <td> <div class="btn btn-green rounded-pill" onclick="updData(${i})" id="update">update</div></td>
//                  <td> <div class="btn btn-red rounded-pill" onclick="deleteData(${i})" id="Delete">Delete</div></td>
//              </tr>
            
//             `
//         }
//     }

// }else{
//     for(let i =0; i<datapro.length;i++){
//         if(datapro[i].category.includes(value.toLowerCase())){
//             table +=`

//         <tr>
//                 <td>${i}</td>
//                  <td>${datapro[i].title}</td>
//              <td>${datapro[i].price}</td>
//              <td>${datapro[i].taxes}</td>
//              <td>${datapro[i].ads}</td>
//              <td>${datapro[i].discount}</td>
//              <td>${datapro[i].total}</td>
//              <td>${datapro[i].category}</td>
//              <td> <div class="btn btn-green rounded-pill" onclick="updData(${i})" id="update">update</div></td>
//              <td> <div class="btn btn-red rounded-pill" onclick="deleteData(${i})" id="Delete">Delete</div></td>
//          </tr>
        
//         `
//     }
// }
// }
// tbody.innerHTML =table
// }
function getSearchData(value){
    let table =""
    if ( searchMood === `title`){
        for(let i =0; i<datapro.length;i++){
            if(datapro[i].title.includes(value.toLowerCase())){
                table +=`

            <tr>
                    <td>${i}</td>
                     <td>${datapro[i].title}</td>
                 <td>${datapro[i].price}</td>
                 <td>${datapro[i].taxes}</td>
                 <td>${datapro[i].ads}</td>
                 <td>${datapro[i].discount}</td>
                 <td>${datapro[i].total}</td>
                 <td>${datapro[i].category}</td>
                 <td> <div class="btn btn-green rounded-pill" onclick="updData(${i})" id="update">update</div></td>
                 <td> <div class="btn btn-red rounded-pill" onclick="deleteData(${i})" id="Delete">Delete</div></td>
             </tr>
            
            `
        }
    }

}else{
    for(let i =0; i<datapro.length;i++){
        if(datapro[i].category.includes(value.toLowerCase())){
            table +=`

        <tr>
                <td>${i}</td>
                 <td>${datapro[i].title}</td>
             <td>${datapro[i].price}</td>
             <td>${datapro[i].taxes}</td>
             <td>${datapro[i].ads}</td>
             <td>${datapro[i].discount}</td>
             <td>${datapro[i].total}</td>
             <td>${datapro[i].category}</td>
             <td> <div class="btn btn-green rounded-pill" onclick="updData(${i})" id="update">update</div></td>
             <td> <div class="btn btn-red rounded-pill" onclick="deleteData(${i})" id="Delete">Delete</div></td>
         </tr>
        
        `
    }
}
}
tbody.innerHTML =table;
}