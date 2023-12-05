const currentDate = document.querySelector(".current-date"),
    daysTag = document.querySelector(".days"),
    prevNextIcon = document.querySelectorAll(".icons span");

//getting new date, current year and month
let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

// console.log(date, currYear, currMonth);

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const renderCalender = () => {

    let firstDateofMonth = new Date(currYear, currMonth, 1).getDay(); //getting First date of month
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), //getting last date of month
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), //getting last day of month
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); //getting last date of previous  month

    // console.log(lastDateofMonth);
    let liTag = "";


    for (let i = firstDateofMonth; i > 0; i--) {//creating li previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }



    for (let i = 1; i <= lastDateofMonth; i++) {//creating li of all days of current month
        //adding active class to li if the current day, month and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
            && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }


    for (let i = lastDayofMonth; i < 6; i++) {//creating li of next month first days
        liTag += `<li class="inactive">${i - lastDateofLastMonth + 1}</li>`;
    }

    currentDate.innerHTML = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;

}
renderCalender();


prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => { //adding click evenr on both icons
        //console.log(icon);

        //if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if (currMonth < 0 || currMonth > 11) {//if current month is less than 0 or greater than 11 
            //creating a new date of current year & month and pass it as date value 
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear();//updating current year with new date year
            currMonth = date.getMonth();//updating current month with new date month

        }
        else {//else pass new date as date value
            date = new Date();

        }

        renderCalender();
    });
})