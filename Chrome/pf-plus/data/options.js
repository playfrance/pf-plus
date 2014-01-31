$(document).ready(function() {
	// Restores select box state to saved value from localStorage.
	$('input').each(function(index) {
		var $this = $(this);
		$this.attr('checked', localStorage[$this.attr('name')] == "true" ? true : false);
	});
	
	$('select').each(function(index) {
		var $this = $(this);
		$this.val(localStorage[$this.attr('name')]);
	});
	
	// Saves options to localStorage.
	$('#save').on('click', function save_options() {
		$('input').each(function(index) {
			var $this = $(this);
			
			localStorage[$this.attr('name')] = $this.is(':checked');
		});
		
		$("select").each(function(index) {
			var $this = $(this);
			localStorage[$this.attr('name')] = $this.val();
		});

		// Update status to let user know options were saved.
		$("#status").html("Modification(s) enregistr&eacute;e(s)");

		setTimeout(
			function() { $("#status").html(""); },
			750
		);
	});
});