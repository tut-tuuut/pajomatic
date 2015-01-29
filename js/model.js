var pajomatic_model = (function (undefined) {
    var exports;

    exports = {};

    exports.calculatePajemploiDeclaration = function (input) {
        console.log(input);

        var nb_heures_normales_mensualise = input.nb_semaines * input.nb_heures_normales / 12;
        var nb_heures_majorees_mensualise = input.nb_semaines * input.nb_heures_majorees / 12;
        var nb_heures_majorees = Math.round(nb_heures_majorees_mensualise + input.nb_supp_majorees);

        var nb_jours_mensualise = Math.ceil(input.nb_semaines * input.nb_jours_par_semaine / 12);

        var nb_jours_activite = nb_jours_mensualise - input.absences_nb_jours;

        var salaire_mensuel_h_normales = nb_heures_normales_mensualise * input.salaire_net_normal;
        var salaire_mensuel_h_majorees = nb_heures_majorees_mensualise * input.salaire_net_normal * (100 + input.majoration_heures_majorees) / 100;
        var salaire_mensualise = (salaire_mensuel_h_majorees + salaire_mensuel_h_normales);
        var salaire_net_total = Math.round((salaire_mensualise + input.montant_conges_payes)*100)/100;

        var output = {
            nb_heures_normales : Math.round(nb_heures_normales_mensualise),
            nb_jours_activite : nb_jours_activite,
            nb_jours_conges_payes : Math.ceil(input.nb_jours_conges_payes),
            salaire_horaire_net_normal : input.salaire_net_normal,
            nb_heures_majorees : nb_heures_majorees,
            nb_heures_complementaires : Math.round(input.nb_supp_complementaires),
            salaire_net_total : salaire_net_total,
            indemnites_entretien : 0.00,
            indemnites_repas : 0.00
        };
        console.log(output);
        return output;
    };

    return exports;
})();