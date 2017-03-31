
// 计算rem 模板宽375px
function Rem(temWid){
	resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
	recalc = function (){
		var cWidth = document.documentElement.clientWidth || document.body.clientWidth;
		if (!cWidth) {
			return;
		};
		document.documentElement.style.fontSize = cWidth*(100/temWid) + 'px';
	};
	if (!document.addEventListener) {
		return;
	};
	window.addEventListener(resizeEvt, recalc, false);
    document.addEventListener('DOMContentLoaded', recalc, false);
}

var cWidth = document.documentElement.clientWidth || document.body.clientWidth;
if(cWidth < 1100 || cWidth == 1100 ){
	Rem(375);
	
	$(".order").on("click", function(){
		$(".enter").css({"display" : "none"});
		$(".cont_rese").css({"display" : "block"});
		$("#window").scorll();
	});
	
	//改变图标
	$(".name").siblings("i").removeClass("icon-me").addClass("icon-me1");
//	$(".phone").siblings("i").removeClass("icon-phone").addClass("icon-phone");
	$(".email").siblings("i").removeClass("icon-email").addClass("icon-email1");
}

$(function(){
	//电话与邮箱验证
	var regPhone = /^1[34578]\d{9}$/;
	var regEmail =  /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	var Id = "1000";
	$(".go").on("click", function(){
		var name = $(".name").val();
		var phone = $(".phone").val();
		var email = $(".email").val();
		if(cWidth < 1100 || cWidth == 1100){
			if(name == ""){
				alert("姓名不能为空");
				return false;
			}else if(!(regPhone.test(phone))){ 
				alert("请输入正确的电话号码");
				$(".phone").val("");
				return false;
			}else if (!(regEmail.test(email))){
				alert("请输入正确的邮箱");
				$(".email").val("");
				return false;
			}else {
				alert("预约成功！");
				window.open("http://m.souke.xdf.cn/");
			}
		}else if(cWidth > 1111) {
			if(name == ""){
				alert("姓名不能为空");
				return false;
			}else if(!(regPhone.test(phone))){ 
				alert("请输入正确的电话号码");
				$(".phone").val("");
				return false;
			}else if (!(regEmail.test(email))){
				alert("请输入正确的邮箱");
				$(".email").val("");
				return false;
			}else {
				alert("预约成功！");
				window.open("http://m.souke.xdf.cn/");
	
			}
		}
		
	});
});