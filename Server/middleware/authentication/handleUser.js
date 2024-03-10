import User from "../../models/User.js"; 

const handleUser = async (profile, source, avatarUrl, done) => {
  try {
    const email = profile.emails[0].value.toLowerCase();
    let user = await User.findOne({ email: email });

    if (!user) {
      user = new User({
        email: email,
        name:
          profile.displayName ||
          `${profile.name.givenName} ${profile.name.familyName}`,
        avatar: avatarUrl, // Save the avatar URL during user creation
        authMethods: [{ provider: source, providerId: profile.id }],
      });
    } else {
      // Update avatar URL each time the user logs in with a social account
      user.avatar = avatarUrl;

      const authMethodExists = user.authMethods.some(
        (method) => method.provider === source
      );
      if (!authMethodExists) {
        user.authMethods.push({ provider: source, providerId: profile.id });
      }
    }

    await user.save();
    done(null, user);
  } catch (error) {
    done(error, null);
  }
};
export default handleUser;
