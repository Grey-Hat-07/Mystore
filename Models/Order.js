import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema.Types;
const OrderSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: "User",
    },
    products: [{
        quantity: { type: Number, default: 1 },
        product: { type: ObjectId, ref: "product" }
    }],
    email: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    paymentId: {
        type: String,
        required: true
    },
    razorpayOrderId: {
        type: String,
        required: true
    }

});

export default mongoose.models.Order||mongoose.model("Order", OrderSchema);