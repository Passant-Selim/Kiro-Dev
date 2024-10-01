import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await axios.post(
        "http://localhost:5000/user/login",
        req.body
      );
      res.status(200).json(response.data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
