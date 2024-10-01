import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function VerifyEmail() {
  const router = useRouter();
  const [message, setMessage] = useState("Verifying email...");

  useEffect(() => {
    if (router.isReady) {
      const { token } = router.query;
      console.log("Extracted token from URL:", token);

      if (token) {
        verifyEmail(token);
      } else {
        setMessage("Token not found in URL.");
      }
    }
  }, [router.isReady, router.query]);

  const verifyEmail = async (token) => {
    console.log("Sending token to backend for verification:", token);
    try {
      const res = await axios.post("http://localhost:5000/user/verify-email", {
        token,
      });
      // console.log("Backend response:", res.data);
      setMessage("Email verified successfully! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (err) {
      console.error("Error from backend:", err.response?.data);
      setMessage(
        "Failed to verify email. The token may be invalid or expired."
      );
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>{message}</h1>
    </div>
  );
}
