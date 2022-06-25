const timeframes = document.querySelectorAll(".timeframe");

const hours = document.querySelectorAll(".hours");

const pastHours = document.querySelectorAll(".past-timeframe-hours");

const cardTitles = document.querySelectorAll(".title");

const trackingSection = document.querySelectorAll(".tracking");

console.log(trackingSection);

// fetch data
const getData = (timeframes, hours, pastHours, cardTitles) => {
    fetch("./data.json")
        .then(response => {
            return response.json();
        })
        .then(data =>
            mainScript(data, timeframes, hours, pastHours, cardTitles));


}


// handle click on timeframe
const handleClick = (data) => {
    return function handleTimeframe(e) {

        const elementClicked = e.target;
        const elementText = elementClicked.innerHTML;

        let timeframeText = "weekly";

        if (elementText === "Daily") {
            timeframeText = "daily";
        } else if (elementText === "Weekly") {
            timeframeText = "weekly";
        } else {
            timeframeText = "monthly";
        }

        // based on timeframe clicked, diplay correct values
        for (let i = 0; i < cardTitles.length; i++) {

            cardTitles[i].innerHTML = data[i].title;

            hours[i].innerHTML = data[i].timeframes[timeframeText].current + "hrs";

            pastHours[i].innerHTML = "Last Week - " + data[i].timeframes[timeframeText].previous + "hrs";
        }


        // remove active class from every timeframe that isn't clicked
        timeframes.forEach(timeframe => {
            timeframe.classList.remove("active");
        });

        elementClicked.classList.add("active");
    }

}


// main program
const mainScript = (data, timeframes, hours, pastHours, cardTitles) => {

    timeframes.forEach(timeframe => {
        timeframe.addEventListener("click", handleClick(data));
    });


    // default values shown at first
    for (let i = 0; i < cardTitles.length; i++) {

        cardTitles[i].innerHTML = data[i].title;

        hours[i].innerHTML = data[i].timeframes.weekly.current + "hrs";

        pastHours[i].innerHTML = "Last Week - " + data[i].timeframes.weekly.previous + "hrs";
    }

}

getData(timeframes, hours, pastHours, cardTitles);