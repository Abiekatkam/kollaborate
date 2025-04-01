const IS_APP_IN_PRODUCTION = process.env.NODE_ENV === "production";

const LIVE_URL = "localhost:3000";
const LOCAL_URL = "localhost:3000";

const DOMAIN_URL = IS_APP_IN_PRODUCTION ? LIVE_URL : LOCAL_URL;

export const APP_CONFIGURATION = {
  COOKIE_TOKEN: "KollaborateCreds",
  CURRENT_YEAR: new Date().getFullYear(),
  APPLICATION_NAME: "Kollaborate",
  DEVELOPER_NAME: "Abhishek Katkam",
  BASE_URL: `${IS_APP_IN_PRODUCTION ? "https://" : "http://"}${DOMAIN_URL}`,
};

export const CLIENT_SIDE_URL = {
  AUTH: {
    REGISTER: "/register",
    LOGIN: "/login",
  },
  SOCIAL_LINKS: {
    GITHUB_PROFILE: "https://github.com/Abiekatkam",
    LINKEDIN_PROFILE: "https://linkedin.com/in/abhishek-katkam-988744231/",
    TWITTER_PROFILE: "https://twitter.com/AbhishekKatkam9",
    GITHUB_REPOSITORY: "https://github.com/Abiekatkam/kollaborate",
    PORTFOLIO: "https://portfolio-hxpmwalhk-abiekatkams-projects.vercel.app/",
  },
  HOME: {
    HOMEPAGE: "/",
    INDEX: "/v1",
    SERVERS: "/v1/servers",
  },
};

export const SERVER_SIDE_URLS = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
  },
  USER: {
    FETCH: "/api/user",
    PAGE_PROFILE: "/api/user/profile-page",
  },
  SERVERS: {
    INSERT: "/api/servers",
  },
  CHANNELS: {
    INSERT: "/api/channels",
  },
};
