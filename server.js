const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;
app.use(express.json({ limit: "10kb" }));
app.use(express.static("public"));

const numbers = new Map(); // number -> { name, updatedAt }

app.get("/api/state", (req, res) => {
  res.json({ numbers: Object.fromEntries(numbers) });
});

io.on("connection", (socket) => {
  socket.emit("state", Object.fromEntries(numbers));

  socket.on("claim", ({ number, name }, callback) => {
    const n = Number(number);
    const cleanName = String(name || "").trim().slice(0, 32);
    if (!Number.isInteger(n) || n < 1 || n > 400) {
      return callback?.({ ok: false, error: "Geçersiz sayı." });
    }
    if (!cleanName) return callback?.({ ok: false, error: "İsim gerekli." });
    if (numbers.has(n)) return callback?.({ ok: false, error: "Bu sayı daha önce alınmış." });

    const item = { name: cleanName, updatedAt: new Date().toISOString() };
    numbers.set(n, item);
    io.emit("state", Object.fromEntries(numbers));
    callback?.({ ok: true });
  });

  socket.on("release", ({ number }, callback) => {
    const n = Number(number);
    if (!Number.isInteger(n) || n < 1 || n > 400) {
      return callback?.({ ok: false, error: "Geçersiz sayı." });
    }
    if (!numbers.has(n)) return callback?.({ ok: false, error: "Sayı zaten boş." });
    numbers.delete(n);
    io.emit("state", Object.fromEntries(numbers));
    callback?.({ ok: true });
  });
});

const path = require("path");
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));

server.listen(PORT, () => console.log(`77 İş Takibi running on port ${PORT}`));
