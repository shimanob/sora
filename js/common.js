(function( window, undefined ){

    // 名前空間の重複を防ぐ
    if (window.leg === undefined) {
        window.leg = {};
    }

    var leg = window.leg;

    leg.defaults = {
        formId:'form1',
        windowFeatures:{
            scrollbars:'yes',
            resizable:'yes',
            toolbar:'no',
            location:'no',
            directories:'no',
            status:'no',
            focus:true,
            formTarget:''
        }
    };

    leg.fnFormModeSubmit = function(form, mode, keyname, keyid) {
        var values = {mode:mode};
        if(keyname !== undefined && keyname !== "" && keyid !== undefined && keyid !== "") {
            values[keyname] = keyid;
        }
        leg.submitForm(values, form);
    }

    leg.setValue = function(key, val, form) {
        var formElement = leg.getFormElement(form);
        formElement.find("*[name=" + key + "]").val(val);
    };

    /**
    * フォームを送信する.
    *
    * @param values
    * @param form
    */
    leg.submitForm = function(values, form){
        var formElement = leg.getFormElement(form);
        if (values !== undefined && typeof values === "object") {
            $.each(values, function(index, value) {
                leg.setValue(index, value, formElement);
            });
        }
        formElement.submit();
    };

    /**
    * フォームを特定してエレメントを返す.
    *
    * @param form
    * @returns {*}
    */
    leg.getFormElement = function(form){
        var formElement;
        if (form !== undefined && typeof form === "string" && form !== "") {
            formElement = $("form#" + form);
        } else if (form !== undefined && typeof form === "object") {
            formElement = form;
        } else {
            formElement = $("form#" + leg.defaults.formId);
        }
        return formElement;
    };

})(window);