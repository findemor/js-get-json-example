/*
* Name:		JsGet
* Desc:		Ajax json request example: this code perform a Json get request
*			compatible with IE browsers. For non-verbose console mode 
*			set 'jsget_devToolsVerboseMode = false'
* Author: 	@findemor
* Based:	Based on @martin_adm code
* Date:		16/12/2013
* Website:	http://findemor.porexpertos.es
* Requirements:			jQuery min versión required 1.10.2.
* Version:				1.0
*/

JsGet = function(uri, params, onsuccess, onerror) {
  this.init(uri, params, onsuccess, onerror)
}
$.extend(JsGet.prototype, {
  uri : "", 
  params : "",
  onsuccess : null,
  onerror : null,
  // Create.
  init: function(uri, params, onsuccess, onerror){
	this.uri = uri;
	this.params = params;
	this.onsuccess = onsuccess;
	this.onerror = onerror;
  },
  execute: function(){
	this.doJsGet(this.uri, this.params);
  },
  doJsGet: function doJsGet(uri, object) {

  
	var jsget_devToolsVerboseMode = true;
	var jsget_request_url = uri;
	var jsget_request_parameters = object;
	
    var self = this;
	
	
	// store and print log traces
	function addLogTraceMsg(msg) {
		if (jsget_devToolsVerboseMode) {
			console.log(msg);
		}
	}

	// invocamos la pila de llamadas de carga de ads
	function execute(){
		// gets the parameters object
		if (!window.XDomainRequest)
			doAjaxRequest(jsget_request_parameters);
		else //ie fix
			doAjaxIERequest(jsget_request_parameters);
	}

	/* Performs the ajax request */
	function doAjaxRequest(parameters) {
		// alows cors requests (necesary for IE10)
		jQuery.support.cors = true;
		// performs request
		$.ajax(
		{
			type: "GET",
			url: jsget_request_url,
			data: parameters,
			dataType: "text",
			crossDomain: true,
			success: function (data, textStatus, jqXHR) {
				loadOnSuccess(data, textStatus, jqXHR);
			},
			error: loadOnError,
			complete: loadOnComplete
		});
	}

	// performs the request throw XDomainRequest for based IE navigators
	function doAjaxIERequest(parameters) {
		var xdr;
		xdr = new XDomainRequest();
		if (xdr)
		{
			xdr.onerror = err;
			xdr.ontimeout = timeo;
			xdr.onprogress = progres;
			xdr.onload = loaded;
			xdr.timeout = 5000;
			
			var request = jsget_request_url;
			
			if (parameters !== undefined)
			{
				var firstparam = request.indexOf("?") == -1;
				var symbol = firstparam ? "?" : "&";
				request = request + symbol + jQuery.param(parameters, true);
			}
			addLogTraceMsg("xdr: " + request);
			
			xdr.open("get", request);
			xdr.send();
		}
		else { addLogTraceMsg("XDR: Failed to create");	}
		
		function err() { addLogTraceMsg("XDR: onerror"); loadOnError(); }
		function timeo() { addLogTraceMsg("XDR: ontimeout"); loadOnError();  }
		function loaded()
		{
			addLogTraceMsg("XDR: onload");
			HandleResponse(xdr.responseText);
		}
		function progres() { addLogTraceMsg("XDR: onprogress");	}
	}

	// launch if request result error
	function loadOnError(jqXHR, textStatus, errorThrown) {
		// add log tace
		addLogTraceMsg("js-get + error: " + errorThrown);
		if(self.onerror != null)
		{
			self.onerror(textStatus);
		}
	}

	// launch when request finish
	function loadOnComplete(jqXHR, textStatus) {
		// add log tace
		addLogTraceMsg("js-get + complete: process complete");
	}

	// launch if request result ok
	function loadOnSuccess(data, textStatus, jqXHR) {
		try {
			// add log trace
			addLogTraceMsg("js-get + success: request succeed");
			// do process
			HandleResponse(data);
		} catch (err) {
			addLogTraceMsg("js-get + err: " + err);
		}
	}

	// handle the request response
	function HandleResponse(data){
		if (self.onsuccess != null)
		{
			self.onsuccess(data);
		}
	}
	
	
	//execution
	execute();
	
}
});


