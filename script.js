document.addEventListener('DOMContentLoaded', function() {
    const railingCalcButton = document.getElementById('railingCalc');
    const calcsDiv = document.getElementById('calcs');
    const errorsDiv = document.getElementById('errors');

    railingCalcButton.addEventListener('click', function() {
        // First, make the total feet of railing in inches
        let rlFeet = parseFloat(document.getElementById('rlFeet').value) || 0;
        let rlInches = parseFloat(document.getElementById('rlInches').value) || 0;
        let rlFraction = parseFloat(document.getElementById('rlFraction').value) || 0;
        let railingLength = rlFeet * 12 + rlInches + rlFraction;

        // Calculate Number of Posts with sizes
        let fourbyfour = parseFloat(document.getElementById('fourbyfour').value) * 3.5 || 0;
        let fourinch = parseFloat(document.getElementById('fourinch').value) * 4 || 0;
        let fourandhalf = parseFloat(document.getElementById('fourandhalf').value) * 4.5 || 0;
        let fiveinch = parseFloat(document.getElementById('fiveinch').value) * 5 || 0;
        let sixbysix = parseFloat(document.getElementById('sixbysix').value) * 5.5 || 0;

        // Grab the total number of posts
        let postnum = fourbyfour + fourinch + fourandhalf + fiveinch + sixbysix; // Total number of posts
        
        // Ensure postnum is greater than 1 to prevent division by zero
        if (postnum < 2) {
            errorsDiv.innerHTML = `<h2>***Please Note***</h2>
                                   <p>There must be at least 2 posts to calculate baluster quantity.</p>`;
            calcsDiv.innerHTML = '<h2 class="red headbg">Number of balusters: <span>N/A</span></h2>';
            errorsDiv.style.border = '3px double #900';
            return;
        }

        // Calculate the remaining length available for balusters
        let totalPostWidth = (fourbyfour + fourinch + fourandhalf + fiveinch + sixbysix); // Sum of all post widths
        let avgraillength = railingLength - totalPostWidth;
        
        if (avgraillength <= 0) {
            errorsDiv.innerHTML = `<h2>***Please Note***</h2>
                                   <p>The available railing length is not sufficient to fit the posts.</p>`;
            calcsDiv.innerHTML = '<h2 class="red headbg">Number of balusters: <span>N/A</span></h2>';
            errorsDiv.style.border = '3px double #900';
            return;
        }

        let b = avgraillength / (postnum - 1); // Space between balusters

        // Get baluster width and space
        let balwidth = 0.75; // Fixed value for 3/4" tube
        let balspace = parseFloat(document.querySelector('input[name="balspace"]').value) || 0;

        // Calculate the number of balusters
        let c = balwidth + balspace;
        let balusters = b / c;
        let finalbalusters = balusters * (postnum - 1); // Calculate total balusters

        finalbalusters = Math.ceil(finalbalusters); // Round up to the nearest whole number

        // Display results
        if (railingLength === 0 || postnum === 0 || isNaN(finalbalusters)) {
            errorsDiv.innerHTML = `<h2>***Please Note***</h2>
                                   <p>Sorry, the calculation couldn't run because one of the values input is incorrect. Please make sure you have filled out every field, and use only numeric values.</p>`;
            calcsDiv.innerHTML = '<h2 class="red headbg">Number of balusters: <span>N/A</span></h2>';
            errorsDiv.style.border = '3px double #900';
        } else {
            errorsDiv.innerHTML = '';
            errorsDiv.style.border = 'none';
            calcsDiv.innerHTML = `<h2 class="red headbg">Number of balusters: <span>${finalbalusters}</span></h2>`;
        }

        // Scroll to the bottom of the page
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth' // Optional: smooth scrolling
        });
    });

    // Space between balusters validation
    document.querySelector('input[name="balspace"]').addEventListener('change', function() {
        const space = parseFloat(this.value);
        if (isNaN(space) || space > 4) {
            alert('The maximum allowed space between balusters is 4". Please revise your calculations');
        }
    });
});


