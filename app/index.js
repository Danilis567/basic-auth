const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = 4000;
const api_url =
  "mongodb+srv://hani56932:HeyJrh5gUY11rg8n@cluster0.dlr9kov.mongodb.net/?retryWrites=true&w=majority";

//HeyJrh5gUY11rg8n
//mongodb+srv://hani56932:HeyJrh5gUY11rg8n@cluster0.dlr9kov.mongodb.net/?retryWrites=true&w=majority

mongoose.connect(api_url, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB bağlantı hatası:"));
db.once("open", () => {
  console.log("MongoDB bağlantısı başarıyla sağlandı");
});

app.use(express.json());

// Kullanıcı rotalarını kullanma

app.use(cors({
  
}));

// Kullanıcı rotalarını kullanma
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Server ${port} portunda çalışıyor`);
});