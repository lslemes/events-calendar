$("#del").click(del);
$("#edi").click(edi);

function del() {
	var id = $(this).attr('data-id');
	jQuery.ajax({
		url: '/events/' + id,
		type: 'DELETE',
		success: function(data) {
			$("#back").trigger('click');
		}
	});
}

function edi() {
	var id = $(this).attr('data-id');
	var obj = {"_id":id, "description":$("#description").val(), "begin":$("#begindate").val()+'T'+$("#begintime").val()+':00Z', "end":$("#enddate").val()+'T'+$("#endtime").val()+':00Z'};

	jQuery.ajax({
		url: '/events/' + id,
		type: 'PUT',
		data: obj,
		success: function(data) {
			$("#back").trigger('click');
		}
	});
}