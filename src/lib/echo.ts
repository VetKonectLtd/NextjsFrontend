import Echo from "laravel-echo";
import Pusher from "pusher-js";
import Cookies from "js-cookie";

declare global {
  interface Window {
    Pusher: typeof Pusher;
  }
}

const key = process.env.NEXT_PUBLIC_REVERB_APP_KEY!;
const host = process.env.NEXT_PUBLIC_REVERB_HOST!;
const port = Number(process.env.NEXT_PUBLIC_REVERB_PORT || 443);
const scheme = process.env.NEXT_PUBLIC_REVERB_SCHEME || "https";

const token = typeof window !== "undefined" ? Cookies.get("token") : null;

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: "pusher",
  key,
  wsHost: host,
  wsPort: port,
  wssPort: port,
  forceTLS: scheme === "https",
  enabledTransports: ["ws", "wss"],
  disableStats: true,
  authEndpoint: `${process.env.NEXT_PUBLIC_API_BASE_URL}/broadcasting/auth`,
  auth: {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      Accept: "application/json",
    },
  },
});

export default echo;