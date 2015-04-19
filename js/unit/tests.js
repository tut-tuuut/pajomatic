var input = {};
var output = {};

function getBaseInput() {
  return { 
      nb_semaines : 0, 
      nb_jours_par_semaine : 0, 
      nb_heures_normales : 0, 
      nb_heures_majorees : 0, 
      salaire_net_normal : 0, 
      majoration_heures_majorees : 0, 
      indemnite_entretien : 0, 
      indemnite_repas : 0, 
      indemnite_gouter : 0, 
      nb_jours_accueil_reel : 0, 
      nb_repas : 0, 
      nb_gouters : 0, 
      nb_jours_conges_payes : 0, 
      montant_conges_payes : 0, 
      nb_supp_complementaires : 0, 
      nb_supp_majorees : 0, 
      absences_nb_heures_normales : 0, 
      absences_nb_heures_majorees : 0, 
      absences_nb_jours : 0
    };
}

QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
  var tata = 'x';
  var toto = 'z';
  assert.deepEqual({toto: tata, titi: toto}, {titi: toto, toto:tata}, "Comparaison d'objets");
});


QUnit.module("Année incomplète");

QUnit.test("Mensualisation sans heures majorées", function(assert) {
  var input = getBaseInput();
  input.nb_semaines = 44;
  input.nb_jours_par_semaine = 5;
  input.nb_heures_normales = 45;
  input.salaire_horaire_net_normal = 3.37;

  var subject = pajomatic_model.calculateAnneeIncomplete(input);

  assert.equal(
    subject.nb_heures_normales,
    165,
    "Le nombre d’heures normales est bien calculé."
  );
  assert.equal(
    subject.nb_heures_majorees,
    0,
    "Le nombre d’heures majorées est bien calculé."
  );
  assert.equal(
    subject.nb_jours_activite,
    19,
    "Le nombre de jours d'activité est bien calculé."
  );
});

QUnit.test("Mensualisation avec heures majorées", function(assert) {
  var input = getBaseInput();
  input.nb_semaines = 44;
  input.nb_jours_par_semaine = 5;
  input.nb_heures_normales = 45;
  input.nb_heures_majorees = 3;
  input.salaire_horaire_net_normal = 3.37;

  var subject = pajomatic_model.calculateAnneeIncomplete(input);

  assert.equal(
    subject.nb_heures_normales,
    165,
    "Le nombre d’heures normales est bien calculé."
  );
  assert.equal(
    subject.nb_heures_majorees,
    11,
    "Le nombre d’heures majorées est bien calculé."
  );
  assert.equal(
    subject.nb_jours_activite,
    19,
    "Le nombre de jours d'activité est bien calculé."
  );
});

QUnit.test("Calcul des indemnités d’entretien", function (assert) {
  var input = getBaseInput();
  input.indemnite_entretien = 3.37;
  input.nb_jours_accueil_reel = 14;

  var subject = pajomatic_model.calculateAnneeIncomplete(input);

  assert.equal(
    subject.indemnites_entretien,
    47.18, // 3.37 * 14
    "Le montant de l'indemnité d'entretien est bien calculé."
  );
});


QUnit.test("Indemnités de repas", function (assert) {
  var input = getBaseInput();
  input.indemnite_repas = 3.00;
  input.indemnite_gouter = 2.00;
  input.nb_repas = 21;
  input.nb_gouters = 20;

  var subject = pajomatic_model.calculateAnneeIncomplete(input);

  assert.equal(
    subject.indemnites_repas,
    103,
    "Le montant de l'indemnité de repas est correct."
  );
});
