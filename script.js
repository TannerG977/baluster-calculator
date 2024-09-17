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

        // Grab the number of posts and post size
        let postnum = parseFloat(document.getElementById('postnum').value) || 0;
        let postsize = parseFloat(document.querySelector('input[name="postsize"]:checked').value);
        let a = postnum * postsize;

        // Calculate the remaining length
        let b = railingLength - a;

        // Get baluster width and space
        let balwidth = 0.75; // Fixed value for 3/4" tube
        let balspace = parseFloat(document.querySelector('input[name="balspace"]').value) || 0;

        // Calculate the number of balusters
        let c = balwidth + balspace;
        let balusters = b / c;
        balusters = Math.ceil(balusters);

        // Display results
        if (railingLength === 0 || postnum === 0 || postsize === 0 || a === 0 || b === 0 || c === 0 || balspace === 0 || isNaN(balusters)) {
            errorsDiv.innerHTML = `<h2>***Please Note***</h2>
                                    <p>Sorry, the calculation couldn't run because one of the values input is incorrect. Please make sure you have filled out every field, and use only numeric values.</p>`;
            calcsDiv.innerHTML = '<h2 class="red headbg">Number of balusters: <span>N/A</span></h2>';
            errorsDiv.style.border = '3px double #900';
        } else {
            errorsDiv.innerHTML = '';
            errorsDiv.style.border = 'none';
            calcsDiv.innerHTML = `<h2 class="red headbg">Number of balusters: <span>${balusters}</span></h2>`;
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


