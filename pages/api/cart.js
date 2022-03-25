import Cart from "../../Models/Cart";
export default async (req, res) => {
    const { user } = req.cookies;
    switch (req.method) {
        case "GET":
            
            const data = await Cart.findOne({ userId: user });
            res.status(200).json(data);
            break;
        case "POST":
            const { productId, quantity } = req.body;
            const cart = await Cart.findOne({ userId: user });
            if (cart) {
                const product = cart.products.find(
                    (product) => product === productId
                );
                if (product) {
                    product.quantity += quantity;
                    await cart.save();
                } else {
                    cart.products.push({ product: productId, quantity });
                    await cart.save();
                }
                res.status(200).json(cart);
            }
            else {
                res.status(404).json({ message: "Cart not found" });
            }
        case "DELETE":
            const { productId: productId1 } = req.body;
            const cart1 = await Cart.findOne({ userId: user });
            if (cart1) {
                const product = cart1.products.find(
                    (product) => product.product === productId1
                );
                if (product) {
                    cart1.products.splice(cart1.products.indexOf(product), 1);
                    await cart1.save();
                }
                res.status(200).json(cart1);
            }
            else {
                res.status(404).json({ message: "Cart not found" });
            }

    }
}