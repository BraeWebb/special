let ldap = require("ldapjs");

let server = process.env.LDAP_SERVER ? process.env.LDAP_SERVER : "localhost";
let port = process.env.LDAP_PORT ? process.env.LDAP_PORT : "389";
let cn = process.env.LDAP_CN ? process.env.LDAP_CN : "cn=root";
let password = process.env.LDAP_PASSWORD ? process.env.LDAP_PASSWORD : "secret";

let client = ldap.createClient({
  url: 'ldap://' + server + ':' + port
});

client.bind(cn, password, function(err) {
  if (err !== null) {
    console.log(err);
  }
});

const opts = {
  scope: 'base',
  attributes: ['webctgroup']
};

function getSignOns(student, callback) {
  return client.search('prism=53208,ou=Student,ou=People,o=The University of Queensland,c=AU', opts, function (err, res) {
    if (err !== null) {
      console.log(err);
    }

    res.on('searchEntry', function (entry) {
      callback(entry.object);
    });
    res.on('error', function (err) {
      console.error('error: ' + err.message);
    });
  });
}

module.exports = getSignOns;
