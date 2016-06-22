Accounts.config({restrictCreationByEmailDomain:function(address) {
  return address.indexOf('@q42.nl') > 1 || address.indexOf('@codeuur.nl') > 1
}});
