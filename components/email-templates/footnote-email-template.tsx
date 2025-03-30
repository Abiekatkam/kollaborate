import { Text } from "@react-email/components";
import { APP_CONFIGURATION } from "../constants/urls";

export default function Footnote({ hideNote }: { hideNote?: boolean }) {
  return (
    <>
      {!hideNote ? (
        <Text style={{ ...text, color: "#666666", marginBottom: "5px" }}>
          If you have any questions or feedbacks, reply to this email.
        </Text>
      ) : null}
      <Text style={{ ...text, color: "#666666" }}>
        Cheers 🎉, <br />
        {APP_CONFIGURATION.DEVELOPER_NAME} from {APP_CONFIGURATION.APPLICATION_NAME}
      </Text>
    </>
  );
}

const text = {
  color: "#000",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  lineHeight: "24px",
};
