var LocalStrategy = require('passport-local').Strategy;

/* 로그인 */
module.exports.login = new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, function (req, username, password, done) {
  console.log(`[inform]invoked passport's local login : ${username}, ${password}`)

  const Member = req.app.get('db_model_list')['member'];

  Member.findOne({ username: username }, (err, user) => {
    if (err) { return done(err); }
    // 등록된 사용자가 없는 경우
    if (!user) { return done(null, false, { message: "login fail" }); }
    //비밀번호 비교
    const isAuthenticated = user.authenticate(password)
    // 비밀번호 비교 결과가 틀림
    if (!isAuthenticated) { return done(null, false, { message: "password is not correct" }); }
    // 비밀번호 비교 결과가 맞음
    return done(null, user);
  })
});


/* 회원가입 */
module.exports.signup = new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true,
}, function (req, username, password, done) {
  console.log(`[inform]invoked passport's local signup : ${username}, ${password}`)

  const Member = req.app.get('db_model_list')['member'];

  Member.findOne({ username: username }, (err, user) => {
    if (err) { return done(err); }

    // 등록된 사용자가 있다면
    if (user) { return done(null, false, { message: "already exists" }); }
    const new_user = new Member({
      username: username,
      name: req.body.name,
    })
    new_user.makeEncryptedPassword(password);
    new_user.save(err => { return done(null, new_user); })
  })
});