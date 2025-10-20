import Echo from "laravel-echo";
import Pusher from "pusher-js";
import Cookies from "js-cookie";

declare global {
  interface Window {
    Pusher: typeof Pusher;
    Echo: Echo<any>;
  }
}

const key = process.env.NEXT_PUBLIC_REVERB_APP_KEY!;
const host = process.env.NEXT_PUBLIC_REVERB_HOST!;
const port = Number(process.env.NEXT_PUBLIC_REVERB_PORT || 443);
const scheme = process.env.NEXT_PUBLIC_REVERB_SCHEME || "https";

let echo: Echo;

if (typeof window !== "undefined") {
  if (!window.Pusher) {
    window.Pusher = Pusher;
  }

  if (!window.Echo) {
    window.Echo = new Echo({
      broadcaster: "pusher",
      key,
      wsHost: host,
      wsPort: port,
      wssPort: port,
      forceTLS: scheme === "https" && host !== "localhost",
      enabledTransports: ["ws", "wss"],
      disableStats: true,
      authEndpoint: `${process.env.NEXT_PUBLIC_API_BASE_URL}/broadcasting/auth`,
      auth: {
        headers: () => ({
          Authorization: Cookies.get("token")
            ? `Bearer ${Cookies.get("token")}`
            : "",
          Accept: "application/json",
        }),
      },
    });
  }

  echo = window.Echo;
}

export default echo;
