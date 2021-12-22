// fetch和json的认识
// 用户操作http的请求相应 fetch原生的js 不是ajax的封装
// fetch 是内置在浏览器中
// get请求 

// 获取汇率 实现dom节点更新

function calculate(){
const currency_one = currencyOne.value;
const currency_two = currencyTwo.value;

if (fixRate.checked){
	const rate = rateEl.value
	amountTwo.value = (rate * amountOne.value).toFixed(2);
	result.value = Number(amountTwo.value) + Number(extra_amount.value);

}
else{
	fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`).then(res=>res.json()).then(data=>{
		const rate = data.rates[currency_two];
		// console.log(rate);
		rateElb.innerHTML = `1${currency_one}`;
		rateEla.innerHTML = `1${currency_two}`;
		rateEl.value =  `${rate}`;
		amountTwo.value = (rate * amountOne.value).toFixed(2);
		result.value = Number(amountTwo.value) + Number(extra_amount.value);
	})
}
}



// 获取节点
const currencyOne = document.querySelector('#currency-one');
const currencyTwo = document.querySelector('#currency-two');

const amountOne =document.querySelector('#amount-one');
const amountTwo =document.querySelector('#amount-two');

const swap =document.querySelector('#swap');
const rateEl =document.querySelector('#rate');
const rateElb =document.querySelector('#rate_before');
const rateEla =document.querySelector('#rate_after');
const fixRate = document.querySelector('#fixrate');
const extra_amount = document.querySelector('#extra-amount');
const result = document.querySelector('#result');

// 事件监听
currencyOne.addEventListener('change',calculate);
currencyTwo.addEventListener('change',calculate);
amountOne.addEventListener('change',calculate);
amountOne.addEventListener('input',calculate);
amountTwo.addEventListener('input',calculate);

rateEl.addEventListener('change',calculate);
rateEl.addEventListener('input',calculate);
fixRate.addEventListener('change',calculate);
fixRate.addEventListener('input',calculate);
extra_amount.addEventListener('change',calculate);
extra_amount.addEventListener('input',calculate);

// 交换 
swap.addEventListener('click',()=>{
	let temp = null;
	temp = currencyOne.value;
	currencyOne.value = currencyTwo.value;
	currencyTwo.value = temp;
	calculate();
});
calculate();