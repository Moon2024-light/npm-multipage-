// api/my-function.js

export default async function handler(req, res) {
    try {
        // Your logic goes here
        res.status(200).json({ message: "Success" });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Internal Server Error' });
    }
}