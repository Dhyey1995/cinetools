$(document).ready(function() {
	
	// editor save function
	var saveEditedImage = function(item) {
		// if still uploading
		// pend and exit
		if (item.upload && item.upload.status == 'loading')
			return item.editor.isUploadPending = true;

		// if not appended or not uploaded
		if (!item.appended && !item.uploaded)
			return;

		// if no editor
		if (!item.editor || !item.reader.width)
			return;
		
		// if uploaded
		// resend upload
		if (item.upload && item.upload.resend) {
			item.editor._namee = item.name;
			item.upload.resend();
		}
		
		// if appended
		// send request
		if (item.appended) {
			// hide current thumbnail (this is only animation)
			item.imageIsUploading = true;
			item.image.addClass('fileuploader-loading').html('');
			item.html.find('.fileuploader-action-popup').hide();
			
			$.post('php/ajax_resize_file.php', {_file: item.file, _editor: JSON.stringify(item.editor), fileuploader: 1}, function() {
				item.reader.read(function() {
					delete item.imageIsUploading;
					item.html.find('.fileuploader-action-popup').show();
					
					item.popup.html = item.popup.editor = item.editor.crop = item.editor.rotation = null;
					item.renderThumbnail();
				}, null, true);
			});
		}
	};
	
	// enable fileuploader plugin
	$('.add-drop input[name="files"]').fileuploader({
		extensions: ['jpg', 'jpeg', 'png', 'gif','mp3'],
        changeInput: '<div class="fileuploader-input">' +
					      '<div class="fileuploader-input-inner">' +
						      '<img src="dist/img/fileuploader-dragdrop-icon.png">' +
							  '<h3 class="fileuploader-input-caption"><span>Drag and drop files here</span></h3>' +
							  '<p>or</p>' +
							  '<div class="fileuploader-input-button"><span>Browse Files</span></div>' +
						  '</div>' +
					  '</div>',
        theme: 'dragdrop',
		thumbnails: {
			onImageLoaded: function(item) {
				// hide current thumbnail (this is only animation)
				if (item.imageIsUploading) {
					item.image.addClass('fileuploader-loading').html('');
				}
			}
		},
		upload: {
            url: 'php/ajax_upload_file.php',
            data: null,
            type: 'POST',
            enctype: 'multipart/form-data',
            start: true,
            synchron: true,
            beforeSend: function(item) {
				// add editor to upload data
				// note! that php will automatically adjust _editorr to the file
				if (item.editor && (typeof item.editor.rotation != "undefined" || item.editor.crop)) {
					item.upload.data._editorr = JSON.stringify(item.editor);
					if (item.editor._namee) {
						item.upload.data._namee = item.name;
						delete item.editor._namee;
					}
					
					// remove success icon that was added in onSuccess callback
					item.html.find('.column-actions .fileuploader-action-success').remove();
				}
			},
            onSuccess: function(result, item) {
                var data = {};
				
				try {
					data = JSON.parse(result);
				} catch (e) {
					data.hasWarnings = true;
				}
                
				// if success
                if (data.isSuccess && data.files[0]) {
                    item.name = data.files[0].name;
					item.html.find('.column-title > div:first-child').text(data.files[0].name).attr('title', data.files[0].name);
					
					// send pending editor
					if (item.editor && item.editor.isUploadPending) {
						delete item.editor.isUploadPending;
						
						saveEditedImage(item);
					}
                }
				
				// if warnings
				if (data.hasWarnings) {
					for (var warning in data.warnings) {
						alert(data.warnings);
					}
					
					item.html.removeClass('upload-successful').addClass('upload-failed');
					// go out from success function by calling onError function
					// in this case we have a animation there
					// you can also response in PHP with 404
					return this.onError ? this.onError(item) : null;
				}
                
                item.html.find('.column-actions').append('<a class="fileuploader-action fileuploader-action-remove fileuploader-action-success" title="Remove"><i></i></a>');
                setTimeout(function() {
                    item.html.find('.progress-bar2').fadeOut(400);
                }, 400);
            },
            onError: function(item) {
				var progressBar = item.html.find('.progress-bar2');
				
				if(progressBar.length > 0) {
					progressBar.find('span').html(0 + "%");
                    progressBar.find('.fileuploader-progressbar .bar').width(0 + "%");
					item.html.find('.progress-bar2').fadeOut(400);
				}
                
                item.upload.status != 'cancelled' && item.html.find('.fileuploader-action-retry').length == 0 ? item.html.find('.column-actions').prepend(
                    '<a class="fileuploader-action fileuploader-action-retry" title="Retry"><i></i></a>'
                ) : null;
            },
            onProgress: function(data, item) {
                var progressBar = item.html.find('.progress-bar2');
				
                if(progressBar.length > 0) {
                    progressBar.show();
                    progressBar.find('span').html(data.percentage + "%");
                    progressBar.find('.fileuploader-progressbar .bar').width(data.percentage + "%");
                }
            },
            onComplete: null,
        },
		onRemove: function(item) {
			$.post('./php/ajax_remove_file.php', {
				file: item.name
			});
		},
		editor: {
			cropper: {
				showGrid: true,
			},
			onSave: function(dataURL, item) {
				saveEditedImage(item);
			}	
		},
		captions: {
            feedback: 'Drag and drop files here',
            feedback2: 'Drag and drop files here',
            drop: 'Drag and drop files here'
        },
	});
        
        
//        edit
$('.edit-drop input[name="files"]').fileuploader({
		limit: 20,
		fileMaxSize: 20,
		extensions: ['jpg', 'jpeg', 'png', 'gif'],
        changeInput: '<div class="fileuploader-input">' +
					      '<div class="fileuploader-input-inner">' +
						      '<img src="dist/img/fileuploader-dragdrop-icon.png">' +
							  '<h3 class="fileuploader-input-caption"><span>Drag and drop files here</span></h3>' +
							  '<p>or</p>' +
							  '<div class="fileuploader-input-button"><span>Browse Files</span></div>' +
						  '</div>' +
					  '</div>',
        theme: 'dragdrop',
		thumbnails: {
			popup: {
				onShow: function(item) {
                    item.popup.html.on('click', '[data-action="crop"]', function(e) {
						if (item.editor)
                        	item.editor.cropper();
                    }).on('click', '[data-action="rotate-cw"]', function(e) {
						if (item.editor)
                        	item.editor.rotate();
                    }).on('click', '[data-action="remove"]', function(e) {
                        item.popup.close();
                        item.remove();
                    }).on('click', '[data-action="cancel"]', function(e) {
                        item.popup.close();
                    }).on('click', '[data-action="save"]', function(e) {
						if (item.editor)
                        	item.editor.save(function(blob, item) {
								saveEditedImage(blob, item);
							}, true, null, false);
						
						if (item.popup.close)
							item.popup.close();
                    });
                },	
			},
			onImageLoaded: function(item) {
				if (item.appended)
					return;
				
				// hide current thumbnail (this is only animation)
				if (item.imageIsUploading) {
					item.image.addClass('fileuploader-loading').html('');
				}
				
				if (!item.imageLoaded)
					item.editor.save(function(blob, item) {
						saveEditedImage(blob, item);
					}, true, null, true);
				
				item.imageLoaded = true;
			},
		},
		upload: {
			url: 'php/ajax_upload_file.php',
			data: null,
			type: 'POST',
			enctype: 'multipart/form-data',
			start: false,
			synchron: true,
			beforeSend: function(item, listEl, parentEl, newInputEl, inputEl) {
				// add image to formData
				if (item.editor && item.editor._blob) {
					item.upload.data.fileuploader = 1;
					item.upload.formData.delete(inputEl.attr('name'));
					item.upload.formData.append(inputEl.attr('name'), item.editor._blob);
					
					// add name to data
					if (item.editor._namee) {
						item.upload.data._namee = item.name;
						delete item.editor._namee;
					}

					// add is after editing to data
					if (item.editor._editingg) {
						item.upload.data._editingg = true;
					}
				}
			},
			onSuccess: function(result, item) {
                var data = {};
				
				try {
					data = JSON.parse(result);
				} catch (e) {
					data.hasWarnings = true;
				}
                
				// if success
                if (data.isSuccess && data.files[0]) {
                    item.name = data.files[0].name;
					item.html.find('.column-title > div:first-child').text(data.files[0].name).attr('title', data.files[0].name);
					
					// send pending editor
					if (item.editor && item.editor.isUploadPending) {
						delete item.editor.isUploadPending;
						
						saveEditedImage(item.editor._blob, item);
					}
                }
				
				// if warnings
				if (data.hasWarnings) {
					for (var warning in data.warnings) {
						alert(data.warnings);
					}
					
					item.html.removeClass('upload-successful').addClass('upload-failed');
					// go out from success function by calling onError function
					// in this case we have a animation there
					// you can also response in PHP with 404
					return this.onError ? this.onError(item) : null;
				}
                
                item.html.find('.column-actions').append('<a class="fileuploader-action fileuploader-action-remove fileuploader-action-success" title="Remove"><i></i></a>');
                setTimeout(function() {
                    item.html.find('.progress-bar2').fadeOut(400, function() {
						$(this).find('.fileuploader-progressbar .bar').width(0 + "%");
					});
                }, 400);
            },
            onError: function(item) {
				var progressBar = item.html.find('.progress-bar2');
				
				if(progressBar.length > 0) {
					progressBar.find('span').html(0 + "%");
                    progressBar.find('.fileuploader-progressbar .bar').width(0 + "%");
					item.html.find('.progress-bar2').fadeOut(400);
				}
                
                item.upload.status != 'cancelled' && item.html.find('.fileuploader-action-retry').length == 0 ? item.html.find('.column-actions').prepend(
                    '<a class="fileuploader-action fileuploader-action-retry" title="Retry"><i></i></a>'
                ) : null;
            },
            onProgress: function(data, item) {
                var progressBar = item.html.find('.progress-bar2');
				
                if(progressBar.length > 0) {
                    progressBar.show();
                    progressBar.find('span').html(data.percentage + "%");
                    progressBar.find('.fileuploader-progressbar .bar').width(data.percentage + "%");
                }
            },
			onComplete: null,
		},
		files: [{
			file: 'dist/img/photo3.jpg',
			name: 'picture.jpg',
			size: 1508,
			type: 'image/jpeg'
		}],
		editor: {
			cropper: {
				showGrid: true
			},
			maxWidth: 800,
			maxHeight: 600,
			quality: 98
		},
		onRemove: function(item) {
			$.post('./php/ajax_remove_file.php', {
				file: item.name
			});
		},
		captions: {
			feedback: 'Drag and drop files here',
			feedback2: 'Drag and drop files here',
			drop: 'Drag and drop files here'
		},
	});
        //        edit
$('.music-drop input[name="files"]').fileuploader({
		limit: 20,
		fileMaxSize: 20,
		extensions: ['jpg', 'jpeg', 'png', 'gif','mp3'],
        changeInput: '<div class="fileuploader-input">' +
					      '<div class="fileuploader-input-inner">' +
						      '<img src="dist/img/fileuploader-dragdrop-icon.png">' +
							  '<h3 class="fileuploader-input-caption"><span>Drag and drop files here</span></h3>' +
							  '<p>or</p>' +
							  '<div class="fileuploader-input-button"><span>Browse Files</span></div>' +
						  '</div>' +
					  '</div>',
        theme: 'dragdrop',
		thumbnails: {
			popup: {
				onShow: function(item) {
                    item.popup.html.on('click', '[data-action="crop"]', function(e) {
						if (item.editor)
                        	item.editor.cropper();
                    }).on('click', '[data-action="rotate-cw"]', function(e) {
						if (item.editor)
                        	item.editor.rotate();
                    }).on('click', '[data-action="remove"]', function(e) {
                        item.popup.close();
                        item.remove();
                    }).on('click', '[data-action="cancel"]', function(e) {
                        item.popup.close();
                    }).on('click', '[data-action="save"]', function(e) {
						if (item.editor)
                        	item.editor.save(function(blob, item) {
								saveEditedImage(blob, item);
							}, true, null, false);
						
						if (item.popup.close)
							item.popup.close();
                    });
                },	
			},
			onImageLoaded: function(item) {
				if (item.appended)
					return;
				
				// hide current thumbnail (this is only animation)
				if (item.imageIsUploading) {
					item.image.addClass('fileuploader-loading').html('');
				}
				
				if (!item.imageLoaded)
					item.editor.save(function(blob, item) {
						saveEditedImage(blob, item);
					}, true, null, true);
				
				item.imageLoaded = true;
			},
		},
		upload: {
			url: 'php/ajax_upload_file.php',
			data: null,
			type: 'POST',
			enctype: 'multipart/form-data',
			start: false,
			synchron: true,
			beforeSend: function(item, listEl, parentEl, newInputEl, inputEl) {
				// add image to formData
				if (item.editor && item.editor._blob) {
					item.upload.data.fileuploader = 1;
					item.upload.formData.delete(inputEl.attr('name'));
					item.upload.formData.append(inputEl.attr('name'), item.editor._blob);
					
					// add name to data
					if (item.editor._namee) {
						item.upload.data._namee = item.name;
						delete item.editor._namee;
					}

					// add is after editing to data
					if (item.editor._editingg) {
						item.upload.data._editingg = true;
					}
				}
			},
			onSuccess: function(result, item) {
                var data = {};
				
				try {
					data = JSON.parse(result);
				} catch (e) {
					data.hasWarnings = true;
				}
                
				// if success
                if (data.isSuccess && data.files[0]) {
                    item.name = data.files[0].name;
					item.html.find('.column-title > div:first-child').text(data.files[0].name).attr('title', data.files[0].name);
					
					// send pending editor
					if (item.editor && item.editor.isUploadPending) {
						delete item.editor.isUploadPending;
						
						saveEditedImage(item.editor._blob, item);
					}
                }
				
				// if warnings
				if (data.hasWarnings) {
					for (var warning in data.warnings) {
						alert(data.warnings);
					}
					
					item.html.removeClass('upload-successful').addClass('upload-failed');
					// go out from success function by calling onError function
					// in this case we have a animation there
					// you can also response in PHP with 404
					return this.onError ? this.onError(item) : null;
				}
                
                item.html.find('.column-actions').append('<a class="fileuploader-action fileuploader-action-remove fileuploader-action-success" title="Remove"><i></i></a>');
                setTimeout(function() {
                    item.html.find('.progress-bar2').fadeOut(400, function() {
						$(this).find('.fileuploader-progressbar .bar').width(0 + "%");
					});
                }, 400);
            },
            onError: function(item) {
				var progressBar = item.html.find('.progress-bar2');
				
				if(progressBar.length > 0) {
					progressBar.find('span').html(0 + "%");
                    progressBar.find('.fileuploader-progressbar .bar').width(0 + "%");
					item.html.find('.progress-bar2').fadeOut(400);
				}
                
                item.upload.status != 'cancelled' && item.html.find('.fileuploader-action-retry').length == 0 ? item.html.find('.column-actions').prepend(
                    '<a class="fileuploader-action fileuploader-action-retry" title="Retry"><i></i></a>'
                ) : null;
            },
            onProgress: function(data, item) {
                var progressBar = item.html.find('.progress-bar2');
				
                if(progressBar.length > 0) {
                    progressBar.show();
                    progressBar.find('span').html(data.percentage + "%");
                    progressBar.find('.fileuploader-progressbar .bar').width(data.percentage + "%");
                }
            },
			onComplete: null,
		},
		files: [{
			file: 'dist/music/despacito.mp3',
			name: 'despacito.mp3',
			size: 1508,
			type: 'audio/mp3'
		}],
		editor: {
			cropper: {
				showGrid: true
			},
			maxWidth: 800,
			maxHeight: 600,
			quality: 98
		},
		onRemove: function(item) {
			$.post('./php/ajax_remove_file.php', {
				file: item.name
			});
		},
		captions: {
			feedback: 'Drag and drop files here',
			feedback2: 'Drag and drop files here',
			drop: 'Drag and drop files here'
		},
	});
        //banner
        $('#img-drop input[name="files"]').fileuploader({
		extensions: ['jpg', 'jpeg', 'png', 'gif'],
        changeInput: '<div class="fileuploader-input">' +
					      '<div class="fileuploader-input-inner">' +
						      '<img src="dist/img/fileuploader-dragdrop-icon.png">' +
							  '<h3 class="fileuploader-input-caption"><span>Drag and drop files here</span></h3>' +
							  '<p>or</p>' +
							  '<div class="fileuploader-input-button"><span>Browse Files</span></div>' +
						  '</div>' +
					  '</div>',
        theme: 'dragdrop',
		thumbnails: {
			onImageLoaded: function(item) {
				// hide current thumbnail (this is only animation)
				if (item.imageIsUploading) {
					item.image.addClass('fileuploader-loading').html('');
				}
			}
		},
		upload: {
            url: 'php/ajax_upload_file.php',
            data: null,
            type: 'POST',
            enctype: 'multipart/form-data',
            start: true,
            synchron: true,
            beforeSend: function(item) {
				// add editor to upload data
				// note! that php will automatically adjust _editorr to the file
				if (item.editor && (typeof item.editor.rotation != "undefined" || item.editor.crop)) {
					item.upload.data._editorr = JSON.stringify(item.editor);
					if (item.editor._namee) {
						item.upload.data._namee = item.name;
						delete item.editor._namee;
					}
					
					// remove success icon that was added in onSuccess callback
					item.html.find('.column-actions .fileuploader-action-success').remove();
				}
			},
            onSuccess: function(result, item) {
                var data = {};
				
				try {
					data = JSON.parse(result);
				} catch (e) {
					data.hasWarnings = true;
				}
                
				// if success
                if (data.isSuccess && data.files[0]) {
                    item.name = data.files[0].name;
					item.html.find('.column-title > div:first-child').text(data.files[0].name).attr('title', data.files[0].name);
					
					// send pending editor
					if (item.editor && item.editor.isUploadPending) {
						delete item.editor.isUploadPending;
						
						saveEditedImage(item);
					}
                }
				
				// if warnings
				if (data.hasWarnings) {
					for (var warning in data.warnings) {
						alert(data.warnings);
					}
					
					item.html.removeClass('upload-successful').addClass('upload-failed');
					// go out from success function by calling onError function
					// in this case we have a animation there
					// you can also response in PHP with 404
					return this.onError ? this.onError(item) : null;
				}
                
                item.html.find('.column-actions').append('<a class="fileuploader-action fileuploader-action-remove fileuploader-action-success" title="Remove"><i></i></a>');
                setTimeout(function() {
                    item.html.find('.progress-bar2').fadeOut(400);
                }, 400);
            },
            onError: function(item) {
				var progressBar = item.html.find('.progress-bar2');
				
				if(progressBar.length > 0) {
					progressBar.find('span').html(0 + "%");
                    progressBar.find('.fileuploader-progressbar .bar').width(0 + "%");
					item.html.find('.progress-bar2').fadeOut(400);
				}
                
                item.upload.status != 'cancelled' && item.html.find('.fileuploader-action-retry').length == 0 ? item.html.find('.column-actions').prepend(
                    '<a class="fileuploader-action fileuploader-action-retry" title="Retry"><i></i></a>'
                ) : null;
            },
            onProgress: function(data, item) {
                var progressBar = item.html.find('.progress-bar2');
				
                if(progressBar.length > 0) {
                    progressBar.show();
                    progressBar.find('span').html(data.percentage + "%");
                    progressBar.find('.fileuploader-progressbar .bar').width(data.percentage + "%");
                }
            },
            onComplete: null,
        },
		onRemove: function(item) {
			$.post('./php/ajax_remove_file.php', {
				file: item.name
			});
		},
		editor: {
			cropper: {
				showGrid: true,
			},
			onSave: function(dataURL, item) {
				saveEditedImage(item);
			}	
		},
		captions: {
            feedback: 'Drag and drop files here',
            feedback2: 'Drag and drop files here',
            drop: 'Drag and drop files here'
        },
	});
});

//modal team member add edit
 $('.edit').click(function(){
  $(this).hide();
  
   var currentTD = $(this).parents('tr').find('.edit-it ');
        $.each(currentTD, function () {
            $(this).attr('contenteditable', 'true'); 
            $(this).addClass('editable'); 
        });
//  $('td').attr('contenteditable', 'true');  
  $(this).parents('tr').find('.save').show();
});
$('.save').click(function(){
  $(this).hide();
  $('.box').removeClass('editable');
   var currentTD = $(this).parents('tr').find('.edit-it ');
        $.each(currentTD, function () {
            $(this).removeAttr('contenteditable', 'true'); 
            $(this).removeClass('editable'); 
        });
//  $('.text').removeAttr('contenteditable');
  $('.edit').show();
});
$('.remove').click(function(){
    $(this).parent().parent().parent().remove();
});
//edit p
 $('.make-it-edit').click(function(){
//  $(this).hide();
  
   
  $('.make-it-edit').attr('contenteditable', 'true'); 
  $('.make-it-edit').addClass('editable'); 
        
//  $('td').attr('contenteditable', 'true');  
  $('.save2').show();
});
$('.make-it-edit').blur(function(){
  $(this).attr('contenteditable', 'false'); 
  $(this).removeClass('editable'); 
   $('#toast').fadeIn('slow', function(){
               $('#toast').delay(100).fadeOut(); 
            });
});
//$(document).on('click','.editable', function(event){
//    $(this).attr('contenteditable', 'true'); 
//});
//if ($('.make-it-edit').hasClass("editable")) {
//   $(this).attr('contenteditable', 'true'); 
//}
//else{
//   $(this).attr('contenteditable', 'false');  
//}



$('.make-it-edit.editable').blur(function(){
    $('#toast').fadeIn('slow', function(){
               $('#toast').delay(100).fadeOut(); 
            });
    
});
$('.save2').click(function(){
  $(this).hide();
  $('.make-it-edit').attr('contenteditable', 'false'); 
            $('.make-it-edit').removeClass('editable'); 
  
        
//  $('.text').removeAttr('contenteditable');
  $('.edit2').show();
});
$('.remove').click(function(){
    $(this).parent().parent().parent().remove();
});

//bootstrap accordion
function toggleIcon(e) {
    $(e.target)
        .prev('.panel-heading')
        .find(".more-less")
        .toggleClass('glyphicon-plus glyphicon-minus');
}
$('.panel-group').on('hidden.bs.collapse', toggleIcon);
$('.panel-group').on('shown.bs.collapse', toggleIcon);