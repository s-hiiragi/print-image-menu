var params = {
	title : '印刷', 
	contexts : ['image'], 
	onclick : onPrintImage
};
chrome.contextMenus.create(params, function () {
	if (chrome.runtime.lastError) {
		console.error(chrome.runtime.lastError.message);
		return;
	}
});


function onPrintImage (info, tab) {
	if (chrome.runtime.lastError) {
		console.error(chrome.runtime.lastError.message);
		return;
	}
	
	
	/*
	var details = {
		code : 'var win = window.open("' + info.srcUrl + '", "pop", "width=800, height=480");'
			+ 'win.focus();'
	};
	chrome.tabs.executeScript(tab.id, details, function () {
		if (chrome.runtime.lastError) {
			console.error(chrome.runtime.lastError.message);
			return;
		}
	});
	return;
	*/
	
	
	var params = {
		url : info.srcUrl, 
		index : tab.index+1, 
		openerTabId : tab.id
	};
	chrome.tabs.create(params, onTabCreated);
	
	
	function onTabCreated (tab) {
		if (chrome.runtime.lastError) {
			console.error(chrome.runtime.lastError.message);
			return;
		}
		
		var details = {
			code : 'window.print(); setTimeout(function(){ window.close(); }, 0);'
		};
		chrome.tabs.executeScript(tab.id, details, function () {
			if (chrome.runtime.lastError) {
				console.error(chrome.runtime.lastError.message);
				return;
			}
		});
	}
}
