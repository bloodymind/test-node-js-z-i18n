# Test npm z-i18n

# Install
```
$ git clone https://github.com/kimthangatm/test-node-js-z-i18n.git
$ cd test-node-js-z-i18n
$ npm install
```

# Test
```
$ node bin/www
```

Open browser :

1. Address: `127.0.0.1:3000` . App use default `“en_GB”`

2. Address: `127.0.0.1:3000?lang=nl_NL` . App switch language `“nl_NL”`

3. Address: `127.0.0.1:3000?lang=vi_VN` . Because `“vi_VN”` lang don’t have tranlation key `“hello_user_name”`, system get default `“hello_user_name”` in `default_language = “en_GB”`
