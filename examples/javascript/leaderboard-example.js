(function(){
	var leaderboard = new window._clLeaderBoard({
		spaceName: "",
		competitionId: "",
		contestId: "",
		apiKey: {},
		font: "Helvetica",
		theme: "standardTheme",
		container: ".cl-leaderboard",
		api: {
			url: "",
			leaderBoardQuery: "data/leaderboard-data.json",
			contestQuery: "data/contest-data.json",
			preLoader: "images/pre-loader.gif",
			css: {
				standardTheme: "css/leaderboard.css"
			}
		}
	})
})();