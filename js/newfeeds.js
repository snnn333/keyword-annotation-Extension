var popular = null;

var uid = null;
var access_token = null;

uid = chrome.extension.getBackgroundPage().uid;
access_token = chrome.extension.getBackgroundPage().access_token;

if (chrome.extension.getBackgroundPage().popular == null) {

	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", "http://47.94.174.82/XMUReader/api/annotations/popular?access_token="
				+access_token+"&uid="+uid, false);
	xmlhttp.send(null);
	var obj = eval("(" + xmlhttp.responseText + ")");
	chrome.extension.getBackgroundPage().popular = obj;
}

popular = chrome.extension.getBackgroundPage().popular;
var number_of_annotations = popular.number_of_annotations;
for ( var i = 0; i < number_of_annotations; i++) {
	var img = popular.annotations[i].comment.img;
	if (img == "")
		img = "images/defaultAvatar.png";
	document
			.write("<div class='feeds'><a target='_blank' href='http://47.94.174.82/XMUReader/book/"
					+ popular.annotations[i].bid
					+ "?bookpage="
					+ popular.annotations[i].pid
					+ "&annotation="
					+ popular.annotations[i].aid
					+ "'><img style='float:right' width='60' height='65' src='"
					+ popular.annotations[i].book_cover
					+ "'/></a><div class='inner'><a target='_blank' href='http://47.94.174.82/XMUReader/user/"
					+ popular.annotations[i].comment.uid
					+ "'>"
					+ "<img src='"
					+ img + "' height='25' width='25'/></a>");
	document
			.write("&nbsp;&nbsp;<a class='link' target='_blank' href='http://47.94.174.82/XMUReader/user/"
					+ popular.annotations[i].comment.uid
					+ "'>"
					+ popular.annotations[i].comment.name
					+ "</a> share annotation in ");
	document
			.write("<a class='link' target='_blank' href='http://47.94.174.82/XMUReader/book/"
					+ popular.annotations[i].bid
					+ "'>"
					+ popular.annotations[i].book_title + "</a>");
	document
			.write("<div class='content'><span class='yellow'><a class='link' target='_blank' href='http://47.94.174.82/XMUReader/book/"
					+ popular.annotations[i].bid
					+ "?bookpage="
					+ popular.annotations[i].pid
					+ "&annotation="
					+ popular.annotations[i].aid
					+ "'>hightlight: "
					+ popular.annotations[i].highlight + "</a></span>");
	document
			.write("<div><a class='link' target='_blank' href='http://47.94.174.82/XMUReader/user/"
					+ popular.annotations[i].comment.uid
					+ "'>"
					+ popular.annotations[i].comment.name
					+ "</a>: "
					+ popular.annotations[i].comment.body[0] + "</div>");

	if (popular.annotations[i].type == 0)
		document.write("</div></div></div>");
	else if (popular.annotations[i].type == 1) {
		document.write("<div><a target='_blank' href='"+popular.annotations[i].comment.link
				+ "'><img width='60' height='70' src='"
				+ popular.annotations[i].comment.link
				+ "'/></a></div></div></div></div>");
	} else {
		if (popular.annotations[i].comment.body[1] != undefined)
			document.write("<div><a target='_blank' href='"
					+ popular.annotations[i].comment.link + "'>"
					+ popular.annotations[i].comment.body[1]
					+ "</a></div></div></div></div>");
		else
			document.write("<div><a target='_blank' href='"
					+ popular.annotations[i].comment.link
					+ "'>link</a></div></div></div></div>");
	}
}