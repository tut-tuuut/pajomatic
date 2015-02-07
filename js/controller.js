$(document).ready(function () {
    var output_container = $('#incomplete_year_output');
    var input_form = $('#incomplete_year_input');
    var saved_url = $('#saved_url');
    var input_reminder = $('#input_reminder');
    var calculateAndDisplay = function (event) {
        var input = pajomatic_view.extractFormData('incomplete_year_input');
        var result = pajomatic_model.calculateAnneeIncomplete(input);
        pajomatic_view.display(result, output_container);
        pajomatic_view.display(input, input_reminder, 'in_');
        window.history.pushState({},"",'?'+input_form.serialize());
        saved_url.text(window.location.href);
    };

    // fill form from URL
    url2form('incomplete_year_input');
    calculateAndDisplay();

    // validate form
    input_form.validate({
        debug : true,
        // presentation rules for twitter bootstrap CSS
        errorPlacement : function(error, element) {
            element.closest('.input-group').after(error);
        },
        errorClass : 'text-danger',
        highlight : function(element, errorClass) {
            $(element).closest('.input-group')
                .addClass('has-error')
                .removeClass('has-success');
        },
        unhighlight : function(element, errorClass) {
            $(element).closest('.input-group')
                .addClass('has-success')
                .removeClass('has-error');
        },
        // validation rules specific for this form
        rules : {
            nb_semaines : {
                number : true,
                max : {
                    param: 46
                }
            }
        },
        messages : {
            nb_semaines : {
                max : function (maxval, element) {
                    var value = parseInt($(element).val(), 10);
                    if (value == 47) {
                        return "47 semaines correspondent à une année complète. Les règles de calcul diffèrent."
                    }
                    return "Vous devez offrir au moins 5 semaines de congés payés à votre assmat (donc 47 semaines d’accueil au maximum)."
                }
            }
        }
    });
    // observe changes on input form
    input_form.on('change', 'input', calculateAndDisplay);
    input_form.on('submit', function(event) {
        calculateAndDisplay();
        event.preventDefault();
    });
    // init help bubbles
    var popoverOptions = {
        placement: 'top',
        selector: '[data-toggle=popover]',
    }
    $('body').popover(popoverOptions);
});
