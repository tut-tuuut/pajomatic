var pajomatic_view = function () {
    var is_numeric, exports;

    exports = {};

    is_numeric = /\d+(?:[.,]\d{0,2})?/;
    // at least one number which may be followed by one comma or dot and some other digits
    clean_number = /,/;


    exports.extractFormData = function(formId) {
        var form = $('#' + formId);
        var finalData = {};
        var clean_value;
        $.each(form.serializeArray(), function (i, element) {
            var name = element.name;
            var value = element.value;
            if (is_numeric.test(value)) {
                clean_value = parseFloat(is_numeric.exec(value)[0].replace(',','.'));
            } else {
                clean_value = 0;
                $('[name='+name+']').val(clean_value);
            }
            finalData[name] = clean_value;

        });
        return finalData;
    };

    return exports;

}();
