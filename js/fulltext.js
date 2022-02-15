// content.js
// 监听长连接
chrome.runtime.onConnect.addListener(function(port) {
    if(port.name === 'enrich') {
    	//console.log(port);
        port.onMessage.addListener(function(msg) {
            if(msg.isNew === "true") {
            	
				var content=document.getElementsByTagName("article")[0].innerText;
				console.log(content);
				chrome.runtime.sendMessage(
					{pageContent: content}, function(response){
						//console.log('收到来自后台的回复：' + response);
					});
			}
        });
    }
});




