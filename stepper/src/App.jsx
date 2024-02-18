import "./App.css";
import CheckoutStepper from "./components/CheckoutStepper";

const CHECKOUT_STEPS = [
  {
    name: "Customer Info",
    Component: () => <div>Provide your contact details.</div>,
  },
  {
    name: "Shipping Info",
    Component: () => <div>Enter your shipping address.</div>,
  },
  {
    name: "Payment",
    Component: () => <div>Complete payment for your order.</div>,
  },
  {
    name: "Deliverd",
    Component: () => <div>Your order has been deliverd.</div>,
  },
];

function App() {
  return (
    <div>
      <h2>CheckOut</h2>
      <CheckoutStepper stepsConfig={CHECKOUT_STEPS}/>
    </div>
  );
}

export default App;