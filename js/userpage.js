var profile = null;

var uid = null;
var access_token = null;

uid = chrome.extension.getBackgroundPage().uid;
access_token = chrome.extension.getBackgroundPage().access_token;

if (chrome.extension.getBackgroundPage().profile == null) {

	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", "http://47.94.174.82/XMUReader/api/users/"+uid +
		"/profile?access_token=" + access_token + "&uid=" + uid, false);
	xmlhttp.setRequestHeader("Content-Type",
			"application/x-www-form-urlencoded");
	xmlhttp.send(null);
	var obj = eval("(" + xmlhttp.responseText + ")");
	chrome.extension.getBackgroundPage().profile = obj;
}

profile = chrome.extension.getBackgroundPage().profile;


document.getElementById("1").href = "http://47.94.174.82/XMUReader/user/"+uid+"/content";
document.getElementById("bkan").innerHTML = "&nbsp;" + "<span> "+
						profile.num_of_books+" books "
						+ profile.num_of_annotations+" annotations "
						+"</span>";

document.getElementById("2").href = "http://47.94.174.82/XMUReader/user/"+uid+"/following";
document.getElementById("Following").innerHTML = "<span>"+"Following "
		+ profile.num_of_following +"</span>";

document.getElementById("3").href = "http://47.94.174.82/XMUReader/user/"+uid+"/follower";
document.getElementById("Follower").innerHTML = "<span>"+"Follower "
	+ profile.num_of_follower +"</span>";