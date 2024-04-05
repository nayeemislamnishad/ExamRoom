let totalCount = 0; 
let answersSubmitted = false; // Flag to track whether answers have been submitted
let countdownTimer; // Variable to store the countdown timer

function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    countdownTimer = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(countdownTimer);
            submitAnswers();
        }
    }, 1000);
}

function generateAnswerSheet() {
    
    const questionNumber = document.getElementById('questionNumber').value;
    const timerDuration = document.getElementById('timerDuration').value;
    
    let answerSheetHTML = '<h2>OMR Answer Sheet</h2>';
    for (let i = 1; i <= questionNumber; i++) {
        answerSheetHTML += `<div id="question${i}"><strong> ${i}:</strong> `;
        for (let j = 0; j < 4; j++) {
            const option = String.fromCharCode(97 + j); // Convert ASCII code to letters 'a', 'b', 'c', 'd'
            answerSheetHTML += `<div class="option" onclick="selectOption(this, '${option}', ${i})">${option}</div>`;
        }
        answerSheetHTML += `</div>`;
    }
    document.getElementById('answerSheet').innerHTML = answerSheetHTML;

    hideAll();
    
    // Start the timer when generating the answer sheet
    const timerDisplay = document.getElementById('timer');
    startTimer(timerDuration * 60, timerDisplay); // Convert minutes to seconds
    
    totalCount = parseInt(questionNumber);
}

function selectOption(option, letter, questionNumber) {
    if (answersSubmitted) return; // Prevent selection after answers have been submitted

    const options = option.parentNode.querySelectorAll('.option');
    options.forEach(opt => opt.classList.remove('selected'));
    option.classList.add('selected');
    console.log(`Selected option ${letter} for Question ${questionNumber}`);
}




    let tTaArray = [0]; // Declare tTaArray at the global scope to store tTa values

function submitAnswers() {
    
    const idToHide = document.getElementById('submittext');
idToHide.style.display = 'none';
    
    if (answersSubmitted) return; // Prevent submitting answers multiple times
    answersSubmitted = true; // Set flag to true after answers have been submitted

    clearInterval(countdownTimer); // Stop the countdown timer

    const selectedOptions = document.querySelectorAll('.option.selected');
    const give_correct_ans = "dcabaacdaccda";
    const correctAnswers = give_correct_ans.split('');

    let totalMarks = 0;

    // Calculate total marks and store tTa values in tTaArray
    selectedOptions.forEach((option, index) => {
        const selectedLetter = option.textContent;
        const correctLetter = correctAnswers[index];
        if (selectedLetter === correctLetter) {
            option.classList.add('correct');
            totalMarks++; // Increment totalMarks for each correct answer
            let tTa = totalMarks; // Calculate tTa
            tTaArray.push(tTa); // Store tTa in tTaArray
        } else {
            option.classList.add('incorrect');
        }
        option.classList.remove('selected'); // Remove the blue selector
    });
    
    console.log(tTaArray);
    
// Assuming tTaArray is your array
const lastElement = tTaArray[tTaArray.length - 1]; // Accessing the last element
console.log(lastElement); // Displaying the last element in the console

    
    const lastElementDisplay = document.createElement('div');
    lastElementDisplay.textContent = "Right: " + lastElement +"/" + totalCount;
    lastElementDisplay.classList.add('last-element-display');

    // Insert the created element into the answer sheet container
    const answerSheetContainer = document.getElementById('answerSheet');
    answerSheetContainer.appendChild(lastElementDisplay);

    
    
    
    
    // Disable further selection of options
    const options = document.querySelectorAll('.option');
    options.forEach(opt => opt.onclick = null);

    // Display the correct answers for each question
    for (let i = 1; i <= correctAnswers.length; i++) {
        const correctLetter = correctAnswers[i - 1];
        const questionDiv = document.getElementById(`question${i}`);
       questionDiv.innerHTML += `<div class="correct-answer">Correct Answer: ${correctLetter}</div>`;
    }
    
    
}


function hideAll(){
    // Assuming the ID of the div you want to hide is "myDiv"
//const divToHide = document.getElementById('questionNumber');
//divToHide.style.display = 'none';

    
    
    
    // Array of IDs of divs to hide
const divIdsToHide = ['questionNumber', 'timerDuration','generatedText','questionnumbertext','timetext','headtext'];

// Loop through each ID and hide the corresponding div
divIdsToHide.forEach(id => {
    const divToHide = document.getElementById(id);
    if (divToHide) { // Check if the element exists
        divToHide.style.display = 'none';
    }
});

    
    
    
    
    
    
    
              }
          
