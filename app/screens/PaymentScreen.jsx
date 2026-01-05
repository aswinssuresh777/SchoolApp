import RazorpayCheckout from "react-native-razorpay";
import { View, Button } from "react-native";

export default function Payment() {
  const startPayment = async () => {
    console.log(RazorpayCheckout);

    // const res = await fetch("http://YOUR_SERVER_IP:3000/create-order", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ amount: 500 }),
    // });

    // const order = await res.json();

    const options = {
      description: "Test Payment",
      image: "https://yourlogo.png",
      currency: "INR",
      key: "rzp_test_S0GlEgvpAtTVC1",
      amount: "100",
      name: "My App",
    //   order_id: order.id,
      prefill: {
        email: "test@email.com",
        contact: "9999999999",
        name: "Test User",
      },
      theme: { color: "#3399cc" },
    };

    RazorpayCheckout.open(options)
      .then(data => {
        alert(`Payment success: ${data.razorpay_payment_id}`);
      })
      .catch(error => {
        console.log(error);
        alert(`Payment failed: ${error.description}`);
      });
  };

  return (
    <View>
      <Button title="Pay ₹500" onPress={startPayment} />
    </View>
  );
}
