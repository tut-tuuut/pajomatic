$(document).ready(function () {
    var calculateAndDisplay = function (event) {
        var input = pajomatic_view.extractFormData('incomplete_year_input');
        var result = pajomatic_model.calculatePajemploiDeclaration(input);
        pajomatic_view.display(result, $('#incomplete_year_output'));
    };
    // observe changes on input form
    $('#incomplete_year_input').on('change', 'input', calculateAndDisplay);
    $('#incomplete_year_input').on('submit', function(event) {
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
