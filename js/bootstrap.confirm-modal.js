$(function ( $ ) {
	var bootstrap_version = $.fn.collapse.Constructor.VERSION.charAt(0);

	$.fn.confirmModal = function() {
		$(this).unbind('click');
		$(this).click(function(ev) {
			if (bootstrap_version == '3') {
				template = '<div id="dataConfirmModal" class="modal fade" role="dialog" aria-labelledby="dataConfirmLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">%%title%%</h4><button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button></div><div class="modal-body"><p>%%message%%</p></div><div class="modal-footer"><a class="btn btn-primary" href="%%btn_href%%" id="data-confirm-ok">%%btn_ok%%</a><a class="btn btn-default" data-dismiss="modal" aria-hidden="true" id="data-confirm-cancel">%%btn_cancel%%</a></div></div></div></div>';
			} else {
				template = '<div id="dataConfirmModal" class="modal fade" role="dialog" aria-labelledby="dataConfirmLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">%%title%%</h4><button type="button" class="modal-close" data-dismiss="modal" aria-label="Close">x</button></div><div class="modal-body"><p>%%message%%</p></div><div class="modal-footer"><a class="btn btn-primary" href="%%btn_href%%" id="data-confirm-ok">%%btn_ok%%</a><a class="btn btn-default" data-dismiss="modal" aria-hidden="true" id="data-confirm-cancel">%%btn_cancel%%</a></div></div></div></div>';
			}

			var data = {'title': '', 'message': '', 'btn_ok': '', 'btn_href': '', 'btn_cancel': ''};
			data.title = $(this).data('confirm-title');
			data.message = $(this).data('confirm-message');
			data.btn_ok = $(this).data('confirm-btn-ok');
			data.btn_cancel = $(this).data('confirm-btn-cancel');
			data.btn_href = $(this).prop('href');

			if (typeof data.title !== 'undefined') {
				template = template.replace('%%title%%', data.title);
			}
			if (typeof data.message !== 'undefined') {
				template = template.replace('%%message%%', data.message);
			}
			if (typeof data.btn_ok !== 'undefined') {
				template = template.replace('%%btn_ok%%', data.btn_ok);
			} else {
				template = template.replace('%%btn_ok%%', 'Ok');
			}
			if (typeof data.btn_cancel !== 'undefined') {
				template = template.replace('%%btn_cancel%%', data.btn_cancel);
			} else {
				template = template.replace('%%btn_cancel%%', 'Cancel');
			}
			if (typeof data.btn_href !== 'undefined') {
				template = template.replace('%%btn_href%%', data.btn_href);
			}

		    ev.preventDefault();

			if (!$('#dataConfirmModal').length) {
				$('body').append(template);
			} else {
				$('#dataConfirmModal').replaceWith(template);
			}

			if (data.title == '') {
				$('#dataConfirmModal .modal-header').remove();
			}

			$('#dataConfirmModal').modal('show');
			return false;
		});
	};
});
