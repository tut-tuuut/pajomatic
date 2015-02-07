var pajomatic_view = function () {
    var is_numeric, exports;

    exports = {};

    is_numeric = /\d+(?:[.,]\d{0,2})?/;
    // at least one number which may be followed by one comma or dot and some other digits

    exports.extractFormData = function (formId) {
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
                //$('[name='+name+']').val(clean_value);
            }
            finalData[name] = clean_value;

        });
        return finalData;
    };

    exports.display = function (data, element, id_prefix) {
        var placeholder;
        id_prefix = id_prefix || 'out_';
        for (key in data) {
            if (!data.hasOwnProperty(key)) continue;
            placeholder = element.find('#' + id_prefix + key);
            if (!placeholder) {
                continue;
            }
            if (placeholder.hasClass('euros')) {
                placeholder.html(exports.formatFrenchPrice(data[key]));
            } else if (placeholder.hasClass('number')) {
                placeholder.text(parseInt(data[key]));
            } else {
                placeholder.text(data[key]);
            }
        }
    };

    exports.formatFrenchPrice = function(number) {
        var str = number.toString();
        str = str.replace('.', ',');
        return str + '&nbsp;€';
    };

    return exports;

}();
