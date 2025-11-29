import Echo from "laravel-echo";
import Pusher from "pusher-js";
import Cookies from "js-cookie";

declare global {
	interface Window {
		Pusher: typeof Pusher;
		Echo?: Echo<any>;
	}
}

let echo: Echo<any> | null = null;

if (typeof window !== "undefined") {
	const key = process.env.NEXT_PUBLIC_REVERB_APP_KEY;
	const host = process.env.NEXT_PUBLIC_REVERB_HOST;
	const port = Number(process.env.NEXT_PUBLIC_REVERB_PORT || 443);
	const scheme = process.env.NEXT_PUBLIC_REVERB_SCHEME || "http";
	const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

	if (!key || !host || !baseURL) {
		console.error(
			"Missing Reverb environment variables. Check your .env file.",
		);
	}

	window.Pusher = Pusher;

	try {
		if (!window.Echo) {
			window.Pusher.logToConsole = true;
			window.Echo = new Echo({
				broadcaster: "reverb",
				key,
				wsHost: host,
				wsPort: port,
				wssPort: port,
				forceTLS: scheme === "https",
				enabledTransports: scheme === "https" ? ["wss"] : ["ws"],
				disableStats: true,
				authEndpoint: `${baseURL}/broadcasting/auth`,
				auth: {
					headers: {
						Authorization: Cookies.get("auth-token")
							? `Bearer ${Cookies.get("auth-token")}`
							: "",
						Accept: "application/json",
					},
				},
			});
		}
		echo = window.Echo;
    
		echo.connector.pusher.connection.bind("connected", () => {
			console.log("REVERB CONNECTED!");
		});

		echo.connector.pusher.connection.bind("error", (error: any) => {
			console.error("REVERB CONNECTION ERROR:", error);
		});

		echo.connector.pusher.connection.bind("state_change", (states: any) => {
			console.log("Reverb State:", states);
		});
	} catch (error) {
		console.error("Failed to initialize Echo:", error);
	}
}

export default echo;
