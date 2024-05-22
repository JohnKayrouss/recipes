import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { userLoggedIn } from "../../store/slices/isUserSlice";
import css from "./signIn.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

const SignIn = () => {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [fieldError, setFieldError] = useState({
		email: false,
		password: false,
	});
	const navigate = useNavigate();

	const navigateToHome = () => {
		navigate("/");
	};

	const emailInputHandler = (e) => {
		setEmail(e.target.value);
		setFieldError({ email: false, password: false });
	};

	const passwordInputHandler = (e) => {
		setPassword(e.target.value);
		setFieldError({ email: false, password: false });
	};

	const signInFunc = async (e) => {
		e.preventDefault();

		if (!isValid()) {
			return;
		}

		try {
			const res = await signInWithEmailAndPassword(auth, email, password);

			const userData = await fetchUserDataFromFirestore(res.user.uid);
			const favRecipes = userData ? userData.favRecipes : [];

			const userId = res.user.uid;
			const userDataLocalStorage = {
				username: res.user.email.replace(/\@.*/g, "$'"),
				userId: userId,
				favRecipes: favRecipes,
			};
			const storedUserData = localStorage.getItem(userId);
			if (
				!storedUserData ||
				JSON.stringify(userDataLocalStorage) !== storedUserData
			) {
				localStorage.setItem(userId, JSON.stringify(userDataLocalStorage));
			}

			dispatch(
				userLoggedIn({
					username: res.user.email,
					userId: userId,
					favRecipes: favRecipes,
				})
			);

			navigateToHome();
		} catch (err) {
			return err;
		}
	};

	const fetchUserDataFromFirestore = async (uid) => {
		try {
			const userDocRef = doc(db, "users", uid);
			const userDoc = await getDoc(userDocRef);
			return userDoc.exists() ? userDoc.data() : null;
		} catch (error) {
			return null;
		}
	};

	const isValid = () => {
		return password.length >= 6;
	};

	return (
		<div className={css.formWrapper}>
			<form>
				<div className={css.inputRow}>
					<h2>Login</h2>
				</div>
				<div className={css.inputRow}>
					<FontAwesomeIcon icon={faEnvelope} className={css.iconEmail} />
					<input
						type='email'
						placeholder='Email'
						required
						onChange={emailInputHandler}
					/>
				</div>
				<div className={css.inputRow}>
					<FontAwesomeIcon icon={faLock} className={css.iconPassword} />
					<input
						type='password'
						placeholder='Password'
						required
						onChange={passwordInputHandler}
					/>
				</div>
				<div className={css.loginValidation}>
					{(fieldError.password || fieldError.email) && (
						<span>Invalid input or user not found!</span>
					)}
				</div>

				<button type='submit' onClick={signInFunc} className={css.signInBtn}>
					Sign in
				</button>
				<div className={css.register}>
					<p>
						Don't have an account?
						<Link to={"/sign-up"} className={css.registerLink}>
							Register
						</Link>
					</p>
				</div>
			</form>
		</div>
	);
};

export default SignIn;
