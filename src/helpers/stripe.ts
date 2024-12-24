const apiUrl = import.meta.env.VITE_API_URL as string;
export const openCheckout = async (amount: number) => {
  //charge $2 per candygram, and at least $2 as a fallback
  amount = Math.max(amount * 200, 200);
  console.log(apiUrl);
  const response = await fetch(`${apiUrl}/create-checkout-session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ total: amount }),
  });

  const { session } = await response.json();
  if (!session) {
    console.error("Error creating session");
    return;
  }
  window.open(session, "_self")?.focus();
};
