const portscanner = require("portscanner");
const fs = require("fs");
const serverlist = require("./voipmspops.json");
const promises = [];
const report = [];
for (server of serverlist) {
	promises.push(portscanner.checkPortStatus("5060", server.ip));
}

Promise.all(promises)
	.then(function (results) {
		for (let i = 0; i < results.length; i++) {
			report.push({
				server: serverlist[i].fqdn,
				ip: serverlist[i].ip,
				status: results[i],
			});
		}
	})
	.then(function () {
		const json = JSON.stringify(report, null, 4);

		fs.writeFile("results.json", json, "utf8", function (err) {});
	});
