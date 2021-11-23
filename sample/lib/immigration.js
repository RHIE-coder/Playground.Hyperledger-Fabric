var {login, signup} = require('./passport_strategy/local-strategy');

module.exports.init = function (passport) {
    // 사용자 인증 성공 시 호출
    passport.serializeUser(function (user, done) {
        console.log('serializeUser() 호출됨.');
        done(null, user);
    });

    // 사용자 인증 이후 사용자 요청이 있을 때마다 호출
    passport.deserializeUser(function (user, done) {
        console.log('deserializeUser()  호출됨');
        done(null, user);
    });

    // 인증방식  local-signup
    passport.use('local-login', login);
    passport.use('local-signup', signup);
};