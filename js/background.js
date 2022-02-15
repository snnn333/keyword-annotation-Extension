var isLogin = false;
var uid = null;
var access_token = null;

var selection = null;
var obj = null;
var before = "";


var tokens = null;

chrome.runtime.onConnect.addListener(function(port) {
	port.onMessage.addListener(function(msg) {
		//判断是否在登录状态
		if (msg.check != undefined) {
			if (isLogin)
				port.postMessage({
					value : "true"
				});
			else
				port.postMessage({
					value : "false"
				});
		}
		if (msg.selection != undefined) {
			selection = msg.selection;
			
			var xhr = new XMLHttpRequest();
				xhr.open("POST", "http://localhost:9200/baiduinfo/_analyze",false);
				xhr.setRequestHeader("Content-Type", "application/json");
   				var data = JSON.stringify({"analyzer":"ik_smart","text":selection});
    			xhr.send(data);
    			var obj2 = eval("(" + xhr.responseText + ")");
    			
    			tokens = obj2.tokens;
    			var keywords = null;
    			keywords = "";
    			for(var token of tokens)
    			{
    				keywords += token.token+"|";
    			}
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
			port.postMessage({
						result : obj
					});
		}
		if (msg.search != undefined) {
			if (msg.search == "keywords") {
				if (before != selection) {
					window.open("search.html", name = "_blank");
					before = selection;
					port.postMessage({
						search : "done"
					});
				}
			}
		}
	});
});


chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
    //alert(tab.url);
 //    if (tab.status === 'complete')
 //    {
 //    	var port = chrome.tabs.connect(tabId, {name: "enrich"});
 //    		if (isLogin){
 //    			console.log(tab.url);
	// 			port.postMessage({
	// 				isNew : "true"
	// 			});
	// 		}
	// }
	var port = chrome.tabs.connect(tabId, {name: "enrich"});
    		if (isLogin){
    			console.log(tab.url);
				port.postMessage({
					isNew : "true"
				});
			}

});


/*
chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
    //alert(tab.url);
    if (tab.status === 'loading') {
    	//updateBrowserAction(id, tab.url);
    	getCurrentTabId((tabId) => {
    		var port = chrome.tabs.connect(tabId, {name: "enrich"});
    		if (isLogin)
				port.postMessage({
					isNew : "true"
				});
			else
				alert("Please Login!");
    		
    		port.onMessage.addListener(function(msg) {
        		//alert('收到消息：'+msg.answer);
       			if(msg.answer && msg.answer.startsWith('我是'))
        		{
        	    	port.postMessage({question: '哦，原来是你啊！'});
       		 	}
    		});
		});
    }
});
*/