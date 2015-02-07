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
        errorPlacement : function(error, element) {
            element.closest('.input-group').after(error);
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
