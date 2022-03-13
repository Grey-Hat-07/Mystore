
import User from "../../Models/User";
export default async (req, res) => {
    const { user } = parseCookies();
    const data = await User.findOne({ _id: user });
    console.log(data);
    res.status(200).json(data);
}