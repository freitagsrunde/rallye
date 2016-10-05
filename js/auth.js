// source: https://github.com/levbrie/mighty_marks/blob/master/yelp-business-sample.html#L21
var auth = {
    consumerKey : "q6FnVc05xqAAyn-ByLhSxw",
    consumerSecret : "vb4nOuK9D_nwDp2m4v8NOIYZ-L8",
    accessToken : "oydOHBwmO06DJcYEwrl5LsGcU1dG7iis",


    accessTokenSecret : "p2wURdvlZ14jpS2nxMRhPD7OlOY",
    serviceProvider : {
        signatureMethod : "HMAC-SHA1"
    }
};
var accessor = {
    consumerSecret : auth.consumerSecret,
    tokenSecret : auth.accessTokenSecret
};
parameters = [];
parameters.push(['callback', 'cb']);
parameters.push(['oauth_consumer_key', auth.consumerKey]);
parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
parameters.push(['oauth_token', auth.accessToken]);
parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
