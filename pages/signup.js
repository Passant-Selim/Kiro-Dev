import AuthForm from "../components/AuthForm";

export default function SignUp() {
  return (
    <div
      style={{
        background: "#caf0f8",
        margin: "0",
        padding: "0",
      }}
    >
      <h1
        style={{
          color: "#03045e",
          textAlign: "center",
          padding: "20px",
          fontWeight: "bold",
          fontSize: "30px",
        }}
      >
        Sign Up
      </h1>

      <AuthForm type="signup" />
    </div>
  );
}
