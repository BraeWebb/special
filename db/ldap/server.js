var ldap = require('ldapjs');

var server = ldap.createServer();

function authorize(req, res, next) {
  if (!req.connection.ldap.bindDN.equals('cn=root')) {
    return next(new ldap.InsufficientAccessRightsError());
  }

  return next();
}


///--- Globals

var SUFFIX = 'c=AU';
var server = ldap.createServer();

server.bind('cn=root', function(req, res, next) {
  if (req.dn.toString() !== 'cn=root' || req.credentials !== 'secret')
    return next(new ldap.InvalidCredentialsError());

  res.end();
  return next();
});

server.search(SUFFIX, authorize, function(req, res, next) {
  res.send({
    "dn": "prism=53208, ou=Student, ou=People, o=The University of Queensland, c=AU",
    "attributes": {
      "uid": "s4435400",
      "webctgroup": [
        "P-P04-DECO1400S_6620STx",
        "P-P10-INFS1200S_6620STx",
        "T-T06-DECO1400S_6620STx",
        "T-T18-MATH1050S_6620STx",
        "T-T11-INFS1200S_6620STx",
        "T-T08-MATH1061S_6660STx",
        "P-P07-INFS2200S_6660STx",
        "T-T02-CSSE1001S_6660STx",
        "T-T08-INFS2200S_6660STx",
        "P-P06-CSSE1001S_6660STx",
        "P-P03-INFS3204S_6660STx",
        "T-T08-CSSE2002S_6720STx",
        "P-P03-INFS3200S_6720STx",
        "T-T03-INFS3200S_6720STx",
        "P-P05-CSSE2010S_6720STx",
        "P-P09-CSSE2002S_6720STx",
        "P-P05-CSSE2310S_6760STx",
        "T-T08-COMP3506S_6760STx",
        "T-T08-CSSE2310S_6760STx",
        "T-T01-COMP4403S_6820STx",
        "T-T01-PHIL2110S_6860STx",
        "P-P07-COMP3702S_6860STx",
        "T-T03-COMS3000S_6860STx",
        "T-T08-COMP3702S_6860STx",
        "P-P08-COMP4702S_6920STx",
        "P-P02-COMS4200S_6960STx"
      ]
    }
  });

  res.end();
  return next();
});

server.listen(389, function() {
  console.log('LDAP server listening at %s', server.url);
});