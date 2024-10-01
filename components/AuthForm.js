import { useForm } from "react-hook-form";
import axios from "axios";
import styles from "../styles/AuthForm.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

export default function AuthForm({ type }) {
  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState("");
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      let res;
      if (type === "login") {
        res = await axios.post("http://localhost:5000/user/login", {
          email: data.email,
          password: data.password,
        });

        const { fullName } = res.data.user;
        localStorage.setItem("fullName", fullName);

        router.push("/welcome");
      } else if (type === "signup") {
        const formData = new FormData();
        formData.append("fullName", data.fullName);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("phone", data.phone);
        if (data.idDoc && data.idDoc[0]) {
          formData.append("idDoc", data.idDoc[0]);
        }

        res = await axios.post("http://localhost:5000/user/signup", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setMessage("Signup successful! Please log in.");
      }
    } catch (err) {
      setMessage(`${type === "signup" ? "Signup" : "Login"} failed.`);
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {type === "signup" && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              {...register("fullName")}
              className={styles.authInput}
              required
            />
            <input
              type="text"
              placeholder="Phone"
              {...register("phone")}
              className={styles.authInput}
              required
            />
          </>
        )}
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className={styles.authInput}
          required
        />
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className={styles.authInput}
          required
        />
        {type === "signup" && (
          <input
            type="file"
            {...register("idDoc")}
            className={styles.authInput}
            required
          />
        )}
        <button type="submit" className={styles.authButton}>
          {type === "signup" ? "Sign Up" : "Log In"}
        </button>
        {message && <p className={styles.authMessage}>{message}</p>}
      </form>
    </div>
  );
}
