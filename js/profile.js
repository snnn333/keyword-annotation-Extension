document.getElementById("logout").onclick = function() {
	chrome.extension.getBackgroundPage().isLogin = false;
	chrome.extension.getBackgroundPage().uid = null;
	chrome.extension.getBackgroundPage().access_token = null;
};

var username = chrome.extension.getBackgroundPage().username;
document.getElementById("name").innerHTML = "&nbsp;" + "<span>"+username+"</span>";
document.getElementById("2").onclick =tab2;
document.getElementById("1").onclick =tab1;
document.getElementById("3").onclick =tab3;


element=document.getElementById("1");