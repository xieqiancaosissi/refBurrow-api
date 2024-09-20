
export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);
		const pathname = url.pathname;
		if (pathname === '/api/is-blocked') {
			const cf :any = request.cf || {};
			const ip = request.headers.get("CF-Connecting-IP") || "Unknown IP";
			const country = cf.country || "Unknown Country";
			const region = cf.region || "Unknown Region";
			const city = cf.city || "Unknown City";
			const BLOCKED_COUNTRIES = [
				"CU", // Cuba
				"CF", // Central African Republic
				"IR", // Iran
				"IQ", // Iraq
				"LB", // Lebanon
				"LY", // Libya
				"KP", // North Korea
				"RU", // Russia
				"SO", // Somalia
				"SS", // South Sudan
				"SD", // Sudan and Darfur
				"SY", // Syria
				"VE", // Venezuela
				"YE", // Yemen
				"US", // United States
				];
			const response: any = { ip, country, region, city };
			if (BLOCKED_COUNTRIES.includes(country)) {
				response.blocked = true;
			  } else {
				response.blocked = false;
			  }
		  
			return new Response(JSON.stringify(response), {
				status: 200,
				headers: {
					"Content-Type": "application/json",
				},
			});
		} else {
			return new Response('404 Not Found', {
				status: 404,
			});
		}
	},
} satisfies ExportedHandler<Env>;
