document.addEventListener('DOMContentLoaded', function() {
    const numSectionsInput = document.getElementById('numSections');
    const sectionInputsContainer = document.querySelector('.sectionInputsContainer');
    const balusterSpaceInput = document.getElementById('balusterSpace');
    const calcsDiv = document.getElementById('calcs');
    const errorsDiv = document.getElementById('errors');

    // Generate input fields for section lengths based on numSections
    numSectionsInput.addEventListener('input', updateSectionInputs);

    function updateSectionInputs() {
        const numSections = parseInt(numSectionsInput.value) || 0;
        sectionInputsContainer.innerHTML = ''; // Clear previous inputs

        for (let i = 1; i <= numSections; i++) {
            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'section-input';

            sectionDiv.innerHTML = `
                <label for="sectionLength${i}">Length of Section ${i} (inches):</label>
                <input type="number" id="sectionLength${i}" name="sectionLength${i}" min="0" step="0.01" required>
            `;
            sectionInputsContainer.appendChild(sectionDiv);
        }

        calculateBalusters(); // Recalculate on each update
    }

    // Calculate the balusters whenever an input changes
    document.getElementById('calculatorForm').addEventListener('input', calculateBalusters);

    function calculateBalusters() {
        const numSections = parseInt(numSectionsInput.value) || 0;
        const balusterSpace = parseFloat(balusterSpaceInput.value) || 0;

        // Validate baluster space
        if (isNaN(balusterSpace) || balusterSpace <= 0 || balusterSpace > 4) {
            errorsDiv.innerHTML = '<p>Please enter a valid space between balusters (maximum 4").</p>';
            calcsDiv.innerHTML = '<p>Please enter a valid space between balusters (maximum 4").<p>';
            errorsDiv.style.border = '3px double #900';
            return;
        } else {
            errorsDiv.innerHTML = '';
            errorsDiv.style.border = 'none';
        }

        let totalBalusters = 0;
        let hasInvalidSection = false;

        // Iterate over each section to calculate balusters
        for (let i = 1; i <= numSections; i++) {
            const sectionLength = parseFloat(document.getElementById(`sectionLength${i}`).value) || 0;

            if (sectionLength <= 0) {
                hasInvalidSection = true;
                break;
            }

            const balusterWidth = 0.75; // Fixed baluster width (3/4")
            const balusterSpacing = balusterWidth + balusterSpace;
            const numBalusters = Math.ceil(sectionLength / balusterSpacing -1);

            totalBalusters += numBalusters;
        }

        if (hasInvalidSection) {
            errorsDiv.innerHTML = '<p>All section lengths must be greater than zero.</p>';
            calcsDiv.innerHTML = '<p>All section lengths must be greater than zero.</p>';
            errorsDiv.style.border = '3px double #900';
        } else {
            calcsDiv.innerHTML = `<h1 class="resulttext">Total Number of Balusters = <br><span class="resultspan">${totalBalusters}</span></h1>`;
        }
    }
});





