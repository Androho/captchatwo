console.log("v1");


//const app = document.getElementById('app')
const IANRBmodal = document.createElement('div')
const IANRBopenModalBtn = document.getElementById('notarobot-modal-btn')
//const API_url = '//getleadchecker.com/api/v1/powergroup/index.php?id='
//const main_pas = '//wsspowergroups.com/api/v1/powergroup'
const userFuncName = IANRBopenModalBtn.dataset.userFunc
let user_API = '', user_id = '', con
const userId = IANRBopenModalBtn.dataset.userId;

var refId = '';
var email = '';

//robot:
var IANRB_tid = 0;
var IANRB_w = 6; //5; //11;  //  << this numbers must match in css: width: calc( (100% - 4px) / 5);
var IANRB_h = 4;//3; //5; //  << this numbers must match in css:  height: calc( (100% - 4px) / 3); 
var IANRB_check = [];
var IANRB_step = 1;
var w1200 = 1200;
var h628 = 628;

sendInd = 0;

function notarobot_API() {
    IANRBini(user_id)
}

IANRBopenModalBtn.addEventListener('click', () => {
    
    notarobot_API();
});


function IANRBshowModal(content) {
    IANRBmodal.innerHTML = content;
    IANRBmodal.style.display = 'flex';
    IANRBmodal.style.position = 'fixed';
    IANRBmodal.style.top = '0';
    IANRBmodal.style.left = '0';
    IANRBmodal.style.width = '100%';
    IANRBmodal.style.height = '100%';
    IANRBmodal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    IANRBmodal.style.zIndex = '9999';
    document.body.appendChild(IANRBmodal);
}

function IANRBusFunc() {
	
	console.log("IANRBusFunc");
	
	
	setTimeout(function() {
			 IANRBgo();
		}, 1000);
}
function  IANRBgo(){
	
	console.log("IANRBgo 1"); 
	
	$(".IamNotARobot-mainImg h2").addClass("IamNotARobot-hid");
	$(".IamNotARobot-answers").html('<div id="IamNotARobot-continue" onclick="IANRBClose()">Continue</div>');
	
	console.log("IANRBgo 2"); 
	
}
function IANRBgetTopics (fileName, ) {
	let  request = new XMLHttpRequest()
	request.open('GET', fileName, false)
	request.send(null)
	return  request.responseText
}
function IANRBini(arg) {
	
	
	
	
	let popup_html=IANRBgetTopics('//iwebthinkbig.com/api/notarobot/popup.html?v=2')
    //let dynamic_tn= document.getElementById('DynamicTopics')
    //dynamic_tn.innerHTML=tn_html
	
	
	IANRBshowModal(popup_html);
	
	
	setTimeout(function() {
			whenReady()
		}, 1000);
		
	
}
	
function whenReady(){
	
	var img = document.getElementById('IamNotARobot-robot-img'); 
	var imgH = img.clientHeight;
	
	if(imgH > 0){
		//good to go	
		IANRB_ini();
		
	}else{
		//wait until img loads
		setTimeout(function() {
			whenReady()
		}, 1000);
	}
	
}


function IANRBClose(){

	
	$("#"+IANRBopenModalBtn.dataset.showElm).css('display', 'grid');
	$("#"+IANRBopenModalBtn.dataset.hideElm).css('display', 'none');
	
	document.body.removeChild(IANRBmodal);
	

	
}

function IANRB_ini(){

console.log("robot_ini: v1 userId=" + userId + " :: " + IANRBopenModalBtn.dataset.showElm);

console.log("test: " + test);

	IANRB_tid = 0;
	IANRB_step = 1

	$(".IamNotARobot-mainImg h2").removeClass("IamNotARobot-hid");
	
	IANRB_prep();
	
	var str = '';
	var top = (IANRB_w)  *  (IANRB_h);
	
	for (i=0; i<top; i++){
		str += "<div class='IamNotARobot-tile' id='IamNotARobot-"+i+"' onclick='IamNotARobot_tile("+i+")'></div>";
	}
	
	$(".IamNotARobot-imgNet").html(str);
	
	$("#IamNotARobot-c"+IANRB_step).addClass('IamNotARobot-current');
	
	
}


function IANRB_resetTile(id){
	$("#IamNotARobot-"+id).removeClass("IamNotARobot-wrong");
	$("#IamNotARobot-"+id).removeClass("IamNotARobot-right");
}

function IamNotARobot_tile(id){


	console.log( id + " :  IANRB_step=" + IANRB_step + " :: " + IANRB_check[IANRB_step]);
	
	if( id != IANRB_check[IANRB_step]){
	
		$("#IamNotARobot-"+id).addClass("IamNotARobot-wrong");
		setTimeout(function() {
			IANRB_resetTile(id)
		}, 1000);
		
		
	}else{
		$("#IamNotARobot-"+id).addClass("IamNotARobot-right");
		setTimeout(function() {
			IANRB_resetTile(id)
		}, 1000);
		$("#IamNotARobot-c"+IANRB_step).removeClass('IamNotARobot-current');
		$("#IamNotARobot-c"+IANRB_step).addClass('IamNotARobot-done');
		IANRB_step++;
		$("#IamNotARobot-c"+IANRB_step).addClass('IamNotARobot-current');
		
		if(IANRB_step > 3){
			
			IANRBusFunc();
			
		}
	}

}


var selArr = [];

function IANRB_prep(){
	
	
	var anwW = $(".IamNotARobot-answers").css("width").replace("px", "");
	
	
	var img = document.getElementById('IamNotARobot-robot-img'); 
	var imgW = img.clientWidth;
	var imgH = img.clientHeight;

	
	
	console.log("!!! @@@: imgW:" + imgW + ":  imgH="+ imgH + " :: " + anwW + " ::::: " + $("#IamNotARobot-robot-img").css("height"));
	
	
	
	
	
	
	
	/*
	original
	
	$("#IamNotARobot-bg1").css("width", imgW);
	$("#IamNotARobot-bg2").css("width", imgW);
	$("#IamNotARobot-bg3").css("width", imgW);
	
	
	$(".IamNotARobot-container").css("width", imgW/IANRB_w);
	$(".IamNotARobot-container").css("height", imgH/IANRB_h);
	*/
	
	/* new width - larger */
	var newW = imgW *0.28;
	var newBkgW = newW*IANRB_w;
	var newBkgH = h628/w1200 * newBkgW;
	var newH = newBkgH/IANRB_h;  // h:w = H : W   >> h = H:W * w   187 X 103
	 ///h628 *newH*IANRB_h;  // w:h = W:H; w = W:H*h   884 220 
	
	
	$("#IamNotARobot-bg1").css("width", newBkgW);
	$("#IamNotARobot-bg2").css("width", newBkgW);
	$("#IamNotARobot-bg3").css("width", newBkgW);
	
	console.log("!!! @@@: newBkgW:" + newBkgW + " :: newH = " + newH + " :: IANRB_h= " + IANRB_h) ;
	
	
	$(".IamNotARobot-container").css("width", newW);
	$(".IamNotARobot-container").css("height", newH);
	
	/**/
	
	

	var w0 = (w1200 / (IANRB_w)); // - 10);
	var h0 = (h628 / (IANRB_h)); //- 10);


	var w1 = ((anwW / IANRB_w)); // - 5 );
	var h1 = w1/h0 * w0;
  
  
	var l = -1;
	var t = -1;
	
	
   for (i = 1; i<4; i++){
   
	var uniqueInd = false;
	
	while(uniqueInd != true){
	
		l = IANRB_getRand(0, IANRB_w - 1);
		t = IANRB_getRand(0, IANRB_h - 1);
		
		
		console.log("!!!: l:" + l + ":  t="+t );

		
		if(selArr.includes(l+"-"+t)){
			uniqueInd = false;
		}else{
			uniqueInd = true;
			selArr[i] = l+"-"+t;
		}
			
		
	}
	//var cssL = l * (w1200/2 / (IANRB_w + 1) );
	//var cssT = t * (h628/2 / ( IANRB_h + 1) ); 
	
	/* original
	
	var IANRB_cssL = l * (imgW / (IANRB_w) );
	var IANRB_cssT = t * (imgH / ( IANRB_h) ); 
	
	*/
	var IANRB_cssL = l * (newBkgW / (IANRB_w) );
	var IANRB_cssT = t * (newBkgH / ( IANRB_h) ); 
	
	
	if( t == 0){
		IANRB_tid = l;
	}else{
	
		IANRB_tid = (IANRB_w) * t + l
	}
	
	IANRB_check[i] = IANRB_tid;
	
	$("#IamNotARobot-bg"+i).css("top", -IANRB_cssT);
	$("#IamNotARobot-bg"+i).css("left", -IANRB_cssL);
	
	
	
	console.log(">>>> [" + i + "]:  IANRB_cssT="+IANRB_cssT + " : " + IANRB_cssL );
	
	
	
	
	}
}

function IANRB_getRand(min, max) {
	
	
	console.log("IANRB_getRand: v1");
	
	
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}



