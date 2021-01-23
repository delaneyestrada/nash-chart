import axios from "axios";

export default async (req, res) => {
    res.statusCode = 200;
    res.json({ name: "John Doe" });
    try {
        await axios.get("https://jsonplaceholder.typicode.com/photos");
    } catch (e) {
        console.log(e);
    }
};
