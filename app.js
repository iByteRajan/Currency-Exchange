// e3118b3715ff9651d898ce2735f5333a
const BaseURL= "https://data.fixer.io/api/latest?access_key=e3118b3715ff9651d898ce2735f5333a&symbols=";
                
let toCurr=document.querySelector(".To");
let fromCurr=document.querySelector(".From");
let btn=document.querySelector("footer button");

const dropdowns=document.querySelectorAll(".entryBox select")
for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name=="To"&& currCode=="USD"){
            newOption.selected=true;
        }
        else if(select.name=="From"&& currCode=="INR"){
            newOption.selected=true;
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

const getExchangeRate=async()=>{
    let amount=document.querySelector("header input");
    let amtVal=amount.value;
    if(amtVal<0){
        amtVal=0;
    }
    const url=`${BaseURL}${toCurr.value},${fromCurr.value}&format=1`;
    let response=await fetch(url);
    let data=await response.json();
    let toRate=data.rates[toCurr.value];
    let fromRate=data.rates[fromCurr.value];

    let unitFrom=toRate/fromRate;
    let convertedValue=unitFrom*amtVal;
    let roundOffVal=convertedValue.toFixed(3);

    console.log(convertedValue);
    let outputArea=document.querySelector('.outputArea');
    outputArea.innerHTML=roundOffVal;
}

btn.addEventListener("click",()=>{
    getExchangeRate();
})