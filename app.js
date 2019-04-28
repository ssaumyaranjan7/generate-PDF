let express = require("express");
let app = express();
let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");

let students = [{
	name: "Joy",
	email: "joy@example.com",
	city: "New York",
	country: "USA"
	},
	{
	name: "John",
	email: "John@example.com",
	city: "San Francisco",
	country: "USA"
	},
	{
	name: "Clark",
	email: "Clark@example.com",
	city: "Seattle",
	country: "USA"
	},
	{
	name: "Watson",
	email: "Watson@example.com",
	city: "Boston",
	country: "USA"
	},
	{
	name: "Tony",
	email: "Tony@example.com",
	city: "Los Angels",
	country: "USA"
	}];
	


app.get("/generateReport", (req, res) => {
	ejs.renderFile(path.join(__dirname, './views/', "report-template.ejs"), {
        students: students
    }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            let options = {
                "height": "11.25in",
                "width": "8.5in",
                "header": {
                    "height": "20mm",
                },
                "footer": {
                    "height": "20mm",
                },

            };
            pdf.create(data, options).toFile("report.pdf", function (err, data) {
                if (err) {
                    res.send(err);
                } else {
                    res.send("File created successfully");
                }
            });
        }
    });
})

app.listen(3000);
