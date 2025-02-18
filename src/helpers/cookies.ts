export const addCookie = (
  name: string,
  amount: number,
  message: string,
  email: string,
  organ: string,
  committee: string,
  senderOrgan: string,
  senderCommittee: string
) => {
  const cookie = {
    name,
    amount,
    message,
    email,
    organ,
    committee,
    senderOrgan,
    senderCommittee,
  };
  const expires = new Date();
  expires.setDate(expires.getDate() + 30);
  const expiryDate = expires.toUTCString();
  document.cookie = `candygram=${JSON.stringify(
    cookie
  )}; expires=${expiryDate}; path=/`;
};

export const getCookie = () => {
  const cookie = document.cookie
    .split(";")
    .find((cookie) => cookie.includes("candygram"));
  if (!cookie) {
    return null;
  }
  return JSON.parse(cookie.split("=")[1]);
};

export const deleteCookie = () => {
  document.cookie =
    "candygram=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};
