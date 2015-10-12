!function() {

	'use strict';

	function em() {
		this.$dom = $(document);		
	}

	// initialize em
	em.prototype.init = function() {
		//em.debug('ignition');

		var scope = this;

		console.log(scope.$dom);
	};

	window.em = new em();


	window.em.init();

	// if AMD return em object to define
	if(typeof define == "function" && define.amd) {
		define(window.em);
	}

}();