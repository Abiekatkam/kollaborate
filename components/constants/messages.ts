export const CONSTANT_MESSGAES = {
  EMAILS: {
    WELCOME: {
      SUBJECT: "Welcome to the Kollaborate ✨",
    },
    REGISTER: {
      SUBJECT: "Register your account with magic link",
    },
    LOGIN: {
      SUBJECT: "Login to your account with magic link",
    },
    SENT: "Email sent successfully",
    ERROR: "Something went wrong, please try again",
  },
  AUTHORISATION: {
    UNAUTHORISED: "Unauthorised access",
    REGISTER: {
      SUCCESS: "User registered successfully",
      FAILURE: "User registration failed",
    },
    LOGIN: {
      SUCCESS: "User logged in successfully",
      FAILURE: "User login failed",
    },
  },
  COMMON: {
    CLIENT_ERROR: "Something went wrong, please try again",
    CLIENT_USER_FOUND: "User already exists",
    SERVER_ERROR_500: "Internal server error",
    CLIENT_USER_NOT_FOUND: "User not found",
    CLIENT_USER_ACCOUNT_NOT_EXISTS:
      "User account does not exist, please register",
    CLIENT_USER_ACCOUNT_EXISTS: "User account already exists",
    SERVER_INVALID_TOKEN: "Invalid token",
    SERVER_TOKEN_EXPIRED: "Token expired, please login again",
    SERVER_ID_MISSING: "Server ID is missing",
    SERVER_CREATION_ERROR:
      "An error occurred while creating the server. Please try again.",
    SERVER_UPDATE_FAILED:
      "An error occurred while updating the server. Please try again.",

    MEMBER_ID_MISSING: "Member ID is missing",
    CHANNEL_ID_MISSING: "Channel ID is missing",

    MESSAGES_FAILED_FETCHED: "Failed to fetch messages",
    MESSAGES_FETCHED: "Messages fetched successfully",
  },
};
