const url='https://fakestoreapi.com/products';
const searchInput=document.getElementById('search-input');
const menSection=document.getElementById('men-items');
const womenSection=document.getElementById('women-items');
const jewelerySection=document.getElementById('jewelery-items');
const electronicsSection=document.getElementById('electronic-items');
const logout=document.getElementById('logoutBtn');


// filter btn
const allFilterBtn=document.getElementById('allFilterBtn');
const mensFilterBtn=document.getElementById('mensFilterBtn');
const womenFilterBtn=document.getElementById('womenFilterBtn');
const jeweleryFilterBtn=document.getElementById('jeweleryFilterBtn');
const electronicsFilterBtn=document.getElementById('electronicsFilterBtn');

//aside section 
const applyFilterBtn=document.getElementById('applyFilter');


const loggenInUser=JSON.parse(sessionStorage.getItem('loggenInUser'));

if(loggenInUser===null){
    window.location.href="../";
}


// fetch(url)
// .then(responce=>responce.json())
// .then(data=>console.log(data))
// .catch(error=>console.log(error));

var mainData=[];

async function getData(){
    let raw= await fetch(url,{method:"GET"});
    let data=await raw.json();
    
    mainData=data.map(item=>({
        id:item.id,
        title:item.title,
        image:item.image,
        price:item.price,
        rating:item.rating,
        category:item.category
    }));
    // console.log(data);
    // console.log(mainData);
    renderData(mainData);
}
getData();

function renderData(serverResult){
    serverResult.map((e)=>{
        var title=e.title.length>25?e.title.substring(0,25):e.title;

        const div=document.createElement('div');
        div.classList.add('card');
        div.innerHTML=`
        <div class="card-img">
            <img src="${e.image}" alt="img">
        </div>
        <div class="card-info">
            <div class="card-title">${title}
            </div>
            <div class="card-price-size">
                <p class="card-price">$${e.price}</p>
                <p class="card-size">S,M,L,XL</p>
            </div>
            <div class="card-color">
                <p>Colors: 🔴 🔵 🟡</p>
            </div>
            <div class="card-rating">
                <p>Rating:${e.rating.rate}</p>
            </div>
        </div>
        <div class="card-button">
            <button type="button" id="${e.id}" onclick="cartFn()" class="addToCart">Add To Cart</button>
        </div>
        `
        if(e.category==="men's clothing"){
            menSection.appendChild(div);
        }else if(e.category==="jewelery"){
            jewelerySection.appendChild(div);
        }else if(e.category==="electronics"){
            electronicsSection.appendChild(div);
        }else{
            womenSection.appendChild(div);
        }
    });
}

// filter btn script
mensFilterBtn.addEventListener('click',()=>{
    womenSection.style.display='none';
    jewelerySection.style.display='none';
    electronicsSection.style.display='none';
    menSection.style.display='flex';

    allFilterBtn.style.color='black';
    allFilterBtn.style.backgroundColor='white';

    mensFilterBtn.style.color='white';
    mensFilterBtn.style.backgroundColor='black';

    womenFilterBtn.style.color='black';
    womenFilterBtn.style.backgroundColor='white';

    jeweleryFilterBtn.style.color='black';
    jeweleryFilterBtn.style.backgroundColor='white';

    electronicsFilterBtn.style.color='black';
    electronicsFilterBtn.style.backgroundColor='white';

    document.getElementById('mens-heading').style.display='block';
    document.getElementById('women-heading').style.display='none';
    document.getElementById('jewelery-heading').style.display='none';
    document.getElementById('electronics-heading').style.display='none';
    
});


womenFilterBtn.addEventListener('click',()=>{
    womenSection.style.display='flex';
    jewelerySection.style.display='none';
    electronicsSection.style.display='none';
    menSection.style.display='none';

    allFilterBtn.style.color='black';
    allFilterBtn.style.backgroundColor='white';

    mensFilterBtn.style.color='black';
    mensFilterBtn.style.backgroundColor='white';

    womenFilterBtn.style.color='white';
    womenFilterBtn.style.backgroundColor='black';

    jeweleryFilterBtn.style.color='black';
    jeweleryFilterBtn.style.backgroundColor='white';

    electronicsFilterBtn.style.color='black';
    electronicsFilterBtn.style.backgroundColor='white';

    document.getElementById('mens-heading').style.display='none';
    document.getElementById('women-heading').style.display='block';
    document.getElementById('jewelery-heading').style.display='none';
    document.getElementById('electronics-heading').style.display='none';
    
});

jeweleryFilterBtn.addEventListener('click',()=>{
    womenSection.style.display='none';
    jewelerySection.style.display='flex';
    electronicsSection.style.display='none';
    menSection.style.display='none';

    allFilterBtn.style.color='black';
    allFilterBtn.style.backgroundColor='white';

    mensFilterBtn.style.color='black';
    mensFilterBtn.style.backgroundColor='white';

    womenFilterBtn.style.color='black';
    womenFilterBtn.style.backgroundColor='white';

    jeweleryFilterBtn.style.color='white';
    jeweleryFilterBtn.style.backgroundColor='black';

    electronicsFilterBtn.style.color='black';
    electronicsFilterBtn.style.backgroundColor='white';

    document.getElementById('mens-heading').style.display='none';
    document.getElementById('women-heading').style.display='none';
    document.getElementById('jewelery-heading').style.display='block';
    document.getElementById('electronics-heading').style.display='none';
    
});

electronicsFilterBtn.addEventListener('click',()=>{
    womenSection.style.display='none';
    jewelerySection.style.display='none';
    electronicsSection.style.display='flex';
    menSection.style.display='none';

    allFilterBtn.style.color='black';
    allFilterBtn.style.backgroundColor='white';

    mensFilterBtn.style.color='black';
    mensFilterBtn.style.backgroundColor='white';

    womenFilterBtn.style.color='black';
    womenFilterBtn.style.backgroundColor='white';

    jeweleryFilterBtn.style.color='black';
    jeweleryFilterBtn.style.backgroundColor='white';

    electronicsFilterBtn.style.color='white';
    electronicsFilterBtn.style.backgroundColor='black';

    document.getElementById('mens-heading').style.display='none';
    document.getElementById('women-heading').style.display='none';
    document.getElementById('jewelery-heading').style.display='none';
    document.getElementById('electronics-heading').style.display='block';
    
});

allFilterBtn.addEventListener('click',()=>{
    womenSection.style.display='flex';
    jewelerySection.style.display='flex';
    electronicsSection.style.display='flex';
    menSection.style.display='flex';

    allFilterBtn.style.color='white';
    allFilterBtn.style.backgroundColor='black';

    mensFilterBtn.style.color='black';
    mensFilterBtn.style.backgroundColor='white';

    womenFilterBtn.style.color='black';
    womenFilterBtn.style.backgroundColor='white';

    jeweleryFilterBtn.style.color='black';
    jeweleryFilterBtn.style.backgroundColor='white';

    electronicsFilterBtn.style.color='black';
    electronicsFilterBtn.style.backgroundColor='white';

    document.getElementById('mens-heading').style.display='block';
    document.getElementById('women-heading').style.display='block';
    document.getElementById('jewelery-heading').style.display='block';
    document.getElementById('electronics-heading').style.display='block';
    
});


//search data
searchInput.addEventListener('input', () => {

    menSection.innerHTML='';
    womenSection.innerHTML='';
    jewelerySection.innerHTML='';
    electronicsSection.innerHTML='';

    const searchValue = searchInput.value.toLowerCase();
    const filteredData = mainData.filter(item => item.title.toLowerCase().includes(searchValue));
    // console.log(filteredData);
    renderData(filteredData);
});



//filter data
applyFilterBtn.addEventListener('click',()=>{
    const rating=document.getElementById('rating').value;
    
    //price range
    const r1=document.getElementById('range1').checked;//0to25
    const r2=document.getElementById('range2').checked;//25to50
    const r3=document.getElementById('range3').checked;//50to100
    const r4=document.getElementById('range4').checked;//100+

    if(r1===true || r2===true || r3===true || r4===true ||rating>=0){
        //filtered data on basis of rating
        var searchMinValue=0;
        var searchMaxValue=10000;
        menSection.innerHTML='';
        womenSection.innerHTML='';
        jewelerySection.innerHTML='';
        electronicsSection.innerHTML='';
        if(r1){
            searchMinValue=0;
            if(r2){
                if(r3){
                    if(r4){
                        //all prices 
                        searchMaxValue=100000;
                    }else{
                        //0to100;
                        searchMaxValue=100;
                    }
                }else{
                    //0to 50
                    searchMaxValue=50;
                }
            }else{
                searchMaxValue=25;
            }
        }else if(r2){
            searchMinValue=25;
            if(r3){
                if(r4){
                    //25+++
                    searchMaxValue=100000;
                }else{
                    searchMinValue=100;
                }
            }else{
                searchMaxValue=50;
            }
        }else if(r3){
            searchMinValue=50;
            if(r4){
                searchMaxValue=100000;
            }else{
                searchMaxValue=100;
            }
        }else if(r4){
            searchMinValue=100;
            searchMaxValue=100000;
        }

        const filteredData=mainData.filter((item)=>{
            return item.price<=searchMaxValue && item.price>=searchMinValue ||item.rating>rating;
        })
        // console.log(filteredData);
        renderData(filteredData);
    }
    // console.log(rating ,r1,r2,r3,r4);
});

var num=1;
function cartFn(){
    // console.log(event.target);
    // console.log(mainData[event.target.id]);
    let obj=mainData[event.target.id];
    // console.log(obj);

    let item = JSON.parse(localStorage.getItem('item'));
    if(item === null){
        item = [];
    }
    var product={
        srNo:num,
        nameInput:obj.title,
        price:obj.price,
    }
    item.push(product);
    localStorage.setItem('item',JSON.stringify(item));

    num=++num;
};

logout.addEventListener('click',()=>{
    sessionStorage.clear();
    
    window.location.href='../'
})


