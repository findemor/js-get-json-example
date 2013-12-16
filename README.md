js-get json request example
===========================

Ejemplo de uso de Javascript para realizar llamadas GET a un servidor que responde con JSON o formatos de texto plano. 
El código es compatible con navegadores Chrome, Firefox y InternetExplorer.

Esta implementado con propósitos didácticos para solucionar errores CORS.

## Building

Es necesario actualizar el código HTML estableciendo una URI válida al servidor con el que se vayan a realizar las pruebas, 
así como los parametros y las funciones callback

```java
	var req = new JsGet("URI", { PARAMETER1: "VALUE1", PARAMETER2:"VALUE2", PARAMETERN:"VALUEN" }, onsuccesscallbackfn, onerrorcallbackfn);
```

## Uso

El fichero example-test.html contiene un ejemplo de uso completo (no funcional, puesto que falta establecer una URI y parametros validos).

```java
	$(document).ready(function(){
		///prepare request with uri, get parameters and onsuccess / onerror callbacks
		var req = new JsGet("http://service.com/group/operation", { access_token: "XXXXDDDDDFFFF", lat:"40.1", lng:"-4.2" }, onsuc, null);
		///execute request
		req.execute();
	});
```
### Enlaces

 * [`Post`][URI_SOURCECODE_BLOG]

[URI_SOURCECODE_BLOG]: http://findemor.porexpertos.es