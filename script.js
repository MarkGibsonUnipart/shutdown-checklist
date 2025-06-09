document.addEventListener('DOMContentLoaded', function() {
    // --- 1. DEFINE YOUR EQUIPMENT LIST ---
    // You can customize this list to match your workspace.
    const equipment = [
        "Central Benq",
        "ELO Touch Reception",
        "Sony screens",
        "Power off AV tablet",
        "Sleep Gaming PC",
        "HTC Handsets",
        "3D Printers",
	"Cobot",
	"Workbench Laptop",
	"Workbench scanner",
	"LG screens",
	"ELO Touch Main Hall",
	"Lights Main Hall",
	"Air Con Main Hall",
	"Lights Reception",
	"Air Con Reception"
    ];

    // --- 2. GET REFERENCES TO HTML ELEMENTS ---
    const checklistContainer = document.getElementById('checklist');
    const resetButton = document.getElementById('resetButton');

    // --- 3. FUNCTION TO RENDER THE CHECKLIST ---
    function renderChecklist() {
        // Clear any existing items
        checklistContainer.innerHTML = '';

        // Load saved state from localStorage
        const savedState = JSON.parse(localStorage.getItem('shutdownChecklist')) || {};

        equipment.forEach(item => {
            const isChecked = savedState[item] || false;

            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item');
            if (isChecked) {
                itemDiv.classList.add('checked');
            }

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = item;
            checkbox.checked = isChecked;

            const label = document.createElement('label');
            label.htmlFor = item;
            label.textContent = item;

            itemDiv.appendChild(checkbox);
            itemDiv.appendChild(label);
            checklistContainer.appendChild(itemDiv);

            // Add event listener for changes
            checkbox.addEventListener('change', () => {
                const currentState = JSON.parse(localStorage.getItem('shutdownChecklist')) || {};
                currentState[item] = checkbox.checked;
                localStorage.setItem('shutdownChecklist', JSON.stringify(currentState));

                // Update styling
                if (checkbox.checked) {
                    itemDiv.classList.add('checked');
                } else {
                    itemDiv.classList.remove('checked');
                }
            });
        });
    }

    // --- 4. RESET BUTTON FUNCTIONALITY ---
    resetButton.addEventListener('click', () => {
        // Clear the state in localStorage
        localStorage.removeItem('shutdownChecklist');
        
        // Re-render the checklist to reflect the cleared state
        renderChecklist();
    });

    // --- 5. INITIAL RENDER ---
    // This is called when the page first loads
    renderChecklist();
});