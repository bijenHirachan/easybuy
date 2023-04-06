import app from "./app.js";
import connectDB from "./database.js";

const PORT = process.env.PORT || 4000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
