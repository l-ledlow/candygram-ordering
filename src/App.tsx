import { useEffect, useState } from "react";
import CandyForm from "./components/form";
import Success from "./components/success";
import Failure from "./components/failure";
import { useParams } from "react-router";
import { addCandygram } from "./helpers/firebase";
import { getCookie, deleteCookie } from "./helpers/cookies";
import "./App.css";

function App() {
  const [error, setError] = useState("");
  // 0 for not submitted, 1 for success, 2 for error
  const [status, setStatus] = useState(0);

  useEffect(() => {
    const statusParam = window.location.pathname.split("=")[1];
    const controller = new AbortController();
    if (statusParam === "success") {
      const data = getCookie();
      deleteCookie();
      if (!data) {
        setStatus(2);
        return;
      }
      addCandygram({
        To: data.name,
        Amount: data.amount,
        Message: data.message,
        Organ: data.organ,
        Committee: data.committee,
        timestamp: new Date().valueOf(),
        Email: data.email,
      }).then(() => {
        setStatus(1);
      });
      return () => controller.abort();
    } else if (statusParam === "error") {
      setStatus(2);
    }
  }, []);

  return (
    <>
      <div className="header">
        <svg
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 550 550"
          onClick={() => {
            window.location.href = "/";
          }}
          className="logo"
        >
          <g>
            <path d="M115.58,463.05c11.26,7.47,23.66,10.07,37.03,8.9,11.77-1.03,22.93-4.33,33.76-8.78,8.28-3.41,16.47-7.06,24.49-11.03,6.84-3.39,13.95-5.56,21.45-6.58,12.97-1.77,25.87-1.36,38.51,2.23,3.16.9,5.9.8,9.01-.23,11.11-3.7,22.53-4.36,34.12-2.89,14.51,1.84,28.12,6.66,41.44,12.45,4.11,1.78,8.24,3.55,12.21,5.61,6.33,3.28,13.03,5.24,20.01,6.42,9.07,1.53,18.13,1.78,27.17-.2,4.17-.91,8.16-2.28,11.87-4.4,2.43-1.39,4.88-2.74,7.34-4.08.66-.36,1.37-.66,2.29-.68-.34.5-.62,1.04-1.01,1.49-8.36,9.53-18.17,17.03-30.09,21.63-11.24,4.34-22.8,5.15-34.68,3.6-11.13-1.45-21.06-5.84-30.35-11.86-6.78-4.39-13.35-9.1-20.11-13.51-4.15-2.7-8.5-5.1-12.75-7.64-1.68-1-3.49-1.66-5.45-1.64-4.15.03-8.29.15-12.44.28-.51.02-1.01.3-2.06.63,21.39,11.81,40.7,25.59,57.71,42.91-3.39,3.49-7.04,6.39-10.93,10.06-.51-.81-.82-1.47-1.28-2-8.48-9.71-17.41-18.97-27.21-27.36-8.41-7.2-17.32-13.67-27.03-19.03-1.72-.95-3.1-1-4.88-.1-15.3,7.72-28.73,17.93-40.67,30.16-5.15,5.27-9.92,10.87-14.31,16.78-.52.7-.96,1.46-1.44,2.2h-.48c-2.34-2.17-4.68-4.34-7.02-6.51-1.1-1.02-2.19-2.05-3.42-3.21,16.55-18.27,36.12-32.15,57.63-43.63-.6-1.11-1.56-1.09-2.34-1.25-5.78-1.25-11.43-.78-16.96,1.31-6.06,2.29-11.28,5.98-16.35,9.89-3.23,2.49-6.39,5.06-9.61,7.57-10.73,8.34-22.72,13.95-36.11,16.37-13.56,2.45-26.9,1.7-39.81-3.52-4.09-1.66-7.94-3.76-11.47-6.43-4.07-3.09-8.19-6.12-12.21-9.29-1.49-1.18-2.75-2.67-4.11-4.01.17-.2.35-.39.52-.59Z" />
            <path d="M214.97,327.81l-6.57,13.6h13.1l-6.53-13.6ZM214.97,327.81l-6.57,13.6h13.1l-6.53-13.6ZM214.97,327.81l-6.57,13.6h13.1l-6.53-13.6ZM214.97,327.81l-6.57,13.6h13.1l-6.53-13.6ZM275.91,61.13c-102.97-.76-190.39,82.44-190.77,188.78-.37,104.16,83.71,189.62,189.3,190.09,106.89-.48,188.64-87.03,189.46-187.78.87-104.91-84.37-190.32-187.99-191.09ZM185.19,363.28h-2.52l-29.98-33.73v33.73h-6.92v-48.69h2.48l30.25,34.15v-34.15h6.69v48.69ZM232.01,363.28l-7.49-15.36h-19.26l-7.42,15.36h-7.53l23.47-48.69h2.42l23.16,48.69h-7.35ZM250.57,363.28h-6.76v-48.69h6.76v48.69ZM306.84,363.28l-4.38-31.09-15.68,31.09h-2.44l-15.88-31.35-4.35,31.35h-6.63l7.11-48.69h2.26l18.74,37.08,18.55-37.08h2.25l7.15,48.69h-6.7ZM354.76,343.77c0,4.25-.44,7.76-1.3,10.42-.89,2.76-2.68,5.18-5.33,7.2-2.65,2.03-5.9,3.06-9.65,3.06-4.02,0-7.53-.96-10.42-2.86-2.93-1.92-4.92-4.5-5.91-7.68-.62-1.93-.92-5.25-.92-10.14v-29.18h6.76v29.18c0,4.09.1,5.57.18,6.1.22,1.7.72,3.1,1.48,4.2.76,1.09,1.97,2.02,3.59,2.78,1.64.77,3.32,1.16,4.98,1.16,1.43,0,2.81-.3,4.12-.9,1.3-.59,2.4-1.41,3.27-2.46.87-1.04,1.53-2.34,1.94-3.84.21-.75.45-2.58.45-7.04v-29.18h6.76v29.18ZM404.26,363.28h-2.51l-29.99-33.73v33.73h-6.92v-48.69h2.49l30.24,34.15v-34.15h6.69v48.69ZM450.19,285.27h-60.35c-.83,0-1.51-.68-1.52-1.52v-.83c-.01-13.04,0-26.08-.01-39.12l.11-4.14c.01-.48-.19-.96-.59-1.24-2.21-1.54-7.34-1.84-8.55-2.07-1.66-.32-2.88-4.73-2.78-6.1.32-4.14.56-8.29.82-12.44.09-1.39-.07-2.59-1.38-3.58-.61-.46-.83-1.66-.92-2.56-.15-1.59-.28-7.82-.3-9.42-.03-3.05-.67-1.13-2.89-3.39-.51-.52-.52-1.6-.65-2.44-.41-2.84-.55-5.75-1.21-8.53-1.07-4.55-3.45-8.43-7.18-11.34-1.3-1.01-2-2.12-1.93-3.85.09-2.14-.7-3.93-2.89-4.77-1.58-.61-1.82-1.89-1.67-3.34.11-1.03.4-2.04.47-3.08.12-1.86-.3-2.77-2.07-3.31-1.72-.52-1.97-1.54-1.85-3.05.19-2.39.36-4.78.39-7.18v-.06c.01-1.92-2.84-2.05-3.04-.15-.07.69-.14,1.37-.19,2.06-.17,2.07-.32,4.14-.44,6.22-.06.96-.37,1.55-1.39,1.95-2.61,1.02-2.95,1.81-2.36,4.61.08.4.2.78.28,1.17.56,2.82.35,3.27-2.25,4.36-1.91.8-2.94,2.21-2.94,4.25.01,1.73-.8,2.88-2.21,3.7-6.71,3.95-9.48,10.1-9.86,17.6-.09,1.6-.23,3.19-.31,4.79-.06,1.17-.52,1.85-1.74,2.22-1.79.53-1.86.73-1.7,2.56.21,2.55.46,5.09.73,7.64.15,1.32.08,2.5-1.07,3.46-.98.82-1.24,2.02-1.21,3.27.08,3.51.15,7.03.25,10.55.08,2.73-.45,5.25-2.36,7.33-1.26,1.36-1.68.48-3.52.4-7.4-.36-8.37,3.23-8.37,4.09-.02,9.6-.01,19.2-.02,28.8,0,.84-.1,10.99-.18,14.95-.02.83-.69,1.49-1.52,1.49h-7.48c-.82,0-1.35-.66-1.52-1.45-1.15-5.22-2.65-20.92-2.74-21.56-.26-1.81,1.95-2.5,3.65-3.33.56-.28.92-.85.86-1.47-.21-1.89-.42-3.74-.62-5.58-.11-.98-.68-1.38-1.62-1.38-1.12,0-2.24,0-3.36-.02-.41-.02-.82-.05-1.28-.09-.79-.07-1.39-.73-1.39-1.52v-6.79c0-.85-.7-1.55-1.56-1.53-6.06.15-11.79,1.02-17.54,1.45-5.91.44-11.8,1.08-17.78,1.67-.75.07-1.34.69-1.38,1.45-.11,1.85.5,3.64.32,5.53-.06.68-.64,1.22-1.32,1.29-.43.05-.87.09-1.31.1-2.16.04-4.32.04-6.48.02-1.2,0-1.76.57-1.75,1.75,0,1.28-.04,2.56,0,3.84.05,2,.11,2.04,2.14,2.45.06.01.12.02.19.04.73.16,1.24.82,1.2,1.57-.24,4.28-1.15,17.75-1.44,22.18-.06.8-.72,1.42-1.53,1.42h-9.99c-.82,0-1.49-.65-1.52-1.46l-5.69-155.27c-.03-.73-.14-1.45-.35-2.14l-6.5-22.07c-.42-1.42-2.41-1.47-2.9-.07l-7.56,21.8c-.3.86-.46,1.75-.48,2.65l-3.74,155.08c-.02.82-.69,1.48-1.52,1.48h-105.13c-2.04-.02-2.29-.34-2.58-2.41-.85-6.1-1.85-12.19-2.35-18.31-.48-5.81-.64-11.67-.53-17.5.48-24.37,5.64-47.74,15.56-70.03,8.54-19.18,20.04-36.41,34.61-51.53,28.36-29.45,62.7-47.55,103.08-54.1,10.45-1.69,20.98-2.5,31.55-2.19,44.22,1.29,83.23,16.22,116.41,45.55,31.35,27.72,50.77,62.38,58.52,103.52,1.52,8.1,2.3,16.29,2.7,24.54.63,13.09-.37,26.04-2.52,38.94-.04.23-.55,3.25-2.95,3.52ZM208.4,341.41h13.1l-6.53-13.6-6.57,13.6ZM214.97,327.81l-6.57,13.6h13.1l-6.53-13.6ZM214.97,327.81l-6.57,13.6h13.1l-6.53-13.6ZM214.97,327.81l-6.57,13.6h13.1l-6.53-13.6ZM214.97,327.81l-6.57,13.6h13.1l-6.53-13.6Z" />
            <path d="M124.61,418.03c-.14-.18-.26-.4-.44-.54-10.73-8.33-17.46-19.39-21.86-32.03-3.03-8.72-4.95-17.7-6.44-26.79-1.06-6.47-2.05-12.95-2.97-19.44-.41-2.89-1.38-5.57-2.39-8.27-.91-2.43-1.81-4.87-2.71-7.31.15-.09.31-.18.46-.27.58.62,1.18,1.23,1.74,1.87,8.42,9.78,14.89,20.77,20.23,32.47,4.86,10.64,8.76,21.64,12.54,32.69,1.89,5.52,3.71,11.08,5.9,16.48,3.7,9.18,9.15,17.2,16.64,23.76.3.26.7.4,1.05.6-.1.16-.19.33-.29.49-.26.02-.54.13-.77.06-10.33-2.93-20.93-4.54-31.45-6.59-9.9-1.94-19.7-4.25-28.94-8.46-4.9-2.23-9.5-4.96-13.69-8.34-9.24-7.45-17.92-15.46-24.89-25.16-7.41-10.32-12.93-21.49-15.46-34.02-.06-.3-.09-.61-.2-1.34.45.48.69.64.8.87,6.14,12.76,15.95,22.1,27.81,29.39,6.12,3.77,12.51,7.12,18.81,10.57,4.98,2.73,10.05,5.29,15.03,8.01,7.33,3.99,14.08,8.81,20.43,14.24,2.36,2.02,4.96,3.78,7.5,5.58,1.03.73,2.2,1.24,3.31,1.85l.26-.36Z" />
            <path d="M460.67,322.54c-3.3,9.4-5.15,19.13-6.73,28.93-1.67,10.42-3.15,20.88-6.22,31.02-2.48,8.19-6,15.85-11.48,22.51-2.66,3.23-5.69,6.05-9.01,8.59-.72.55-1.34,1.26-2,1.89.06.16.13.32.19.48.48,0,1.01.13,1.41-.03.5-.21.9-.65,1.32-1.02,11.83-10.53,24.93-19.25,38.78-26.87,6.45-3.54,13.04-6.81,19.54-10.26,4.98-2.65,9.27-6.26,13.5-9.93,7.45-6.46,13.74-13.84,17.89-22.89.09-.2.28-.36.75-.48-.22,1.19-.4,2.38-.66,3.56-2.16,9.98-6.25,19.15-11.83,27.64-11.13,16.94-25.7,30.06-43.82,39.23-8.01,4.05-16.55,6.25-25.31,7.97-9.65,1.9-19.22,4.15-28.82,6.28-1.36.3-2.68.77-4.2.8.24-.29.46-.61.73-.87,7.88-7.56,13.55-16.63,17.48-26.7,3.37-8.63,6.09-17.52,9.17-26.26,2.63-7.46,5.23-14.94,8.12-22.31,2.79-7.12,6.99-13.47,11.58-19.56,3.13-4.15,6.14-8.39,9.2-12.59.14.29.27.59.41.88Z" />
            <path d="M479.81,351.76c8.8-13.71,19.89-25.59,30.5-37.85,6.44-7.44,12.72-15.01,17.9-23.39,3.75-6.05,5.99-12.69,6.9-19.76.27.16.55.31.82.47.26,4.87.58,9.71.24,14.61-.73,10.52-3.42,20.48-7.87,29.98-5.59,11.94-13.44,22.28-22.64,31.65-12.86,13.11-27.63,23.74-43.3,33.18-2.37,1.43-4.71,2.89-7.38,4.54.25-.72.34-1.15.54-1.54,5-9.89,7.93-20.44,9.35-31.35,1.29-9.9,2.13-19.86,2.99-29.81,1.15-13.3,1.81-26.66,4.84-39.71,1.17-5.05,2.87-9.98,4.36-14.95.22-.74.62-1.43,1.17-2.67.18,1.04.33,1.53.34,2.02.22,11.87,2.33,23.53,3.89,35.25.92,6.89,1.7,13.82,1.99,20.75.41,9.69-1.19,19.12-5.16,28.07-.96,1.65-1.98,3.27-2.87,4.95-.85,1.61-2.53,2.76-2.9,4.72,1.12.31,1.47-.38,1.81-.99,1.5-2.71,2.98-5.44,4.47-8.17Z" />
            <path d="M478.53,414.24c-13.77,23.84-33.97,38.49-61.39,42.54-12.17,1.8-24.27.54-36.16-2.49-8.45-2.15-16.82-4.61-25.3-6.6-5.82-1.37-11.78-2.19-17.67-3.26-.28-.05-.55-.11-1.38-.29,1.09-.41,1.65-.65,2.23-.83,3.6-1.08,7.2-2.17,10.81-3.22,10.28-2.98,19.22-8.22,26.75-15.84,6.97-7.06,13.93-14.12,20.86-21.21,7.05-7.21,14.11-14.4,22.06-20.64,1.4-1.1,2.69-2.41,4.78-3.15-.26.76-.36,1.2-.55,1.6-4.01,8.1-8,16.21-12.05,24.28-3.52,7.02-7.42,13.82-12.46,19.88-6.37,7.65-14.07,13.24-23.97,15.38-1.77.38-3.57.64-5.37,1.16.96.68,2.04.46,3.05.31,5.06-.77,10.14-1.44,15.14-2.45,7.07-1.43,14.21-2.17,21.4-2.71,11.56-.86,23.14-1.65,34.48-4.25,9.77-2.24,18.98-5.79,26.91-12.09,2.56-2.03,4.83-4.41,7.24-6.64.2.18.4.36.59.53Z" />
            <path d="M74.94,362.82c-1.83-3.9-3.86-7.72-5.44-11.72-3.67-9.26-5.1-18.95-5-28.89.07-6.84,1.16-13.5,2.58-20.18,1.64-7.73,2.92-15.55,4.07-23.38.43-2.96.07-6.03.07-9.43.4.86.72,1.45.96,2.07,3.15,8.35,5.18,17,6.3,25.82,1.21,9.51,2.1,19.07,3.01,28.62,1.24,12.89,2.23,25.82,5.19,38.48,1.71,7.35,4.05,14.47,7.35,21.27.24.5.47,1.01.66,1.54.04.11-.08.28-.18.57-.42-.19-.86-.32-1.22-.57-11.71-7.96-23.52-15.77-35.07-23.95-10.01-7.1-19.1-15.29-26.79-24.94-9.36-11.76-14.78-25.15-16.78-39.98-.88-6.5-1.22-17.33-.72-22.58.25,1.05.39,1.58.49,2.11,1.92,10.16,6.66,18.98,13.03,26.95,3.44,4.3,7.17,8.39,10.89,12.46,6.04,6.61,12.28,13.04,18.24,19.73,4.21,4.72,7.71,9.99,10.64,15.63,1.36,2.62,3.01,5.09,4.67,7.54.79,1.16,1.91,2.09,2.87,3.13.06-.1.11-.19.17-.29Z" />
            <path d="M126.12,381.49c6.79,4.31,12.82,9.56,18.52,15.18,6.15,6.06,12.1,12.32,18.16,18.48,6.57,6.68,13.35,13.11,21.03,18.53,8.51,6,17.76,10.11,28.2,11.27.15.02.28.12.67.29-2.95.49-5.71.78-8.4,1.43-9.71,2.36-19.4,4.79-29.07,7.28-8.21,2.11-16.43,4.19-24.89,5.06-10.12,1.04-20.1.56-29.9-2.46-21.09-6.5-36.77-19.8-48.44-38.22-.32-.51-.55-1.07-.56-1.82.34.28.72.52,1.02.83,8.08,8.22,17.96,13.2,28.99,16.11,7.68,2.02,15.53,3.04,23.41,3.74,11.22,1,22.47,1.81,33.67,2.98,4.43.46,8.78,1.74,13.18,2.52,2.71.48,5.45,1.01,8.79.53-.97-.5-1.47-.85-2.02-1.04-2.49-.87-4.98-1.74-7.5-2.54-11.74-3.75-20.61-11.22-26.81-21.67-3.45-5.82-6.07-12.15-8.91-18.31-2.82-6.11-5.62-12.21-9.68-17.62.17-.18.34-.37.52-.55Z" />
            <path d="M475.03,203.33c2.89,10.56,8.44,19.83,13.94,29.12,3.95,6.68,7.82,13.39,10.77,20.61,4.03,9.88,5.21,20.07,3.6,30.59-.36,2.36-1.11,4.66-1.62,7.01-.33,1.53-.54,3.08-.81,4.62.2.07.4.14.6.21.51-1.03,1.21-2.01,1.51-3.09.94-3.46,2.11-6.93,2.51-10.47,1.36-12.15,5.36-23.5,9.79-34.76,3.39-8.63,6.83-17.25,9.84-26.02,2.88-8.38,4.06-17.1,3.61-26-.08-1.58-.25-3.16.04-4.9.31.74.65,1.47.91,2.22,2.93,8.35,4.7,16.93,5.45,25.75,1.35,15.85-.5,31.29-5.69,46.33-3.95,11.47-9.75,21.9-17.86,30.98-4.22,4.73-7.88,9.88-11.36,15.15-1.85,2.8-3.72,5.6-5.6,8.38-.43.64-.93,1.23-1.75,1.72.14-1.39.26-2.78.42-4.16,1.1-9.4.34-18.73-1.83-27.88-1.93-8.16-4.28-16.23-6.68-24.28-2.78-9.35-5.87-18.62-7.54-28.26-.67-3.85-1.12-7.75-1.48-11.65-.55-5.97-.95-11.95-1.38-17.93-.08-1.09-.01-2.19-.01-3.28.2,0,.4,0,.6,0Z" />
            <path d="M55.96,323.81c-1.22-1.87-2.33-3.82-3.67-5.6-4.77-6.32-9.62-12.58-14.42-18.87-2.33-3.05-4.64-6.12-6.95-9.18-7.83-10.37-12.29-22.15-14.75-34.81-2.12-10.9-2.9-21.88-2.3-32.94.51-9.22,2.12-18.26,5.23-27,.26-.73.59-1.43,1.02-2.49-.12,3.76-.34,7.1-.3,10.44.1,10.23,2.74,19.94,6.46,29.36,3.35,8.48,7,16.84,10.43,25.28,2.98,7.36,5.35,14.91,6.54,22.78.3,1.98.47,3.97.74,5.95.55,4.06,1.86,7.87,4.03,11.44-.42-2.89-.79-5.78-1.27-8.66-2.53-14.98-.14-29.15,7.07-42.49,3.61-6.68,7.39-13.28,11.07-19.93,3.5-6.32,6.44-12.87,8.11-19.93.01-.06.12-.1.29-.23.78.43.47,1.22.48,1.83.24,9.55-.63,19.01-2.19,28.42-2.34,14.15-6.21,27.94-9.97,41.75-1.38,5.09-2.76,10.19-4.06,15.31-1.75,6.88-2.09,13.89-1.74,20.95.12,2.39.4,4.78.6,7.17.04.45,0,.91,0,1.37-.16.03-.32.06-.49.09Z" />
            <path d="M44.53,126.22c-3.11,7.96-4.23,16.24-3.49,24.72.76,8.67,1.72,17.33,2.76,25.98.96,7.95,1.61,15.92,1.1,23.92-.37,5.9-1.1,11.77-1.63,17.66-.14,1.54-.17,3.09-.26,4.64.18.04.37.07.55.11.19-.37.47-.72.56-1.11.47-2.11,1.15-4.2,1.28-6.34.51-8.2,3.82-15.28,8.42-21.87,3.67-5.26,8.09-9.89,12.55-14.48,5.24-5.39,10.49-10.77,15.52-16.34,2.24-2.47,3.97-5.41,5.93-8.13.31-.43.62-.85,1.38-1.17-.09,1.3-.1,2.62-.28,3.91-1.35,9.71-4.79,18.7-9.39,27.3-4.91,9.19-10.89,17.7-16.61,26.38-4.8,7.28-9.45,14.65-13.11,22.59-2.62,5.69-4.68,11.56-5.88,17.71-.09.47-.22.94-.35,1.39-.04.14-.18.25-.36.48-.62-2.96-1.02-5.89-1.85-8.7-2.81-9.42-5.72-18.81-8.69-28.18-2.66-8.39-5.21-16.79-6.52-25.53-1.64-10.92-.99-21.66,1.99-32.3,3.4-12.12,8.43-23.45,15.83-33.68.18.34.36.69.54,1.03Z" />
            <path d="M505.94,249.93c-.21-.74-.37-1.18-.45-1.63-1.8-10.1-6.02-19.22-11.57-27.72-4.46-6.83-9.25-13.44-13.92-20.13-4.44-6.37-8.8-12.77-12.33-19.72-3.76-7.41-6.18-15.25-7.95-23.33-.47-2.16-.95-4.32-1.43-6.48.19-.13.38-.26.57-.4.12.3.21.62.37.9,4.06,6.61,9.49,12.03,14.97,17.43,5.19,5.1,10.43,10.15,15.44,15.43,4.42,4.67,8.02,9.96,10.46,15.97,1.67,4.11,2.47,8.43,3.24,12.76.38,2.11.84,4.2,1.27,6.3.16,0,.32,0,.47,0,.06-.56.19-1.12.16-1.68-.37-7.34-.65-14.69-1.18-22.03-.4-5.52-.44-11,.03-16.52.94-10.99,2.42-21.94,2.24-33.01-.15-9.16-1.53-17.99-5.87-26.2-.1-.19-.12-.42.11-.87.93,1.13,1.9,2.23,2.79,3.39,6.89,8.91,11.6,18.93,15,29.6,1.85,5.79,3.49,11.64,4.24,17.71,1.02,8.26.47,16.44-1.22,24.56-1.82,8.72-4.74,17.1-7.6,25.51-3.26,9.55-6.26,19.16-7.52,29.22-.03.21-.14.4-.33.92Z" />
            <path d="M497.16,182.69c-.14-.19-.3-.36-.41-.56-5.01-9.16-12.32-16.28-20.26-22.83-6.23-5.14-12.56-10.16-18.72-15.38-5.45-4.63-10.21-9.91-13.99-16.02-3.06-4.95-5.15-10.27-6.34-15.97-.78-3.74-1.69-7.46-2.3-11.32.17.21.38.39.49.63,3.7,7.56,9.2,13.65,15.66,18.87,5.1,4.12,10.44,7.94,15.65,11.92,4.84,3.69,9.53,7.54,13.51,12.19,3.15,3.67,5.73,7.69,7.7,12.1.27.61.6,1.21,1.22,1.69-.17-.84-.29-1.7-.52-2.52-.47-1.61-.91-3.24-1.53-4.8-4.56-11.33-7.36-23.14-9.94-35.03-1.03-4.76-2.36-9.47-3.94-14.08-2.39-7-6.26-13.11-12.04-17.89-.27-.23-.48-.53-.5-1.2,1.01.39,2.04.74,3.02,1.18,10.88,4.87,19.11,12.68,25.23,22.8,5.59,9.25,8.46,19.34,8.46,30.12,0,8.39-.47,16.78-.79,25.16-.24,6.32-.26,12.63.61,18.91.09.62.11,1.25.17,1.88-.14.05-.29.1-.43.15Z" />
            <path d="M61.68,154.88c2.93-5.5,6.85-10.24,11.61-14.21,5.03-4.19,10.35-8.05,15.44-12.17,3.97-3.21,7.9-6.49,11.66-9.95,4.04-3.71,7.14-8.18,9.5-13.14.21-.43.42-.86.66-1.27.07-.11.24-.16.69-.43-.09,1.34-.08,2.48-.24,3.61-1.48,10.54-5.82,19.88-11.97,28.45-6.16,8.59-13.63,15.9-22.19,22.05-5.63,4.05-10.44,8.93-15.07,14.02-3.89,4.27-7.32,8.88-10.12,13.95-.14.25-.37.46-.84,1.03,0-1.03-.05-1.63,0-2.22.96-9.11.28-18.21-.32-27.3-.58-8.86-1.17-17.7-.25-26.58.92-8.81,4.12-16.7,9.12-23.94,6.13-8.88,13.77-15.94,23.86-20.1.87-.36,1.77-.65,2.85-.7-.42.4-.83.82-1.27,1.21-6.09,5.38-10.11,12.1-12.85,19.67-2.65,7.33-4.01,14.96-5.42,22.59-1.21,6.52-2.53,13.02-3.86,19.52-.38,1.87-.99,3.69-1.5,5.53-.44,1.29-.88,2.59-1.32,3.88-.34.79-.68,1.58-1.01,2.37-.57.71-1.16,1.41-1.03,2.58.98-1.11,1.01-1.1,1.1-2.52.31-.81.61-1.63.92-2.44.61-1.15,1.22-2.3,1.83-3.45Z" />
            <path d="M409.71,56.7c15.76,5.75,31.03,12.37,42.97,24.78,4.71,4.89,8.26,10.52,10.85,16.82,2.38,5.79,4.19,11.73,5.77,17.77.92,3.54,2.07,7.03,3.16,10.7-.97.19-1.48-.54-2.04-.97-7.83-6.11-15.02-12.93-21.75-20.23-9.72-10.56-18.31-21.97-26.09-34.02-1.67-2.58-4.06-4.71-6.17-6.99-1.9-2.05-3.88-4.04-5.81-6.06-.43-.45-.81-.94-1.22-1.41.11-.13.23-.26.34-.38Z" />
            <path d="M136,59.84c-.1.22-.12.4-.22.49-7.74,6.5-13.69,14.5-19.18,22.89-4.16,6.35-8.31,12.71-12.68,18.92-4.3,6.11-9.54,11.35-15.41,16.01-3.87,3.08-7.41,6.58-11.11,9.88-1.04.92-2.13,1.79-3.52,2.95.04-.84,0-1.16.08-1.44,2.76-8.68,5.36-17.42,8.35-26.02,2.24-6.45,5.56-12.39,9.94-17.69,5.54-6.71,12.31-11.93,20.05-15.72,7.53-3.68,15.33-6.82,23.01-10.18.19-.08.43-.06.69-.09Z" />
          </g>
          <path d="M195.75,285.23h-89.58c1.06,0,1.95-.8,2.07-1.85.6-5.19,3.97-18.69,4.19-22.14.05-.74-1.65-2.57-1.71-5.02-.02-.88.28-3.94,4.11-4.33,1.74-.18,7.95-1.36,8.17-3.8.05-.6.11-1.21.16-1.84.1-1.07,1-1.89,2.29-1.89h1.37c1.11,0,2.02.85,2.09,1.95.01.22.03.45.04.69.1,1.72,2.13,2.58,3.45,1.47,1.39-1.18,14.48-17.82,15.29-18.7.82-.89,2.25-.91,3.07-.01,4.72,5.08,9.82,12.12,14.64,17.28,1.18,1.28,3.06.24,3.24-4.13.05-1.17.86-1.72,1.96-1.89,1.17-.18,2.63-.11,2.83,1.17.52,3.29.95,5.46,2.76,5.71,3.8.52,12.93,2.69,12.93,2.69,2.53,1.38,3.52,4.13,2.58,6.14-1.6,3.44-1.6,3.87-1.01,7.48.48,2.95,2.29,14.76,2.98,19.27.15,1.03,1.03,1.77,2.06,1.77Z" />
          <path d="M449.04,285.27h-54.28c1,0,1.8-.81,1.8-1.8v-16.67c-.07-1.01.02-3.58,1.64-3.61,2.61-.06,3.27-1.56,3.78-3.91,1.79-8.1,6.42-14.25,13.7-18.29,2.55-1.41,5.32-2.04,8.22-1.71,8.96,1.01,17.01,9.45,17.59,18.46.07,1.2.36,2.04,1.61,2.29,3,.59,3.85,2.76,3.95,5.44.09,2.37.11,4.74.18,7.11.06,2.07.04,7.91.01,10.89,0,1.01.81,1.81,1.8,1.81Z" />
        </svg>
      </div>
      {status === 0 && (
        <>
          <CandyForm setError={setError} setStatus={setStatus} />
        </>
      )}
      {status === 1 && <Success />}
      {status === 2 && <Failure />}
      <h1>{error}</h1>
    </>
  );
}

export default App;
