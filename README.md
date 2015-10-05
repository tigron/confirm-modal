# confirm-modal
Bootstrap confirmation modal

## Description

This small plugin can be used to create confirmation modals when clicking a link

## Installation

Installation with bower:

  `bower install tigron-confirm-modal`

include the following line in your project:

  `<script src="/bower_components/confirm-modal/js/bootstrap.confirm-modal.js"></script>`

Activate:

  `$('a[data-confirm-message]').confirmModal();`


## Features

The following attributes can be added to the link:

	data-confirm-title: The title of the modal
	data-confirm-message: The message in the dialog
	data-confirm-btn-ok: The caption of the OK button (default: Ok)
	data-confirm-btn-cancel: The caption of the Cancel button (default: Cancel)
