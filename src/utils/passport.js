import { Strategy, ExtractJwt } from "passport-jwt";
import User from "../models/users";
const { TOKEN_SECRET } = process.env;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = TOKEN_SECRET;

export const applyPassportStrategy = (passport) => {
  passport.use(
    new Strategy(opts, (jwt_payload, done) => {
      const username = jwt_payload.username;
      User.findOne({ username }, (err, user) => {
        if (err) return done(err, false);
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      });
    })
  );
};
