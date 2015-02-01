$(document).ready(function () {
    var calculateAndDisplay = function (event) {
        var input = pajomatic_view.extractFormData('incomplete_year_input');
        var result = pajomatic_model.calculatePajemploiDeclaration(input);
        pajomatic_view.display(result, $('#incomplete_year_output'));
    };

    url2form('incomplete_year_input');
    calculateAndDisplay();

    // observe changes on input form
    $('#incomplete_year_input').on('change', 'input', calculateAndDisplay);
    $('#incomplete_year_input').on('submit', function(event) {
        calculateAndDisplay();
        event.preventDefault();
        window.history.pushState({},"",'?'+$('#incomplete_year_input').serialize());
        $('#saved_url').text(window.location.href);
    });
    // init help bubbles
    var popoverOptions = {
        placement: 'top',
        selector: '[data-toggle=popover]',
    }
    $('body').popover(popoverOptions);
});
