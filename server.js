const express = require("express");

const app = express();

const PORT = process.env.PORT || 5003;

app.use(express.json());

let users = [
    {id: 1, name: "Higal"},
    {id: 2, name: "Pauline"},
]

app.get("/users", (req, res) => {
    res.json(users)
});

app.get("/users", (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if(!user) return res.status(404).send("user cannot be found")
});

app.post("/users", (req, res) => {
    const{name} = req.body;
    if(!name) return res.status(400).json({message: "Name is require please"});

    const newUser = {
        id: users.length+1,
        name: req.body.name
    };
    users.push(newUser);
    res.status(201).json(newUser)
});

app.put("users/:id", (reg, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if(!user) return res.status(404).send("user not found");
    user.name = req.body.name
});

app.delete("/users/:id", (req, res) => {
    users = users.filter(u => u.id !== parseInt(req.params.id));
    res.send("user deleted")
});
app.get("/", (req, res) => {
    res.send({message: "Hello Higal"})
});
app.listen(PORT, () => {
    console.log(`Server is connected ${PORT}`)
}
)