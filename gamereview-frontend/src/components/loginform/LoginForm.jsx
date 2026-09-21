import { useRef } from "react";
import { useAuthStore } from "../../stores/authstore";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login as loginUser } from "../../api/auth";

const demoUsers = [
	{
		username: "jesper",
		password: "jesper",
		role: "admin",
	},
	{
		username: "nyberg",
		password: "nyberg",
		role: "user",
	},
];

const LoginForm = () => {
	const usernameRef = useRef();
	const passwordRef = useRef();
	const saveToken = useAuthStore(state => state.login);
	const navigate = useNavigate();
	
	const {
		mutate,
		isPending,
		isError, 
		error
	} = useMutation({
		mutationFn : loginUser,
		onSuccess : (data) => {
			saveToken(data.token);
			navigate('/');
		}
	});

	const handleDemoUser = user => {
		usernameRef.current.value = user.username;
		passwordRef.current.value = user.password;
	};

	const handleSubmit = event => {
		event.preventDefault();

		mutate({
			username : usernameRef.current.value,
			password : passwordRef.current.value
		});
	};

	return (
		<form
			className="login-form"
			onSubmit={handleSubmit}
		>
			<div className="login-form__field">
				<label
					className="login-form__label"
					htmlFor="login-username"
				>
					Username
				</label>

				<input
					className="login-form__input"
					id="login-username"
					type="text"
					placeholder="your_username"
					ref={usernameRef}
				/>
			</div>

			<div className="login-form__field">
				<label
					className="login-form__label"
					htmlFor="login-password"
				>
					Password
				</label>

				<input
					className="login-form__input"
					id="login-password"
					type="password"
					placeholder="••••••••"
					ref={passwordRef}
				/>
			</div>

			{isError && <p className="login-form__error">{error.message}</p>}

			<button
				className="login-form__submit"
				type="submit"
				disabled={isPending}
			>
				{isPending ? "Signing in..." : "Sign in"}
			</button>

			<div className="login-form__demo">
				<span className="login-form__demo-title">Demo credentials</span>

				<div className="login-form__demo-users">
					{demoUsers.map(user => (
						<button
							key={user.username}
							type="button"
							className="login-form__demo-user"
							onClick={() => handleDemoUser(user)}
						>
							<strong>{user.username}</strong>

							<span className="login-form__demo-password">
								{user.password}
							</span>

							<span
								className={`login-form__demo-role login-form__demo-role--${user.role}`}
							>
								{user.role}
							</span>
						</button>
					))}
				</div>

				<span className="login-form__demo-help">
					Click a row to fill the form automatically.
				</span>
			</div>
		</form>
	);
};

export default LoginForm;
