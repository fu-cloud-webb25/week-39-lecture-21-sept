import { useState, useEffect } from "react";
import GameCard from "../../components/gamecard/GameCard";
import SearchControls from "../../components/searchcontrols/SearchControls";
import "./landingpage.css";
import { useAuthStore } from "../../stores/authstore";
import AddGameModal from "../../components/addgamemodal/AddGameModal";
import Button from "../../components/button/Button";

const LandingPage = () => {
	const [showAddGameModal, setShowAddGameModal] = useState(false);
	const [category, setCategory] = useState("All");
	const [search, setSearch] = useState("");
	const user = null;
	const isLoading = false;
	const isError = false;
	const games = [];

	return (
		<div className="wrapper landing-wrapper">
			<h2 className="main__title">GameReview Database</h2>

			<h3 className="main__subtitle">
				Search and explore games — click any entry to view details,
				like, and review.
			</h3>

			<SearchControls
				activeCategory={category}
				onCategoryChange={setCategory}
				search={search}
				onSearchChange={setSearch}
			/>
			{user?.role === "admin" && (
				<Button
					onclick={() => setShowAddGameModal(true)}
					text="+ Add game"
				/>
			)}

			{showAddGameModal && (
				<AddGameModal onClose={() => setShowAddGameModal(false)} />
			)}
			<section className="game-list"></section>
		</div>
	);
};

export default LandingPage;
