;(function ( $, window, document, undefined ) {
    var pluginName = "jCheckForm",
        defaults = {
			rules : {
				'.required' : {
					pattern : {
						value : /\S/i,
						errMsg : 'Обязательно к заполнению'
					}
				},
				'.email' : {
					pattern : {
						value : /[0-9a-z_]+@[0-9a-z_^.]+\.[a-z]{2,3}/i,
						errMsg : 'Проверьте правильность заполнения'
					}
				},
				'.full' : {
					pattern : {
						value : /\S/i,
						errMsg : 'Обязательно к заполнению'
					},
					minlength : {
						value : 0,
						errMsg : 'Обязательно к заполнению'
					},
					maxlength : {
						value : 999,
						errMsg : 'Обязательно к заполнению'
					},
					equalTo : {
						value : null,
						errMsg : null
					},
					number : {
						value : null,
						errMsg : null
					},
					min : {
						value : null,
						errMsg : null
					},
					max : {
						value : null,
						errMsg : null
					}
				},
			},
			focusTitle: true,
			onStart: function(){

			},
			onComplete: function(){
				this.submit();
			}
        };

    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {
        init: function() {
			$(document).on('dblclick', this.element, this, function(event){
				event.data.validate();
			});
        },
        validate: function() {
			var inputs = this.options.rules;

			var validate = {
				init: function(form, inputs){
					this.form = form;
					for(var property in inputs) {
						this.validate(property, inputs[property]);
					}
				},
				validate: function(selector, options){
					var items = $(this.form).find(selector).find('input, textarea');
					var validate = {
						pattern : function(pattern, item){
							if (!pattern) return;
							var value = $(item).val();
							if (value.match(pattern.value) === null) this.errorPanic($(item).closest(selector), options.errMsg);
						},
						minlength : function(){
						
						},
						maxlength :function(){
						
						},
						equalTo : function(){
							
						},
						number : function(){
						
						},
						min :function(){
						
						},
						max :function(){
						
						}
					};
					for (var i = 0; i < items.length; i++) {
						var item = items[i];
						for(var method in options) {
							validate[method].call(this, options[method], item);
						}						
					}				
				},
				errorPanic : function(element, errMsg){
					element.addClass('error');
					var input = element.find('input, textarea');
					$(document).one('keypress.errorPanic, change.errorPanic', input, {plugin:this,element:element}, function(event){
						 var element = event.data.element;
						 event.data.plugin.removeError(element);
					});
				},
				removeError : function(element){
					$(element).removeClass('error');
				}
			};
			return validate.init(this.element, inputs);
        },
        validateInput: function() {
			var inputs = this.options.validate;
        },
        yourOtherFunction: function(el, options) {

        }
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );

$(document).ready(function(){
	$('form').jCheckForm();
});