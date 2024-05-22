import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../../firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword } from "firebase/auth";
import css from "./signIn.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { userSignedUp } from "../../store/slices/isUserSlice";

const SignUp = () => {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [fieldError, setFieldError] = useState({
		email: false,
		password: false,
	});
	let navigate = useNavigate();

	const navigateToHome = () => {
		navigate("/");
	};

	const addNewDoc = async (email, uid) => {
		const usersCollection = collection(db, "users");
		try {
			const newDocRef = doc(db, "users", uid);
			await setDoc(newDocRef, { email, uid, favRecipes: [] });
		} catch (err) {
			return err;
		}
	};

	const signUpFunc = async (e) => {
		e.preventDefault();

		if (!isValid()) {
			return;
		}

		try {
			const res = await createUserWithEmailAndPassword(auth, email, password);
			await addNewDoc(email, res.user.uid);

			dispatch(
				userSignedUp({
					username: email,
					userId: res.user.uid,
				})
			);

			navigateToHome();
		} catch (err) {
			return err;
		}
	};

	const isValid = () => {
		if (password.length < 6) {
			setFieldError({ ...fieldError, password: true });
			return false;
		}
		return true;
	};

	return (
		<div className={css.formWrapper}>
			<form onSubmit={signUpFunc}>
				<div className={css.inputRow}>
					<h2>Sign up</h2>
				</div>
				<div className={css.inputRow}>
					<FontAwesomeIcon icon={faEnvelope} className={css.iconEmail} />
					<input
						type='email'
						placeholder='Email'
						required
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className={css.inputRow}>
					<FontAwesomeIcon icon={faLock} className={css.iconPassword} />
					<input
						type='password'
						placeholder='Password'
						required
						onChange={(e) => setPassword(e.target.value)}
					/>
					{fieldError.password && (
						<p className={css.errorText}>
							Password must be at least 6 characters long
						</p>
					)}
				</div>
				<button type='submit' className={css.signInBtn}>
					Sign Up
				</button>
				<div className={css.register}>
					<p>
						Have an account already?
						<Link to={"/sign-in"} className={css.registerLink}>
							Sign in
						</Link>
					</p>
				</div>
			</form>
		</div>
	);
};

export default SignUp;
