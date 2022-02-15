
document.getElementById("signin").onclick = function() {
	// document.getElementById("error").innerHTML ="loading"; 
	// username = document.getElementById("username").value;
	// password = document.getElementById("password").value;
	
	// chrome.extension.getBackgroundPage().isLogin=true;
	
	// location.href="profile.html";

	username = document.getElementById("username").value;
	password = document.getElementById("password").value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", "http://47.94.174.82/XMUReader/api/users?cnreader_api_key=202094414349540&cnreader_api_secret=637704063335ed9448w2020936x158ca&name="+
	 username + "&password=" + password, false);
	xmlhttp.setRequestHeader("Content-Type",
			"application/x-www-form-urlencoded");
	xmlhttp.send(null);
	var obj = eval("(" + xmlhttp.responseText + ")");
	if (obj.code != "200") {
		document.getElementById("error").innerHTML = obj.message;
	}
	if (obj.code == "200") {
		chrome.extension.getBackgroundPage().isLogin = true;
		chrome.extension.getBackgroundPage().uid = obj.uid;
		chrome.extension.getBackgroundPage().access_token = obj.access_token;
		chrome.extension.getBackgroundPage().username = username;
		location.href="profile.html";
	}
};

document.getElementById("signup").onclick = function() {
	location.href="signup.html";
};