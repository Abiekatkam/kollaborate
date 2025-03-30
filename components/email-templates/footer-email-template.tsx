import { Hr, Link, Text } from "@react-email/components";
import { APP_CONFIGURATION } from "../constants/urls";

export default function Footer() {
  return (
    <>
      <Hr style={hr} />
      <Text style={footer}>
        &copy; {APP_CONFIGURATION.CURRENT_YEAR}{" "}
        <Link
          href={APP_CONFIGURATION.BASE_URL}
          target="_blank"
          style={{ ...link, textDecoration: "underline" }}
        >
          {APP_CONFIGURATION.APPLICATION_NAME}
        </Link>{" "}
        · Connect. Communicate. Collaborate.
      </Text>
    </>
  );
}

const link = {
  color: "#0669ce",
  textDecoration: "none",
};

const footer = {
  color: "#666666",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "12px",
  lineHeight: "24px",
};

const hr = {
  border: "none",
  borderTop: "1px solid #eaeaea",
  margin: "26px 0",
  width: "100%",
};
