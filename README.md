# Widgets

## Examples
[Examples Index](https://s3-eu-west-1.amazonaws.com/demo.competitionlabs.com/_widgets/index.html)
- [Basic Leaderboard example - Click here](https://s3-eu-west-1.amazonaws.com/demo.competitionlabs.com/_widgets/examples/leaderboard.html)
- [Competition Leaderboard example - Click here](https://s3-eu-west-1.amazonaws.com/demo.competitionlabs.com/_widgets/examples/leaderboard-competition.html)
- [Achievement example - Click here](https://s3-eu-west-1.amazonaws.com/demo.competitionlabs.com/_widgets/examples/achievements.html)

## Basic Leaderboard
Adding a leaderboard widget to your website
```html
<script type="text/javascript">
	(function(w,d,s,u,o){
		w[o] = ((w[o]) ? w[o] : []);
		w[o].push({
			spaceName: "<space_name>",
			contestId: "<contest_id>",
			apiKey: {
				"X-API-KEY": "<api_key>"
			},
			font: "Helvetica",
			theme: "standardTheme",
			container: ".cl-leaderboard-widget"
		});
		var a=d.createElement(s), m=d.getElementsByTagName(s)[0];
		a.async=1;a.src=u;m.parentNode.insertBefore(a,m);
	})(window,document,'script','https://gateway.competitionlabs.com/assets/javascripts/leaderboard.js', "_clOptions");
</script>
<div class="cl-leaderboard-widget"></div>
```

## Competition Leaderboard
Adding a competition leaderboard widget to your website
```html
<script type="text/javascript">
	(function(w,d,s,u,o){
		w[o] = ((w[o]) ? w[o] : []);
		w[o].push({
			spaceName: "<space_name>",
			competitionId: "<competition_id>",
			apiKey: {
				"X-API-KEY": "<api_key>"
			},
			font: "Helvetica",
			theme: "standardTheme",
			container: ".cl-competition-leaderboard-widget"
		});
		var a=d.createElement(s), m=d.getElementsByTagName(s)[0];
		a.async=1;a.src=u;m.parentNode.insertBefore(a,m);
	})(window,document,'script','https://gateway.competitionlabs.com/assets/javascripts/competition-leaderboard.js', "_clCompOptions");
</script>
<div class="cl-competition-leaderboard-widget"></div>
```

## Achievements
Adding a achievement widget to your website
```html
<script type="text/javascript">
	(function(w,d,s,u,o){
		w[o] = ((w[o]) ? w[o] : []);
		w[o].push({
			memberId: "",
			apiKey: "<api_key>",
			spaceName: "<space_name>",
			widgetId: "<widget_id>"
		});
		var a=d.createElement(s), m=d.getElementsByTagName(s)[0];
		a.async=1;a.src=u;m.parentNode.insertBefore(a,m);
	})(window,document,"script","https://gateway.competitionlabs.com/assets/javascripts/achievements-widget.js", "_clAchievementOptions");
</script>
<div class="cl-achievement-widget"></div>
```