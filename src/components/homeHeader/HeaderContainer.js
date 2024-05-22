import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { nanoid } from "@reduxjs/toolkit";
import css from "./headerContainer.module.css";
import OrangeBtn from "../UI/buttons/OrangeBtn";
import logoCarImg from "../../assets/Mask Group.png";
import logoNameImg from "../../assets/Frame 36.png";
import { faTimes, faBars } from "@fortawesome/free-solid-svg-icons";
import { userLoggedOut } from "../../store/slices/isUserSlice";

const HeaderContainer = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [userIsHovered, setUserIsHovered] = useState(false);
	const [menuClicked, setMenuClicked] = useState(false);
	const [isUser, setIsUser] = useState(false);
	const [showSignIn_dropdown, setShowSignIn_dropdown] = useState(false);
	const [username, setUsername] = useState("");

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setIsUser(true);
				let username = user.email.replace(/\@.*/g, "$'");
				setUsername(username);
			} else {
				setIsUser(false);
			}
		});
	}, []);

	const checkWindowWidth = () => {
		if (window.innerWidth <= 1200) {
			setMenuClicked(false);
			setShowSignIn_dropdown(true);
		}
		if (window.innerWidth > 1200) {
			setMenuClicked(true);
			setShowSignIn_dropdown(false);
		}
	};
	useEffect(() => {
		checkWindowWidth();
		const handleResize = () => {
			checkWindowWidth();
		};
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	const logoHandler = () => {
		navigate("/");
	};
	const loginHandler = () => {
		navigate("/sign-in");
	};
	const closeMobileMenu = () => {
		if (window.innerWidth > 1200) {
			setMenuClicked(true);
		}
		if (window.innerWidth <= 1200) {
			setMenuClicked(false);
		}
	};
	const userLoggedOutOnMobileMenu = () => {
		closeMobileMenu();
		userSignOutHandler();
	};
	const tabs = [
		{ tabLink: "/popular", tabName: "Popular" },
		{ tabLink: "/nutritions", tabName: "Nutritions & Facts" },
		{ tabLink: "/food", tabName: "Search Recipes" },
		isUser && { tabLink: "/user/favorite", tabName: "Favorite" },
	].filter(Boolean);

	const userSignOutHandler = () => {
		signOut(auth)
			.then(() => {
				dispatch(userLoggedOut());
			})
			.catch((err) => {
				return err;
			});
	};
	return (
		<div
			className={
				menuClicked ? `${css.navbar} ${css.navActive}` : `${css.navbar} `
			}>
			<div className={css.logoContainer} onClick={logoHandler}>
				<img src={logoCarImg} />
				<img src={logoNameImg} />
			</div>
			<div
				className={css.menuIcon}
				onClick={() => setMenuClicked(!menuClicked)}>
				{menuClicked ? (
					<FontAwesomeIcon icon={faTimes} />
				) : (
					<FontAwesomeIcon icon={faBars} />
				)}
			</div>
			<ul
				className={
					menuClicked
						? `${css.navMenu} ${css.navMenuActive} `
						: `${css.navMenu}`
				}>
				{menuClicked &&
					tabs.map((tab) => (
						<li className={css.navItem} key={nanoid()}>
							<Link
								to={tab.tabLink}
								className={css.navLinks}
								onClick={closeMobileMenu}>
								{tab.tabName}
							</Link>
						</li>
					))}
				{/**favorite here */}
				{menuClicked && showSignIn_dropdown && (
					<li className={css.navItem}>
						{isUser && (
							<Link
								to={"/"}
								className={css.navLinks}
								onClick={userLoggedOutOnMobileMenu}>
								Log out
							</Link>
						)}
						{!isUser && (
							<Link
								to={"/sign-in"}
								className={css.navLinks}
								onClick={closeMobileMenu}>
								Login
							</Link>
						)}
					</li>
				)}
			</ul>
			<div className={css.userContainer}>
				{!isUser && (
					<OrangeBtn btnContent={`Sign-in`} clickHandler={loginHandler} />
				)}
				{isUser && (
					<div
						className={css.userBtnWrapper}
						onMouseOver={() => setUserIsHovered(true)}
						onMouseOut={() => setUserIsHovered(false)}>
						<OrangeBtn
							btnContent={!userIsHovered ? `${username}` : "Log Out"}
							clickHandler={userSignOutHandler}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default HeaderContainer;
