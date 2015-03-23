jQuery2(function() {
	Redcase.Environments.bind();
});

Redcase.Environments = {};

Redcase.Environments.bind = function() {
	jQuery2('#btn_save_environment').on('click', Redcase.Environments.btn_save_click);
	jQuery2('#btn_create_environment').on('click', Redcase.Environments.btn_create_click);
	jQuery2('#btn_destroy_environment').on('click', Redcase.Environments.btn_destroy_click);
}

Redcase.Environments.btn_destroy_click = function(event) {
	var 
		apiParms = {},
		environment_id = jQuery2('#execution_environment_id').val();
		
	jQuery2.extend(apiParms, Redcase.methods.environments.actions.destroy.getCall(environment_id), {
		success : function (data, textStatus, request) {			
			jQuery2('#execution_environment_id option:selected').remove();
			jQuery2('#execution_environment_id').change();
		},
		errorMessage : "Environment '" + jQuery2('#execution_environment_id option:selected').text() + "' can't be deleted",
		complete : function() {
			Redcase.full();
		}
	});
	Redcase.apiCall(apiParms);	
		
	event.preventDefault();
}

Redcase.Environments.btn_create_click = function(event) {
	var 
		apiParms = {},
		name = jQuery2('#execution_environment_name').val();
		
	jQuery2.extend(apiParms, Redcase.methods.environments.actions.create.getCall(), {
		params : {
			'execution_environment' : {
				'name' : name,
				'description': jQuery2('#execution_environment_description').val()
			}
		},
		success : function (data, textStatus, request) {			
			jQuery2('#execution_environment_id').append(jQuery2('<option>', { value : data.execution_environment.id }).text(name));			
			jQuery2('#execution_environment_id').val(data.execution_environment.id);			
		},
		errorMessage : "Environment '" + name + "' can't be created",
		complete : function() {
			Redcase.full();
		}
	});
	Redcase.apiCall(apiParms);	
		
	event.preventDefault();
}

Redcase.Environments.btn_save_click = function(event) {
	var 
		apiParms = {},
		environment_id = jQuery2('#execution_environment_id').val(),
		name = jQuery2('#execution_environment_name').val();
		
	jQuery2.extend(apiParms, Redcase.methods.environments.actions.update.getCall(environment_id), {
		params : {
			'execution_environment' : {
				'name' : name,
				'description': jQuery2('#execution_environment_description').val()
			}
		},
		success : function (data, textStatus, request) {			
			jQuery2('#execution_environment_id option:selected').text(name);
		},
		errorMessage : "Environment '" + name + "' can't be renamed",
		complete : function() {
			Redcase.full();
		}
	});
	Redcase.apiCall(apiParms);	
		
	event.preventDefault();
}