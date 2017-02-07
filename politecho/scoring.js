var ul = -.9;
var l = -.25;
var c = .25;
var uc = .9;

//Reputable classifyng sources
var news_dict = {};

//News pages
news_dict["179618821150"] = ul; //La repubblica

news_dict["110581545637280"] = uc; //La Padania

//Fake news
var ulf = -1;
var lf = -.6;
var cf = .6;
var ucf = 1;

//Fake news classifyng sources
var fakenews_dict = {};

//Fake news pages
fakenews_dict["679737005497548"] = ulf; //Democratici per il SI ?

fakenews_dict["101748583911"] = ucf; //Informare per resistere

//Politicians
var ulp = -.75;
var lp = -.25;
var cp = .25;
var ucp = .75;

//Fake news classifyng sources
var pol_dict = {};

//Politician Pages
pol_dict["113335124914"] = ulp; //Matteo Renzi

pol_dict["252306033154"] = ucp; //Matteo Salvini

var pageToName = {
	"179618821150" : "La repubblica",
  "110581545637280" : "La Padania",
	"679737005497548" : "Democratici per il SI",
	"101748583911" : "Informare per resistere",
  "113335124914" : "Matteo Renzi",
	"252306033154" : "Matteo Salvini"
}

function score(post_ids) {
	var score = 0;
	var found = 0;
	var fake = 0;
	var num_posts = post_ids.length;
	var pages = [];
	//deduplicate post_ids
	post_ids = post_ids.filter(function(elem, index, self) {
    return index == self.indexOf(elem);
	})
	for (i = 0; i < num_posts; i++) {
		post_id = post_ids[i];
		var page_data = {
			name: pageToName[post_id]
		};
		var oldFound = found;
		if (news_dict[post_id]) {
			found++;
			score += news_dict[post_id];
			page_data["score"] = news_dict[post_id];
		}
		else if (fakenews_dict[post_id]) {
			found++;
			fake++;
			score += fakenews_dict[post_id];
			page_data["score"] = fakenews_dict[post_id];
		} else if (pol_dict[post_id]) {
			found++;
			score += pol_dict[post_id];
			page_data["score"] = pol_dict[post_id];
		}
		if (found > oldFound) {
			pages.push(page_data);
		}
	}
	return {
		politicalScore: score / found,
		confidence: Math.min(found / 10, 1.0),
		authenticity: 1 - fake / found,
		pages: pages
	};
}
