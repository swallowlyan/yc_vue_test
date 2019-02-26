var baseurl = 'http://10.50.200.118:8080';//本地

var urls = {
	baseRequestUrl: baseurl + "/web",
  baseRequestPageUrl: baseurl + "/web/yc",
  frameworkPath:baseurl+"/web/sf"
};

var oauth2 = {
	client_id: 'PjTzMol5lXbYkVJNQYx4',
	client_secret: 'czwoTw644zES9R9ffX9A',
	grant_type: 'password',
	scope: 'read write',
	openid: 'wc-resource'
};

module.exports = {
	urls,
	oauth2,
}
