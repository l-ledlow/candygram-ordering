import "../App.css";

export default function Failure() {
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
          d="M320 320L192 192M192 320l128-128"
        />
      </svg>
      <h1>We couldn't complete your order!</h1>
      <h3>
        We encountered an error while processing your order. Please try again
        later.
      </h3>
    </div>
  );
}
