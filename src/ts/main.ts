import $ from "jquery";

$(async () => {
    let headersList = {
        "Authorization": "Bearer " + localStorage.getItem("access_token")
    }

    let response = await fetch("http://25.54.85.248/projects/", {
        method: "GET",
        headers: headersList
    });
    if (response.status == 200) {
        console.log(response)

        const parsedResponse = response.json().then((mydata) => {
            $.get("../templates/itemDisplay.html", function (data) {
                console.log(mydata)
                
                let response = data;
                let placeholders: Record<string, string> = {
                    "{{title}}": mydata.title,
                    "{{Description}}": mydata.desc
                };
                //Replace in template
                for (let placeholder in placeholders) {
                    if (placeholders.hasOwnProperty(placeholder)) {
                        response = response.replace(placeholder, placeholders[placeholder]);
                    }
                }
                $("#insert-star").append(response);
            });
        });
    }
});