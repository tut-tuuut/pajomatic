var pajomatic_model = (function (undefined) {
    var exports;

    var AMOUNT_5_SMIC_NET = 36.91; // 5*9,61 brut
    var AMOUNT_5_SMIC_NET_ALSACE_MOSELLE = 36.19;
    var MINIMUM_SALAIRE_NET = 2.09;
    var MINIMUM_SALAIRE_NET_ALSACE_MOSELLE = 2.05;
    var MINIMUM_INDEMNITE_ENTRETIEN = 2.99;


    exports = {};

    exports.get5SmicNet = function(is_alsace_moselle) {
        if (is_alsace_moselle) {
            return AMOUNT_5_SMIC_NET_ALSACE_MOSELLE;
        }
        return AMOUNT_5_SMIC_NET;
    }

    exports.getSalaireMinimumNet = function(is_alsace_moselle) {
        if (is_alsace_moselle) {
            return MINIMUM_SALAIRE_NET_ALSACE_MOSELLE;
        }
        return MINIMUM_SALAIRE_NET;
    }

    exports.getIndemniteEntretienMinimum = function(is_alsace_moselle) {
        return MINIMUM_INDEMNITE_ENTRETIEN;
    }

    exports.calculateAnneeIncomplete = function (input) {
        var nb_heures_normales_mensualise = input.nb_semaines * input.nb_heures_normales / 12;
        var nb_heures_majorees_mensualise = input.nb_semaines * input.nb_heures_majorees / 12;
        var nb_heures_majorees = Math.round(nb_heures_majorees_mensualise + input.nb_supp_majorees);

        var nb_jours_mensualise = Math.ceil(input.nb_semaines * input.nb_jours_par_semaine / 12);

        var nb_jours_activite = nb_jours_mensualise - input.absences_nb_jours;

        var salaire_mensuel_h_normales = nb_heures_normales_mensualise * input.salaire_net_normal;
        var salaire_mensuel_h_majorees = nb_heures_majorees_mensualise * input.salaire_net_normal * (100 + input.majoration_heures_majorees) / 100;
        var salaire_mensualise = (salaire_mensuel_h_majorees + salaire_mensuel_h_normales);
        var salaire_net_total = Math.round((salaire_mensualise + input.montant_conges_payes)*100)/100;

        var nb_jours_reel = input.nb_jours_accueil_reel;
        var indemnites_entretien = input.indemnite_entretien * nb_jours_reel;
        var indemnites_repas = (input.indemnite_repas + input.indemnite_gouter) * nb_jours_reel;

        var output = {
            nb_heures_normales : Math.round(nb_heures_normales_mensualise),
            nb_jours_activite : nb_jours_activite,
            nb_jours_conges_payes : Math.ceil(input.nb_jours_conges_payes),
            salaire_horaire_net_normal : input.salaire_net_normal,
            nb_heures_majorees : nb_heures_majorees,
            nb_heures_complementaires : Math.round(input.nb_supp_complementaires),
            salaire_net_total : salaire_net_total,
            indemnites_entretien : indemnites_entretien,
            indemnites_repas : indemnites_repas,
            total_a_payer : Math.round((salaire_net_total + indemnites_repas + indemnites_entretien)*100)/100
        };
        return output;
    };

    return exports;
})();
