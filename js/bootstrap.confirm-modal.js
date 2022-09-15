$(function ( $ ) {
	var bootstrap_version = $.fn.collapse.Constructor.VERSION.charAt(0);

	$.fn.confirmModal = function() {
		$(this).unbind('click');
		$(this).click(function(ev) {
			if (bootstrap_version == '5') {
				template = '<div id="dataConfirmModal" class="modal fade" role="dialog" aria-labelledby="dataConfirmLabel" aria-hidden="true" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">%%title%%</h4><button type="button" class="btn-close" aria-label="Close" data-bs-dismiss="modal"></button></div><div class="modal-body"><p>%%message%%</p></div><div class="modal-footer"><a class="btn btn-primary" href="%%btn_href%%" id="data-confirm-ok">%%btn_ok%%</a><a class="btn btn-outline-secondary" data-bs-dismiss="modal" aria-hidden="true" id="data-confirm-cancel">%%btn_cancel%%</a></div></div></div></div>';
			} else if (bootstrap_version == '4') {
				template = '<div id="dataConfirmModal" class="modal fade" role="dialog" aria-labelledby="dataConfirmLabel" aria-hidden="true" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">%%title%%</h4><button type="button" class="close" data-dismiss="modal">x</button></div><div class="modal-body"><p>%%message%%</p></div><div class="modal-footer"><a class="btn btn-primary" href="%%btn_href%%" id="data-confirm-ok">%%btn_ok%%</a><a class="btn btn-outline-secondary" data-dismiss="modal" aria-hidden="true" id="data-confirm-cancel">%%btn_cancel%%</a></div></div></div></div>';
			} else if (bootstrap_version == '3') {
				template = '<div id="dataConfirmModal" class="modal fade" role="dialog" aria-labelledby="dataConfirmLabel" aria-hidden="true" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">%%title%%</h4><button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button></div><div class="modal-body"><p>%%message%%</p></div><div class="modal-footer"><a class="btn btn-primary" href="%%btn_href%%" id="data-confirm-ok">%%btn_ok%%</a><a class="btn btn-default" data-dismiss="modal" aria-hidden="true" id="data-confirm-cancel">%%btn_cancel%%</a></div></div></div></div>';
			} else {
				template = '<div id="dataConfirmModal" class="modal fade" role="dialog" aria-labelledby="dataConfirmLabel" aria-hidden="true" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">%%title%%</h4><button type="button" class="modal-close" data-dismiss="modal" aria-label="Close">x</button></div><div class="modal-body"><p>%%message%%</p></div><div class="modal-footer"><a class="btn btn-primary" href="%%btn_href%%" id="data-confirm-ok">%%btn_ok%%</a><a class="btn btn-default" data-dismiss="modal" aria-hidden="true" id="data-confirm-cancel">%%btn_cancel%%</a></div></div></div></div>';
			}

			var data = {'title': '', 'message': '', 'btn_ok': '', 'btn_href': '', 'btn_cancel': '', 'callback_ok': false, 'callback_cancel': false};
			data.title = $(this).data('confirm-title');
			data.message = $(this).data('confirm-message');
			data.btn_ok = $(this).data('confirm-btn-ok');
			data.btn_cancel = $(this).data('confirm-btn-cancel');
			data.btn_href = $(this).prop('href');
			data.callback_ok = $(this).data('confirm-callback-ok')
			data.callback_cancel = $(this).data('confirm-callback-cancel')
			if (typeof data.title !== 'undefined') {
				template = template.replace('%%title%%', data.title);
			}
			if (typeof data.message !== 'undefined') {
				template = template.replace('%%message%%', data.message);
			}
			if (typeof data.btn_ok !== 'undefined') {
				template = template.replace('%%btn_ok%%', data.btn_ok);
			} else {
				template = template.replace('%%btn_ok%%', 'OK');
			}
			if (typeof data.btn_cancel !== 'undefined') {
				template = template.replace('%%btn_cancel%%', data.btn_cancel);
			} else {
				template = template.replace('%%btn_cancel%%', 'Cancel');
			}
			if (typeof data.btn_href !== 'undefined') {
				template = template.replace('%%btn_href%%', data.btn_href);
			} else {
				template = template.replace('%%btn_href%%', 'javascript:void(0)');
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

			if (data.callback_ok) {
				$('body').on('click.confirm', '#dataConfirmModal #data-confirm-ok', function (e) {
					e.preventDefault();
					window[data.callback_ok](this, ev);
					$('body').off('click.confirm', '#dataConfirmModal #data-confirm-ok').off('click.cancel', '#dataConfirmModal #data-confirm-cancel');
					return false;
				});
			} else {
				$('body').on('click.confirm', '#dataConfirmModal #data-confirm-ok', function (e) {
					$('body').off('click.confirm', '#dataConfirmModal #data-confirm-ok').off('click.cancel', '#dataConfirmModal #data-confirm-cancel');
				});
			}

			if (data.callback_cancel) {
				$('body').on('click.cancel', '#dataConfirmModal #data-confirm-cancel', function (e) {
					e.preventDefault();
					window[data.callback_cancel](this, ev);
					$('body').off('click.confirm', '#dataConfirmModal #data-confirm-ok').off('click.cancel', '#dataConfirmModal #data-confirm-cancel');
					return false;
				});
			} else {
				$('body').on('click.cancel', '#dataConfirmModal #data-confirm-cancel', function (e) {
					$('body').off('click.confirm', '#dataConfirmModal #data-confirm-ok').off('click.cancel', '#dataConfirmModal #data-confirm-cancel');
				});
			}

			return false;
		});
	};
});
