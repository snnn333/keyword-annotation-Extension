var range = null;
var port = chrome.runtime.connect();
var left = null;
var topp = null;
var obj = null;
var searchResultObject  = null;

var isUserLoggedIn      = false;

var isSearchResultReady = false;
var isWaitingResult     = false;

var sidebarDiv          = document.createElement("div");
var resultDiv           = document.createElement("div");
var navDiv              = document.createElement("div");
sidebarDiv.id           = "sidebarDiv";
resultDiv.id            = "resultDiv";
navDiv.id               = "navDiv";
navDiv.innerHTML        = "<button id = 'minButton' class = 'windowButton'>-</button><button id = 'maxButton' class = 'windowButton'>+</button>";
sidebarDiv.appendChild(navDiv);
sidebarDiv.appendChild(resultDiv);
document.body.appendChild(sidebarDiv);


document.getElementById("minButton").onclick=function(){
	sidebarDiv.style.height = "25px";
};

document.getElementById("maxButton").onclick=function(){
	sidebarDiv.style.height = window.innerHeight-50 + "px";
};


//检查是否在登录状态
var available = false;
port.onMessage.addListener(function(msg) {
	//if(msg.value == true)
		available = true;
});
port.postMessage({
	check : "test"
});
window.document.body.addEventListener("mouseup", function() {
	document.getElementById('search1').style.display = "none";
	if (available == true) {
		if (window.rangy.getSelection().getRangeAt(0).toString() != "") {
			document.getElementById('search1').style.display = "block";
			document.getElementById('search1').style.left = left + "px";
			document.getElementById('search1').style.top = topp + "px";
			if (range != null) {
				var a = document.getElementsByTagName("span");
				for ( var i = 0; i < a.length; i++) {
					if (a.item(i).className == "highlight")
						a.item(i).className = "";
				}
			}
			cssApplier.applyToRange(window.rangy.getSelection().getRangeAt(0));
			var a = document.getElementsByTagName("span");
			var str = "";
			for ( var i = 0; i < a.length; i++) {
				if (a.item(i).className == "highlight")
					str = str + a.item(i).innerHTML;
			}
			range = window.rangy.getSelection().getRangeAt(0);
			port.postMessage({
				selection : str
			});
		}
	}
});

document.onmousemove = function(ev) {
	left = ev.clientX;
	topp = ev.clientY;
};

var array = [];
array.push(document.body);
var s = '';
while (array.length != 0) {
	var element = array.pop();
	if (element.nodeType == 3) {
		s = s + element.nodeValue;
	} else {
		if (element.nodeType == 1
				&& (element.nodeName == 'SCRIPT' || element.nodeName == 'STYLE')) {

		} else {
			// console.log(element.nodeName);
			var num = element.childNodes.length - 1;
			for (; num >= 0; num--) {
				array.push(element.childNodes[num]);
			}
		}
	}
}


var para = document.createElement("div");
para.id = "search1";
var a1 = document.createElement("a");
var i1 = document.createElement("img");
i1.src = "https://z3.ax1x.com/2021/05/21/gbGUUS.png";
i1.width = "23";
i1.height = "23";
i1.title = "Search the selection";
a1.appendChild(i1);
para.appendChild(a1);

var indicator = document.createElement("img");
indicator.src = "https://z3.ax1x.com/2021/05/21/gbGUUS.png";
indicator.height = "40";
indicator.title = "all selection";
indicator.id = "indicator";

document.body.appendChild(para);
document.body.appendChild(indicator);

port.onMessage.addListener(function(msg) {
			obj = msg.result;

});
a1.onclick = function() {
	document.getElementById('search1').style.display = "none";
	displaySearchResults(obj);	
};

var displaySearchResults = function(obj)
{
	annotations = obj.annotations;
	resultDiv.innerHTML = "";
	
	for (var annotation of annotations)
	{
		var keyword = annotation.highlight;
		var name = annotation.comment.name;
		//var profile_img = annotation.comment.picture;
		var source_img = annotation.comment.img;
		var comment_body = annotation.comment.body;
		var source_link = annotation.comment.url;
		var source = "";

		if (source_link.search("baidu") != -1)
		{
			source = "百度百科";
		}
		var annotationDiv = document.createElement("div");
		var innerHTML = "";

		innerHTML+="<div class='feeds'>"+keyword+":<a target='_blank'>"
						+ "<img style='float:right' width='60' height='60' src="+source_img
						+ " /></a><div class='inner'>";

		innerHTML += "<a class='link' target='_blank'>"
						+ name
						+ "</a> :  ";

		innerHTML += comment_body;
	    innerHTML += "<div><a class='link' target='_blank' href="+source_link
						+ ">"
						+"来源：​​​"+source+ "</a>";
	
		innerHTML += "</div></div></div></div><hr>";
	

		annotationDiv.innerHTML = innerHTML;
		resultDiv.appendChild(annotationDiv);

	}

	var bodyWidth                        = window.innerWidth-320;
	var sidebarHeight                    = window.innerHeight-50
	document.body.style.width            = bodyWidth+'px';
	sidebarDiv.style.width               = "310px";
	sidebarDiv.style.height              = sidebarHeight+'px';

};

