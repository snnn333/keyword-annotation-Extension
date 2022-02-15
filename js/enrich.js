var obj = null;
var annotations = null
var uid = null;
var access_token = null;
var pageContent = "";
var keywords = "";

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
	annotations = null;
	pageContent = "";
	
	
	sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
	//pageContent = JSON.stringify(request);
	pageContent = request.pageContent;
	
	var tokens = null;
	uid = chrome.extension.getBackgroundPage().uid;
	access_token = chrome.extension.getBackgroundPage().access_token;

	//lda提取关键词
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "http://localhost:8080/lda",false);
	xhr.setRequestHeader("Content-Type", "application/json");
   	//var data = pageContent.toString();
   	//console.log(pageContent);
   	xhr.send(pageContent);
   	var obj2 = eval("(" + xhr.responseText + ")");
    keywords = obj2.msg;
 
 	/*var xhr = new XMLHttpRequest();
 		xhr.open("POST", "http://localhost:9200/baiduinfo/_analyze",false);
		xhr.setRequestHeader("Content-Type", "application/json");
   		var data = JSON.stringify({"analyzer":"ik_smart","text":pageContent});
    	xhr.send(data);
    	var obj2 = eval("(" + xhr.responseText + ")");
   		tokens = obj2.tokens;
   		
    	keywords = "";
    			for(var token of tokens)
    			{
    				keywords += token.token+"|";
    			}
*/
   	

console.log(keywords);
var xmlhttp = new XMLHttpRequest();
var params = "access_token=" + access_token + "&keywords="
					+ keywords + "&uid=" + uid +"&search_type=document";
xmlhttp.open("POST", "http://47.94.174.82/XMUReader/api/annotations/search",
					false);
xmlhttp.setRequestHeader("Content-type",
		"application/x-www-form-urlencoded");
xmlhttp.send(params);
obj = eval("(" + xmlhttp.responseText + ")");
  
annotations = obj.annotations;

//for (var annotation of annotations)
for (var i = 0; i < 1; i++)
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
		document
				.write("<div class='feeds'>"+keyword+":<a target='_blank'>"
						+ "<img style='float:right' width='60' height='60' src="+source_img
						+ " /></a><div class='inner'>");
		document
				.write("<a class='link' target='_blank'>"
						+ name
						+ "</a> :  "+comment_body);
		document.
				write("<div><a class='link' target='_blank' href="+source_link
						+ ">"
						+"来源：​​​"+source+ "</a>"
						+"</div></div></div></div><hr>");

		

	}

	
});


