$(document).ready(function () {
    // observe changes on input form
    $('#incomplete_year_input').on('change', 'input', function (event) {
        var input = pajomatic_view.extractFormData('incomplete_year_input');
        var result = pajomatic_model.calculatePajemploiDeclaration(input);
        pajomatic_view.display(result, $('#incomplete_year_output'));
    });
});
