import { Octokit } from "octokit";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
const octokit = new Octokit();

export default withIronSessionApiRoute(async (req, res) => {
  const { username, password } = await req.body;

  if (username != (process.env.NEXT_PUBLIC_DEMO_USERNAME || 'admin') || password != (process.env.NEXT_PUBLIC_DEMO_PASSWORD || 'admin')) {
    res.status(500).json({ message: 'Invalid username or password' });
    return;
  }

  try {
    const {
      data: { login, avatar_url },
    } = await octokit.rest.users.getByUsername({ username });

    const user = { isLoggedIn: true, login, avatarUrl: avatar_url };
    req.session.user = user;
    await req.session.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}, sessionOptions);
