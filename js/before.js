var cssApplier;
window.onload = function() {
	window.rangy.init();
	cssApplier = window.rangy.createCssClassApplier("highlight", {
		normalize : true
	});

};
