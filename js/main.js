// =============================================== Selector Elements For Js
const api_url = "https://raw.githubusercontent.com/ProNabowy/TechGuide/main/data.json";

let count = document.querySelector(".count");

let question = document.querySelector(".questions");

let answers = document.querySelector(".answers");

let btn = document.querySelector(".submit");

let spans = document.querySelector(".bull");

let header = document.querySelector(".head");

let questionNumber = document.querySelector(".queNum");

let increase_count = 0;

let objectIndex = 0;

let sameSelect = 0;

let questNum = 0;

let quesIs = 0;

let scoreNow = document.querySelector(".now");

let scoreFrom = document.querySelector(".from");
// =============================================== Create function To Get Data From Json Fill

class Quiz
{
    // ======================================= Create Function To add answer and questions  ======================================= 
    darw_answers(i, data)
    {
        // =======================================  create div to add input and label ======================================= 

        let div = document.createElement("div");

        let input = document.createElement("input");

        input.name = "input";

        input.classList.add("answ");

        input.type = "radio"

        input.id = `answer_${i + 1}`;

        input.textContent = `answer_${i + 1}`;

        input.dataset.answer = data[`answer_${i + 1}`];

        //=======================================  Create Lable to add answer at it ======================================= 

        let label = document.createElement("label");

        label.htmlFor = `answer_${i + 1}`;

        label.textContent = data[`answer_${i + 1}`];

        // ======================================= add checked attr to first input by default ======================================= 

        if (i == 0) input.checked = true;

        // ======================================= append input and label to main div ======================================= 

        div.append(input);
        div.append(label);

        // ======================================= append div to answers div ======================================= 

        answers.append(div);
    };
    addDataToPage(data, count)
    {

        if (objectIndex < count)
        {

            question.innerHTML = "";

            questionNumber.innerHTML = quesIs;

            answers.innerHTML = "";

            let h2 = document.createElement("h3");

            h2.textContent = data.title;

            h2.classList.add("question");

            // ======================================= append h2 to main div ======================================= 

            question.append(h2);

            for (let i = 0; i < 4; i++) this.darw_answers(i, data);

        };

    };

    // ======================================= Create Function To add Poups to main page ======================================= 

    setPoups(count)
    {

        for (let i = 0; i < count; i++)
        {
            let span = document.createElement("span");

            span.classList.add("span");

            // ======================================= append span to div ======================================= 

            spans.append(span);
        };

    }

    handelScore(count)
    {

        scoreNow.innerHTML = increase_count;

        scoreFrom.innerHTML = count;

    }

    checkAnswr(obj, count)
    {

        if (objectIndex < count)
        {

            let answers = document.querySelectorAll(".answ");
            let ansCheck;

            for (let i = 0; i < answers.length; i++) if (answers[i].checked) ansCheck = answers[i].dataset.answer;

            let correctAnswer = obj["right_answer"];

            // ======================================= Check if answer right or not ======================================= 

            if (ansCheck === correctAnswer) increase_count++;

            for (let i = 0; i < answers.length; i++) if (answers[i].checked) if (answers[i].dataset.answer === obj.answer_1) sameSelect++;


        };
    };

    addActiveToPoups(increase_count, count)
    {

        let spans = document.querySelectorAll(".span");

        if (objectIndex < count + 1) for (let i = 0; i < increase_count; i++) spans[i].classList.add("active");

    };
    remove_element_when_user_get_at_end(objectIndex, arrLength, increase_count)
    {
        if (objectIndex == arrLength)
        {
            btn.remove();

            question.remove();

            answers.remove();

            this.darw_result_ui(increase_count, arrLength);

        };
    };

    darw_result_ui(score, count)
    {

        let div = document.createElement("div");

        div.classList = "result_ui";

        if (score <= 5) div.innerHTML = `Your Score Is Very <span style="color:red;">Bad</span> Bro ${score}`;
        if (score >= 6 && score <= 10) div.innerHTML = `Your Score Is ${score} Score is <span style="color: red;">Weak</span>`, this.restartQuiz();
        if (score >= 11 && score <= 15) div.innerHTML = `Your Score Is ${score} You Should To Foucs more than it`, this.restartQuiz();
        if (score >= 16 && score < 20) div.innerHTML = `Your Score Is ${score} <span style="Green: red;">Good</span> Bro`, playAgain();
        if (score >= 21 && score < 25) div.innerHTML = `Your Score Is ${score} <span style="color: blue;">Fantastic</span> Bro`, playAgain();
        if (score == count) div.innerHTML = `Your Score  ${score} Perfect Bro You Don't Have any Wrong answer <br> <span class="cong">congratulations</span>`, playAgain(), animait();

        // ======================================= append div to body ======================================= 

        header.after(div);

    };
    not_verify_human_ui()
    {

        let div = document.createElement("div");

        div.classList.add("same-select");

        div.innerHTML = `Hey Man Sorry You Can't Select the same option all time`;

        let close = document.createElement("span");

        close.classList.add("close");

        close.innerHTML = "X";

        div.append(close);

        div.classList.add("show");

        close.classList.add("show");

        document.body.append(div);

        btn.remove();

        // ========================== Create Event to Close when user click on span ============================ 

        close.addEventListener("click", _ => window.location.reload());

    };

    restartQuiz()
    {

        const button = document.createElement("button");

        button.classList.add("again");

        button.innerHTML = "Again";

        document.querySelector(".app").append(button);

        // ======================================= Create Event Click to relaod page ======================================= 

        button.addEventListener("click", _ => window.location.reload());

    };

    verify_human()
    {
        if (sameSelect == 10 && questNum == 10) this.not_verify_human_ui(), this.restartQuiz();;
        for (let i = 9; i < 12; i++) if (sameSelect == i && questNum == 12) this.not_verify_human_ui(), this.restartQuiz();
        for (let i = 10; i < 13; i++) if (sameSelect == i && questNum == 13) this.not_verify_human_ui(), this.restartQuiz();
        for (let i = 11; i < 14; i++) if (sameSelect == i && questNum == 14) this.not_verify_human_ui(), this.restartQuiz();
        for (let i = 12; i < 15; i++) if (sameSelect == i && questNum == 15) this.not_verify_human_ui(), this.restartQuiz();
    }
    questions_category(data)
    {
        if (window.location.pathname.includes("html_questions.html")) data = data[0].html;
        if (window.location.pathname.includes("css_questions.html")) data = data[0].css;
        if (window.location.pathname.includes("JavaScript_questions")) data = data[0].js;

        return data;
    };

    get_set_data_to_ui()
    {

        let myJson = new XMLHttpRequest();

        myJson.onreadystatechange = function ()
        {

            if (myJson.readyState === 4 && myJson.status === 200)
            {
                let data = JSON.parse(myJson.responseText);
                data = quiz.questions_category(data);

                let arr = [];

                // =======================================  Create Loop to get random questions ======================================= 

                for (let i = 0; i < 30; i++) arr.push(data[Math.trunc(Math.random() * data.length)]);

                let arrLength = arr.length;

                count.innerHTML = arrLength;

                // ======================  Create Function To add answer and questions =================== 

                quiz.addDataToPage(arr[objectIndex], arrLength);

                // ======================================= Create Funtion to Set bulltes ======================================= 

                quiz.setPoups(arrLength);

                quiz.handelScore(arrLength);

                // ======================================= Create click event to btn ======================================= 

                btn.addEventListener("click", _ =>
                {

                    questNum++;

                    quesIs++;

                    quiz.checkAnswr(arr[objectIndex], arrLength);

                    // increment objectIndex after checking answer to check if user select more then 10 items at the first answer

                    objectIndex++;

                    quiz.addDataToPage(arr[objectIndex], arrLength);

                    quiz.addActiveToPoups(objectIndex, arrLength);

                    quiz.handelScore(arrLength);

                    // =======================================  Remove Question and btn and answer From Page =======================================  
                    quiz.remove_element_when_user_get_at_end(objectIndex, arrLength, increase_count);

                    // =======================================  Check If User Chose the First value one more time =======================================  
                    quiz.verify_human(sameSelect, questNum);
                });

            }

        };


        myJson.open("Get", api_url);

        myJson.send();

    };

}
const quiz = new Quiz();


quiz.get_set_data_to_ui();



// ======================================= Start Canvas accses ======================================= 

let c = document.querySelector("canvas");

let ctx = c.getContext("2d");

let width = this.innerWidth;
let height = this.innerHeight;
// ======================================= Set Canvas Width ======================================= 

c.width = width;
c.height = height;

// ======================================= Set Size When Window Resize ======================================= 

this.addEventListener("resize", _ =>
{

    const width = this.innerWidth;
    const height = this.innerHeight;
    // =======================================  Set Canvas Width ======================================= 

    c.width = width;
    c.height = height;

});

// =======================================  Set Sitteing  ======================================= 

let counter = 0;
let arr = [];

// ========================= Create Class To Get Data From It ======================================= 

// i'm useing OOP To Create a lot Of Class to use it easy 

class Particle
{

    constructor(x, y, size, speedX, speedY, color)
    {

        this.x = c.width / 1.8;

        this.y = c.height / 2;

        this.size = Math.random() * 25;

        this.speedX = Math.random() * 3 - 1.5;

        this.speedY = Math.random() * 3 - 1.5;

        this.color = 'hsl(' + counter + ', 100% , 50%)';

    };

    update()
    {

        this.x += this.speedX;

        this.y += this.speedY;

        if (this.size > 0.3) this.size -= 0.1;
    }
    darw()
    {

        ctx.beginPath();

        ctx.save();

        ctx.fillStyle = this.color;

        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        ctx.fill();

        ctx.restore();

    }

};

//======================================================================== Create Funtion To push shapes in array

let pushShapsSmallMedia = function ()
{

    for (let i = 0; i < 1000; i++) arr.push(new Particle);

};
pushShapsSmallMedia();

//======================================================================== Create Function To update And darw Shaps

let updateDarw = function ()
{

    for (let i = 0; i < arr.length; i++)
    {

        arr[i].update();

        arr[i].darw();

        //======================================================================== Hidden Shaps If it less than 0.2

        if (arr[i].size < 0.3)
        {

            arr.splice(i, 1);

            i--;

        }
    };
};

let animait = function ()
{

    ctx.fillStyle = 'rgba(0 , 0 , 0 , 0.3)';

    ctx.fillRect(0, 0, c.width, c.height);

    counter += 2;

    requestAnimationFrame(animait);

    updateDarw();

};

