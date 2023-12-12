document.getElementById('hotelForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const bookingData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        roomType: formData.get('roomType'),
        numberOfRooms: parseInt(formData.get('numberOfRooms')),
        adults: parseInt(formData.get('adults')),
        children: parseInt(formData.get('children')),
        extraBed: event.target.elements['extraBed'].checked,
        poolView: event.target.elements['poolView'].checked,
        gardenView: event.target.elements['gardenView'].checked,
        promoCode: formData.get('promoCode'),
        stayDuration: parseInt(formData.get('stayDuration')),
        checkInDate: formData.get('checkInDate'),
        checkOutDate: formData.get('checkOutDate')
    };
  
    let cost = 0;
    switch (bookingData.roomType) {
        case 'single':
            cost += 25000 * bookingData.numberOfRooms;
            break;
        case 'double':
            cost += 35000 * bookingData.numberOfRooms;
            break;
        case 'triple':
            cost += 40000 * bookingData.numberOfRooms;
            break;
    }
  
    cost += bookingData.children * 5000;
    if (bookingData.extraBed) cost += 8000;
    if (bookingData.promoCode === 'Promo123') cost *= 0.95; // 5% discount
  
    bookingData.totalCost = cost;
  
    localStorage.setItem('hotelBooking', JSON.stringify(bookingData));
    displayBookingDetails(bookingData);
    updateLoyaltyPoints(bookingData.numberOfRooms);
  });
  

  function displayBookingDetails(bookingData) {
    document.getElementById('bookingDetails').innerHTML = `
        <p>Name: ${bookingData.firstName} ${bookingData.lastName}</p>
        <p>Email: ${bookingData.email}</p>
        <p>Phone: ${bookingData.phone}</p>
        <p>Room Type: ${bookingData.roomType}</p>
        <p>Number of Rooms: ${bookingData.numberOfRooms}</p>
        <p>Adults: ${bookingData.adults}</p>
        <p>Children: ${bookingData.children}</p>
        <p>Extra Bed: ${bookingData.extraBed ? 'Yes' : 'No'}</p>
        <p>Pool View: ${bookingData.poolView ? 'Yes' : 'No'}</p>
        <p>Garden View: ${bookingData.gardenView ? 'Yes' : 'No'}</p>
        <p>Stay Duration: ${bookingData.stayDuration} days</p>
        <p>Check-in Date: ${bookingData.checkInDate}</p>
        <p>Check-out Date: ${bookingData.checkOutDate}</p>
        <p>Total Cost: ${bookingData.totalCost} LKR</p>
    `;
  }
  
  document.getElementById('addToFavorites').addEventListener('click', function() {
    const savedBooking = localStorage.getItem('hotelBooking');
    if (savedBooking) {
        localStorage.setItem('favoriteHotelBooking', savedBooking);
        displayFavoriteDetails(JSON.parse(savedBooking));
    } else {
        alert("No current booking to add to favorites.");
    }
  });
  
  
  function displayFavoriteDetails(favoriteData) {
    document.getElementById('favoriteDetails').innerHTML = `
        <p><strong>Favorite Booking</strong></p>
        <p>Name: ${favoriteData.firstName} ${favoriteData.lastName}</p>
        <p>Email: ${favoriteData.email}</p>
        <p>Phone: ${favoriteData.phone}</p>
        <p>Room Type: ${favoriteData.roomType}</p>
        <p>Number of Rooms: ${favoriteData.numberOfRooms}</p>
        <p>Adults: ${favoriteData.adults}</p>
        <p>Children: ${favoriteData.children}</p>
        <p>Extra Bed: ${favoriteData.extraBed ? 'Yes' : 'No'}</p>
        <p>Pool View: ${favoriteData.poolView ? 'Yes' : 'No'}</p>
        <p>Garden View: ${favoriteData.gardenView ? 'Yes' : 'No'}</p>
        <p>Stay Duration: ${favoriteData.stayDuration} days</p>
        <p>Check-in Date: ${favoriteData.checkInDate}</p>
        <p>Check-out Date: ${favoriteData.checkOutDate}</p>
        <p>Total Cost: ${favoriteData.totalCost} LKR</p>
    `;
  }
  
  
  document.getElementById('checkLoyalty').addEventListener('click', function() {
    const savedBooking = localStorage.getItem('hotelBooking');
    if (savedBooking) {
        const bookingData = JSON.parse(savedBooking);
        updateLoyaltyPoints(bookingData.numberOfRooms);
    } else {
        alert("No booking found to calculate loyalty points.");
    }
  });
  
  function updateLoyaltyPoints(numberOfRooms) {
    let loyaltyPoints = 0;
    if (numberOfRooms > 3) {
        loyaltyPoints = 20 * numberOfRooms;
    }
  
    localStorage.setItem('loyaltyPoints', loyaltyPoints);
    displayLoyaltyPoints(loyaltyPoints);
  }
  
  function displayLoyaltyPoints(loyaltyPoints) {
    document.getElementById('loyaltyPoints').innerHTML = `You have ${loyaltyPoints} loyalty points.`;
  }

  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('bookDiving').addEventListener('click', function() {
        document.getElementById('divingForm').style.display = 'block';
    });

    document.getElementById('divingBookingForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const divingData = {
            customerType: formData.get('customerType'),
            adultsForDiving: parseInt(formData.get('adultsForDiving')),
            kidsForDiving: parseInt(formData.get('kidsForDiving')),
            needGuide: event.target.elements['needGuide'].checked
        };

        let divingCost = 0;
        if (divingData.customerType === 'local') {
            divingCost += divingData.adultsForDiving * 5000; // Local adults
            divingCost += divingData.kidsForDiving * 2000; // Local kids
        } else {
            divingCost += divingData.adultsForDiving * 10000; // Foreign adults
            divingCost += divingData.kidsForDiving * 5000; // Foreign kids
        }

        if (divingData.needGuide) {
            divingCost += divingData.adultsForDiving * 1000; // Guide for adults
            divingCost += divingData.kidsForDiving * 500; // Guide for kids
        }

        divingData.totalCost = divingCost;

        localStorage.setItem('divingBooking', JSON.stringify(divingData));
        displayDivingBookingDetails(divingData);
    });

    function displayDivingBookingDetails(divingData) {
        document.getElementById('divingBookingDetails').innerHTML = `
            <p>Customer Type: ${divingData.customerType}</p>
            <p>Number of Adults: ${divingData.adultsForDiving}</p>
            <p>Number of Kids: ${divingData.kidsForDiving}</p>
            <p>Guide Required: ${divingData.needGuide ? 'Yes' : 'No'}</p>
            <p>Total Diving Cost: ${divingData.totalCost} LKR</p>
        `;
    }
    
    

  

  
  // Load and display booking data and loyalty points from local storage on page load
  window.onload = function() {
    const savedBooking = localStorage.getItem('hotelBooking');
    if (savedBooking) {
        displayBookingDetails(JSON.parse(savedBooking));
    }
  
    const favoriteBooking = localStorage.getItem('favoriteHotelBooking');
    if (favoriteBooking) {
        displayFavoriteDetails(JSON.parse(favoriteBooking));
    }
  
    const savedLoyaltyPoints = localStorage.getItem('loyaltyPoints');
    if (savedLoyaltyPoints) {
        displayLoyaltyPoints(savedLoyaltyPoints);
    }
  
    // Load and display saved diving booking data from local storage on page load
    const savedDivingBooking = localStorage.getItem('divingBooking');
    if (savedDivingBooking) {
        displayDivingBookingDetails(JSON.parse(savedDivingBooking));
    }

    
  };

});
  
  
document.addEventListener('DOMContentLoaded', function() {
    const currentDate = new Date().toISOString().split('T')[0]; // current date in YYYY-MM-DD format

    // check-in date field to display the current date and disable past dates
    const checkInDateField = document.getElementById('checkInDateField');
    checkInDateField.setAttribute('min', currentDate);
});


document.addEventListener('DOMContentLoaded', function() {
    const currentDate = new Date().toISOString().split('T')[0]; 


    // check-out date field to disable current and previous dates
    const checkOutDateField = document.getElementById('checkOutDateField');
    checkOutDateField.setAttribute('min', currentDate); // Disable current date

    checkInDateField.addEventListener('input', function() {
        checkOutDateField.setAttribute('min', this.value); // Disable previous dates based on Check-in date
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const currentDate = new Date(); 
    currentDate.setDate(currentDate.getDate() + 1); // Setting the  date to the next day

    const minDate = currentDate.toISOString().split('T')[0]; // Format the minimum date in YYYY-MM-DD

    // Setting the check-out date field to disable previous and current dates
    const checkOutDateField = document.getElementById('checkOutDateField');
    checkOutDateField.setAttribute('min', minDate);
});



document.addEventListener('DOMContentLoaded', function() {
    const currentDate = new Date(); 
    currentDate.setDate(currentDate.getDate() + 1); //  the minimum date to the next day

    const minDate = currentDate.toISOString().split('T')[0]; // Format the minimum date in YYYY-MM-DD

    // check-out date field to disable previous and current dates
    const checkOutDateField = document.getElementById('checkOutDateField');
    checkOutDateField.setAttribute('min', minDate);
});

 // Adding custom JavaScript validation
 document.getElementById('hotelForm').addEventListener('submit', function(event) {
    const emailField = document.getElementById('emailField');
    const email = emailField.value.trim();

    if (!isValidEmail(email)) {
        event.preventDefault(); // Prevent form submission if email is invalid
        alert('Please enter a valid email address.');
        emailField.focus();
    }
});

// Function to validate email format using regular expression
function isValidEmail(email) {
    const emailRegex = "a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}";
    return emailRegex.test(email);

}
