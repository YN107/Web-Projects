let title = document.querySelector('#title');
let price = document.querySelector('#price');
let taxes = document.querySelector('#taxes');
let ads = document.querySelector('#ads');
let discount = document.querySelector('#discount');
let total = document.querySelector('#total');
let count = document.querySelector('#count');
let category = document.querySelector('#category');
let submit = document.querySelector('#submit');
let search = document.querySelector('#search');

let mood = 'create' 
let tmp;

function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value ;
        if(+result < 0){
            total.innerHTML = '-N';
            total.style.background = 'darkred';
        }else{
            total.innerHTML = result;
            total.style.background = 'green';
        }
    }else{
        total.innerHTML = '';
        total.style.background = 'darkred';
    }
}

let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
}else{
    dataPro = [];
}

submit.onclick = ()=>{
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }

    if( title.value != '' 
        && price.value != '' 
        && category.value != ''
        && count.value < 101
    ){
        if(mood == 'create'){
            if(newPro.count > 1){
                for(let i = 0; i < newPro.count ; i++){
                    dataPro.push(newPro);
                }
            }else{
                dataPro.push(newPro);
            }
        }else{
            dataPro[tmp] = newPro;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
    
        }
        clearData();

    
    }


    localStorage.setItem('product',JSON.stringify(dataPro));
    showData();
}


function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

function showData(){
    getTotal();
    let table = '';
    for(let i = 0; i < dataPro.length ; i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick='updateData(${i})' id="update">update</button></td>
            <td><button onclick='delData(${i})' id="delete">delete</button></td>
    </tr>`
    }

    document.querySelector('#tbody').innerHTML = table ;
    let delAll = document.querySelector('#delAll');
    if(dataPro.length > 0){
        delAll.innerHTML = `<button onclick='DelAll()' >Delete All ( ${dataPro.length} )</button>`
    }else{
        delAll.innerHTML = '';
    }
}
showData();


function delData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

function DelAll(){
    dataPro.splice(0);
    localStorage.clear();
    showData();
}

function updateData(i){
    title.value = dataPro[i].title;
    title.focus();
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataPro[i].category;
    submit.innerHTML = 'Update';
    mood= 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:'smooth'
    });
}


let searchMood = 'tit';

function getSearchMood(id){
    if(id == 'searchTitle'){
        searchMood = 'tit';
        search.placeholder = 'Search By Title'
    }else{
        searchMood = 'cat';
        search.placeholder = 'Search By Category'
    }
    search.focus();
    search.value = '';
    showData();
}


function searchData(data){
    let table = '';
    for(let i = 0; i < dataPro.length ; i++){
        if(searchMood == 'tit'){
                if(dataPro[i].title.includes(data.toLowerCase())){
                    table += `
                        <tr>
                                <td>${i}</td>
                                <td>${dataPro[i].title}</td>
                                <td>${dataPro[i].price}</td>
                                <td>${dataPro[i].taxes}</td>
                                <td>${dataPro[i].ads}</td>
                                <td>${dataPro[i].discount}</td>
                                <td>${dataPro[i].total}</td>
                                <td>${dataPro[i].category}</td>
                                <td><button onclick='updateData(${i})' id="update">update</button></td>
                                <td><button onclick='delData(${i})' id="delete">delete</button></td>
                        </tr>`
                }

        }else{

                if(dataPro[i].category.includes(data.toLowerCase())){
                    table += `
                        <tr>
                                <td>${i}</td>
                                <td>${dataPro[i].title}</td>
                                <td>${dataPro[i].price}</td>
                                <td>${dataPro[i].taxes}</td>
                                <td>${dataPro[i].ads}</td>
                                <td>${dataPro[i].discount}</td>
                                <td>${dataPro[i].total}</td>
                                <td>${dataPro[i].category}</td>
                                <td><button onclick='updateData(${i})' id="update">update</button></td>
                                <td><button onclick='delData(${i})' id="delete">delete</button></td>
                        </tr>`
                }
        }
    }
    document.querySelector('#tbody').innerHTML = table ;

}