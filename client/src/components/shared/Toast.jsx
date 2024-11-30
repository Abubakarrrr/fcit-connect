import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Toast() {
  const notify = () => toast("Wow so easy!");

  return (
    <div>
      <button onClick={notify}>Notify!</button>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

toast.success("🦄 Wow so easy!", {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
});
