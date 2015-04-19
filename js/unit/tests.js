QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
  var tata = 'x';
  var toto = 'z';
  assert.deepEqual({toto: tata, titi: toto}, {titi: toto, toto:tata}, "Comparaison d'objets");
});