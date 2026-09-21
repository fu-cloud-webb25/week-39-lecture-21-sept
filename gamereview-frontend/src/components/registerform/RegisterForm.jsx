import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../api/auth";


const RegisterForm = () => {
	const usernameRef = useRef();
	const passwordRef = useRef();
	const roleRef = useRef();
	
	const {
		mutate,
		isPending,
		isError,
		error,
		isSuccess
	} = useMutation({
		mutationFn : register
	});


	const handleSubmit = e => {
		e.preventDefault();

		const user = {
			username: usernameRef.current.value,
			password: passwordRef.current.value,
			role: roleRef.current.value ? "user" : "admin",
		};
		mutate(user);
	};

	return (
		<form
			className="register-form"
			onSubmit={handleSubmit}
		>
			<div className="register-form__field">
				<label
					className="register-form__label"
					htmlFor="register-username"
				>
					Username
				</label>

				<input
					className="register-form__input"
					id="register-username"
					type="text"
					placeholder="cool_gamer_42"
					ref={usernameRef}
				/>
			</div>

			<div className="register-form__field">
				<label
					className="register-form__label"
					htmlFor="register-password"
				>
					Password
				</label>

				<input
					className="register-form__input"
					id="register-password"
					type="password"
					placeholder="min. 6 characters"
					ref={passwordRef}
				/>
			</div>

			<fieldset className="register-form__roles">
				<legend className="register-form__label">Role</legend>

				<label className="register-form__role">
					<input
						type="radio"
						name="role"
						value="user"
						defaultChecked
						ref={roleRef}
					/>
					<span>User</span>
				</label>

				<label className="register-form__role">
					<input
						type="radio"
						name="role"
						value="admin"
					/>
					<span>Admin</span>
				</label>
			</fieldset>

			<button
				className="register-form__submit"
				type="submit"
				disabled={isPending}
			>
				{isPending ? "Creating account..." : "Create account"}
			</button>

			{isError && (
				<p className="register-form__error">
					{error.message || "Could not create account"}
				</p>
			)}

			{isSuccess && (
				<p className="register-form__success">
					Account successfully created!
				</p>
			)}
		</form>
	);
};

export default RegisterForm;
