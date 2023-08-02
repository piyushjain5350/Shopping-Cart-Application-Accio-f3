const itemCart=document.getElementById('cart-item-body');
const totalAmt=document.getElementById('totalAmt');
const logout=document.getElementById('logoutBtn');
const buyBtn=document.getElementById('buyBtn');

let loggenInUser=JSON.parse(sessionStorage.getItem('loggenInUser'));
if(loggenInUser===null){
    window.location.href='../';
}


let item=JSON.parse(localStorage.getItem('item'));
console.log(item);

var sum=0;
if(item){
  item.forEach((e)=>{
    const tr=document.createElement('tr');

    const srNo=document.createElement('td');
    srNo.innerText=`${e.srNo}`;
    tr.appendChild(srNo);
    const nameInput=document.createElement('td');
    nameInput.innerText=`${e.nameInput}`;
    tr.appendChild(nameInput);
    const price=document.createElement('td');
    price.innerText=`${e.price}`;
    tr.appendChild(price);

    itemCart.appendChild(tr);
    sum+=e.price;
});
}

totalAmt.innerText=`$${sum}`;
sum=sum>0?sum:1;
buyBtn.onclick = function (e) {
    var options = {
      key: "rzp_test_xV39ZNbgU1Du4V", // Enter the Key ID generated from the Dashboard
      amount: sum * 100 ,//check this out if this is paisa or INR // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "MeShop",
      description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      theme: {
        color: "#122620",
      },
      image: "https://cdn-icons-png.flaticon.com/128/891/891419.png",
      handler: function () { // run a function when your payment is successfull
        location.href = "../mainContent";
      },
      options: {
        checkout: {
          method: {
            netbanking: 0,
            card: 0,
            upi: 1,
            wallet: 0,
          },
        },
      },
    };
  
    var rzpy1 = new Razorpay(options);
    rzpy1.open();
    // clear mycart - localStorage
    e.preventDefault();
};
  
console.log(sum);
logout.addEventListener('click',()=>{
    sessionStorage.clear();
    
    window.location.href='../'
})


