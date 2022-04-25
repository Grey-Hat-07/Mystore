import Order from '../../Models/Order';

export default async (req, res) => {
    const { user } = req.cookies;
    const { products, total, email, paymentId } = req.body;

    const order = await Order.create({
        userId: user,
        products,
        total,
        email,
        paymentId,
        razorpayOrderId,
        status: 'created'
    }).save();

    if(order) {
        return res.status(200).json(order);
    }
    return res.status(400).json({ error: 'Something went wrong' });

}