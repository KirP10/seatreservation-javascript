    /* const rows = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t"];
    let html = "";
    let counter = 1;

    rows.forEach(function(row){
        html += `<div class="label">${row}</div>`;
        for(let i=0; i<3; i++){
            html += `<div id="${row + counter}">${counter}</div>`;
            counter++;
        }
        counter = counter + 12;
    });
    document.getElementById('left').innerHTML = html;

    html = "";
    counter = 1;

    rows.forEach(function(row){
        counter = counter + 12;
        for(let i=0; i<3; i++){
            html += `<div id="${row + counter}">${counter}</div>`;
            counter++;
        }
        html += `<div class="label">${row}</div>`;
    });
    document.getElementById('right').innerHTML = html;

    html = "";
    counter = 1;

    rows.forEach(function(row){
        counter = counter + 3;
        for(let i=0; i<9; i++){
            html += `<div id=${row + counter}>${counter}</div>`;
            counter++;
        }
        counter = counter + 3;
    });
    document.getElementById('middle').innerHTML = html; */

    var reservedSeats = {
        record1: {
            seat: "b19",
            owner: {
                fname: "Joe",
                lname: "Smith"
            }
        },
        record2: {
            seat: "b20",
            owner: {
                fname: "Joe",
                lname: "Smith"
            }
        },
        record3: {
            seat: "b21",
            owner: {
                fname: "Joe",
                lname: "Smith"
            }
        },
        record4: {
            seat: "b22",
            owner: {
                fname: "Joe",
                lname: "Smith"
            }
        }
    };

    function makeRows(sectionLength, rowLength, placement){
        const rows = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t"];
        let html = "";
        let counter = 1;

        rows.forEach(row => {
            switch(placement){
                case "left": html += `<div class="label">${row}</div>`; break;//make label
                case "right": counter = counter + (rowLength - sectionLength); break;//add 12 to the counter
                default: counter = counter + ((rowLength - sectionLength)/2); break;//add 3 to the counter
            }

            //loops
            for(let i=0; i<sectionLength; i++){
                html += `<div class="a" id="${row + counter}">${counter}</div>`; //class="a" means available
                counter++;
            }

            switch(placement){
                case "left": counter = counter + (rowLength - sectionLength); break;//add 12 to the counter
                case "right": html += `<div class="label">${row}</div>`; break;//add label
                default: counter = counter + ((rowLength - sectionLength)/2); break;//add 3 to the counter
            }
        });
        document.getElementById(placement).innerHTML = html;
    }
    makeRows(3, 15, 'left');
    makeRows(3, 15, 'right');
    makeRows(9, 15, 'middle');

(function(){
    "use strict";

    let selectedSeats = [];
    const seats = document.querySelectorAll('.a');

    for(const key in reservedSeats){
        if(reservedSeats.hasOwnProperty(key)){
            const obj = reservedSeats[key];
            //console.log(obj.seat);
            document.getElementById(obj.seat).className = 'r';
            document.getElementById(obj.seat).innerHTML = 'R';
        }
    }

    seats.forEach(seat => {
        seat.addEventListener('click', () => {
            //get the id of the seat that was clicked
            //run a function seatSelectionProcess that add to the array
            seatSelectionProcess(seat.id);
        });
    });

    function seatSelectionProcess(thisSeat){
        if(!document.getElementById(thisSeat).classList.contains('r')){
            //add that seat to the array
            var index = selectedSeats.indexOf(thisSeat);
            if(index > -1){
                // must be in the array. Take it out and set the class back to 'a'
                selectedSeats.splice(index, 1);
                document.getElementById(thisSeat).className = 'a';
            }
            else{
                //add it to the array (using push()).
                selectedSeats.push(thisSeat);
                document.getElementById(thisSeat).className = 's';
            }
            manageConfirmForm();
            console.log(selectedSeats);
        }
    }

    document.getElementById('reserve').addEventListener('click', event => {
        event.preventDefault();
        document.getElementById('resform').style.display = 'block';
    });
    document.getElementById('cancel').addEventListener('click', event => {
        event.preventDefault();
        document.getElementById('resform').style.display = 'none';
    });

    function manageConfirmForm(){
        if(selectedSeats.length > 0){
            document.getElementById('confirmres').style.display = 'block';
            
            if(selectedSeats.length === 1){
                document.getElementById('selectedseats').innerHTML = `you have selected seat ${selectedSeats[0]}`;
            }
            else{
                let seatString = selectedSeats.toString();
                seatString = seatString.replace(/,/g,", ");
                seatString = seatString.replace(/,(?=[^,]*$)/, ' and');
                document.getElementById('selectedseats').innerHTML = `You have selected seats ${seatString}`;
            }   
        }
        else{
            document.getElementById('confirmres').style.display = 'none';
            document.getElementById('selectedseats').innerHTML = 'You need to select some seats to reserve.<br> <a href="#" id="error">Close</a> this dialog box and pick at least one seat.';
            document.getElementById('error').addEventListener('click', () => {
                document.getElementById('resform').style.display = 'none';
            });
        }
    }
    manageConfirmForm();

    document.getElementById('confirmres').addEventListener('submit', event => {
        event.preventDefault();
        processReservation();
    });
    
    function processReservation(){
        const hardCodeRecords = Object.keys(reservedSeats).length;
        const fname = document.getElementById('fname').value;
        const lname = document.getElementById('lname').value;
        let counter = 1;
        let nextRecord = '';

        selectedSeats.forEach(thisSeat => {
            //change class from 's' to 'r'
            document.getElementById(thisSeat).className = 'r';
            // change HTML to R
            document.getElementById(thisSeat).innerHTML = 'R';
            //add it to the object
            nextRecord = `record${hardCodeRecords + counter}`; // 4+1
            reservedSeats[nextRecord] = {
                seat:thisSeat,
                owner: {
                    fname:fname,
                    lname:lname
                }
            };
            counter++;
        });
        //clean up
        document.getElementById('resform').style.display = 'none';
        selectedSeats = [];
        manageConfirmForm();
        console.log(reservedSeats);
    }
}());