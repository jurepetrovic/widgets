(function(){
	var ajax = new conmisio.Ajax(),
		leaderboard = new window._clLeaderBoard({
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
			},
			autoStart: false
		});
	
	/**
	 * check if there is any data for a member on the gateway API
	 *
	 * member eligible competitions by member ID => `/api/v1/:space/members/:id/competitions`
	 * member eligible competitions by member reference ID => `/api/v1/:space/members/reference/:memberRefId/competitions`
	 */
	ajax.getData({
		type: "GET",
		url: "data/competition-list-data.json",
		success: function(response, dataObj, xhr){
			var json = JSON.parse(response);
			
			if( json.data.length > 0 ){
				conmisio.query(".simple-widget-icon-container").style.display = "block";
				leaderboard.init();
				
				conmisio.query(".simple-widget-icon").addEventListener("click", function(event){
					conmisio.query(".cl-leaderboard").style.display = "block";
				});
			}
		}
	});
})();