import "../App.css";

export default function Success() {
  return (
    <div className="largeIcon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
          d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
          fill="currentColor"
          stroke="currentColor"
          stroke-miterlimit="10"
          stroke-width="32"
        />
        <path
          fill="none"
          stroke="#fff"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="32"
          d="M352 176L217.6 336 160 272"
        />
      </svg>
      <h1>Order Placed!</h1>
      <h3>
        Your candygram has been successfully placed. You will receive an email
        confirmation shortly.
      </h3>
    </div>
  );
}
