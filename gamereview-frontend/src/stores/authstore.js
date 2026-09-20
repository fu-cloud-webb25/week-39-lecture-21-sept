import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = create(
	persist(
		set => ({
			token: null,
			user: null,
			login: token => {
				const decoded = jwtDecode(token);
				set({
					token,
					user: {
						username: decoded.username,
						role: decoded.role,
					},
				});
			},
			logout: () => {
				set({
					token: null,
					user: null,
				});
			},
		}),
		{
			name: "auth",
		},
	),
);
