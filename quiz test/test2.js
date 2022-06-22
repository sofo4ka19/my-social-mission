/* All answer options */
const option1 = document.querySelector('.option1'),
	  option2 = document.querySelector('.option2'),
	  option3 = document.querySelector('.option3');

/* All our options */
const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question'); //сам вопрос

const numberOfQuestion = document.getElementById('number-of-question'), //номер вопроса
	  numberOfAllQuestions = document.getElementById('number-of-all-questions'); //кол-во всех вопросов

let indexOfQuestion, //индекс текщуего вопроса
	indexOfPage = 0; //индекс страницы

const answersTracker = document.getElementById('answers-tracker'); //обертка для трекера
const btnNext = document.getElementById('btn-next'); //кнопка далее

let score = 0; //итоговый результат викторины

const correctAnswer = document.getElementById('correct-answer'), //кол-во правильных ответов
	  numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'), //кол-во всех вопросов (в модальном окне)
	  btnTryAgain = document.getElementById('btn-try-again'); //кнопка "начать заново"

const quiz_over_modal = document.querySelector('.quiz-over-modal'),// modal window
      textResult = document.getElementById('text-result');

const questions = [
	/*1*/
    {
		question: 'На мой взгляд, контролировать других людей и вести учет — скучное занятие.',
		scores:[0, 1, 2,]
	},
	/*2*/
	{
		question: 'Я лучше буду заниматься финансовыми операциями, чем выступать на сцене.',
		scores:[2, 1, 0,]
	},
	/*3*/
    {
		question: 'Никогда точно не рассчитываю время, которое трачу на дорогу в школу. Для меня это кажется невозможным.',
		scores:[0, 1, 2,]
	},
	/*4*/
    {
		question: 'Риск — мое второе «Я».',
		scores:[0, 1, 2,]
	},
	/*5*/
    {
		question: 'Терпеть не могу беспорядка.',
		scores:[2, 1, 0,]
	},
	/*6*/
    {
		question: 'Охотно проведу свободное время за книгой о достижениях в сфере науки.',
		scores:[2, 1, 0,]
	},
	/*7*/
    {
		question: 'Мои записи обычно не слишком хорошо структурированы и организованы.',
		scores:[0, 1, 2,]
	},
	/*8*/
    {
		question: 'Я всегда откладываю часть денег на потом, не тратя все и сразу.',
		scores:[2, 1, 0,]
	},
	/*9*/
    {
		question: 'У меня на рабочем столе скорее беспорядок, чем безупречный порядок.',
		scores:[0, 1, 2,]
	},
	/*10*/
    {
		question: 'Люблю выполнять задания согласно инструкции, или по четко указанным алгоритмам.',
		scores:[2, 1, 0,]
	},
	/*11*/
    {
		question: 'Если бы я был коллекционером, то хранил все упорядочено: в папках, ящиках, на полочках и т. п.',
		scores:[2, 1, 0,]
	},
	/*12*/
    {
		question: 'Я раздражаюсь, когда нужно навести порядок в комнате, упорядочить или систематизировать что-то.',
		scores:[0, 1, 2,]
	},
	/*13*/
    {
		question: 'Люблю работать за компьютером — набирать и оформлять тексты, делать расчеты.',
		scores:[2, 1, 0,]
	},
	/*14*/
    {
		question: 'Прежде чем приступить к делу, я подробно продумаю свои действия.',
		scores:[2, 1, 0,]
	},
	/*15*/
    {
		question: 'Считаю, что черпать информацию из таблиц и графиков — удобно и быстро.',
		scores:[2, 1, 0,]
	},
	/*16*/
    {
		question: 'Я в восторге от игр, где можно рассчитать шансы на победу и сделать осторожный, но точный ход.',
		scores:[2, 1, 0,]
	},
	/*17*/
    {
		question: 'Изучая иностранный язык, нужно начать с грамматики, а не получать разговорный опыт без знания грамматических основ.',
		scores:[2, 1, 0,]
	},
	/*18*/
    {
		question: 'Я всегда стараюсь всесторонне изучить проблему, с которой сталкиваюсь (поискать информацию в сети, прочитать необходимую литературу, проконсультироваться со специалистами).',
		scores:[2, 1, 0,]
	},
	/*19*/
    {
		question: 'У меня есть дневник, в котором я планирую свои дела на несколько суток вперед.',
		scores:[2, 1, 0,]
	},
	/*20*/
    {
		question: 'Я не пропускаю возможности посмотреть выпуск политических и экономических новостей.',
		scores:[2, 1, 0,]
	},
	/*21*/
    {
		question: 'Я ответственно отношусь к своему здоровью',
		scores:[2, 1, 0,]
	},
	/*22*/
    {
		question: 'Я выполняю работу в последний момент.',
		scores:[0, 1, 2,]
	},
	/*23*/
    {
		question: 'Попользовавшись книгой, я всегда ставлю ее на место.',
		scores:[0, 1, 2,]
	},
	/*24*/
    {
		question: 'Ложась в постель, я точно знаю, чем буду заниматься завтра.',
		scores:[2, 1, 0,]
	},
	/*25*/
    {
		question: 'В своих действиях и словах руководствуюсь принципом «Семь раз отмерь, один — отрежь».',
		scores:[2, 1, 0,]
	},
	/*26*/
    {
		question: 'Если меня ждет ответственное дело, я непременно составлю план его выполнения.',
		scores:[2, 1, 0,]
	},
	/*27*/
    {
		question: 'После долгих посиделок с друзьями я мою посуду уже утром.',
		scores:[2, 1, 0,]
	},
];
const answers = ['Да','Трудно ответить','Нет'];
const textOfResult = [
    "Ты хочешь быть безупречным во всем, чего требуешь и от окружающих. Поскольку Тебя интересуют различные знаковые системы (цифры, коды, естественные и искусственные языки), Ты наверняка сможешь найти себя в профессиях, связанных с созданием документов, анализом и преобразованием текстов. Корректор, технический редактор, нотариус, секретарь — вот те специальности, которые Тебе с легкостью удастся освоить в вузе. Также Ты можешь стать незаменимым сотрудником бухгалтерии, отличным экономистом, демографом, замечательным программистом, картографом или математиком.",
	"Тебя часто захватывает то, что другим кажется скучным и однообразным. Чертежное дело, работа с бумагами, буквами и расчетами, контроль и анализ — занятия, в которых Тебе не будет равных среди коллег. Часто люди Твоего типа — прекрасные бизнесмены и руководители. Однако Тебе пора учиться расслабляться, постоянное самосовершенствование истощает и не дает ощутить все радости жизни.", 
    "Люди Твоего типа внимательны и собраны. Обычно им подходят профессии, которые требуют превосходной памяти, точных расчетов, совершенного знания документации и законов. Юрист, таможенный декларатор, статистик, чертежник, экономист и специалист по компьютерным технологиям — профессии, в которых Ты можешь достичь значительных успехов. Однако помни, что соответствующие им сферы деятельности требуют усидчивости, сосредоточенности и способности абстрактно мыслить. Обрати внимание и на профессии первого блока (от 49 до 60 баллов), но в Твоем случае работа со знаковыми системами может быть лишь частью другой, основной профессии (например, интенсивное использование иностранных языков, ведение документации, расчеты — в работе финансиста, менеджера и журналиста).",
    "Интерес к знаковым системам у Тебя мало выражен. Однако Ты способен оперативно и тщательно выполнять свои обязанности. К тому же, дисциплина и требовательность к себе помогут покорить любую вершину, было бы желание. Гибкость и скорость принятия решений способствуют достижению наилучшего результата. Тебе подойдет работа геолога, мелиоратора, эколога, инженера, гидролога, конструктора, ученого. А еще стоит подумать о профессии ветеринара или агронома. Знаковые системы несколько «суховаты» для Тебя. Поэтому, выбирая профессию, ориентируйся на собственные увлечения и интересы.",
    "Документы, знаки и расчеты Тебя точно не интересуют. Люди Твоего типа безупречные импровизаторы, умеют активно действовать и быстро принимать решения, нестандартные и непредсказуемые, что характерно для представителей творческих профессий. Реклама, дизайн, журналистика и психология — сферы, в которых Ты будешь чувствовать себя как рыба в воде. А еще изТебя может выйти безупречный учитель, продюсер или воспитатель.",
    "Такой нестандартной личности, как Ты, просто необходимо развивать силу воли, выдержку и дисциплинированность, ведь устраиваясь на работу Ты то и дело будеш творить то, что «хочется», а не то, чего требует руководство. Работа, предполагающая жесткое выполнения плана и соблюдение сроков, Тебе вряд ли подойдет. Профессии художника, фотографа, артиста, скульптора или поэта — из Твоей категории. Подумай также и о специальности дизайнера, режиссера, актера или дирижера.",        
]

numberOfAllQuestions.innerHTML = questions.length; //выводим кол-во вопросов

const load = () => {
	question.innerHTML = questions[indexOfQuestion].question;
	option1.innerHTML = answers[0]
	option2.innerHTML = answers[1]
	option3.innerHTML = answers[2]
	numberOfQuestion.innerHTML = indexOfPage + 1;
	indexOfPage++
};

let completedAnswers = [] // массив для уже заданных вопросов

const randomQuestion = () => {
	let randomNumber = Math.floor(Math.random() * questions.length);
	let hitDuplicate = false; //якорь для проверки одинаковых вопросов

	if(indexOfPage == questions.length) {
		quizOver();
	} else {
		if (completedAnswers.length>0) {
			completedAnswers.forEach(item => {
				if (item == randomNumber) {
					hitDuplicate = true;
				}
			});
			if (hitDuplicate) {
				randomQuestion();
			} else {
				indexOfQuestion = randomNumber;
				load();
			}
		}
		if (completedAnswers.length == 0) {
			indexOfQuestion = randomNumber;
			load();
		}
	}
	completedAnswers.push(indexOfQuestion);
}

const checkAnswer = el => {
    score += questions[indexOfQuestion].scores[el.target.dataset.id];
	updateAnswerTracker();
    // if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer){
	// 	el.target.classList.add('correct');
	// 	updateAnswerTracker('correct');
	// 	score++;
	// }
	// else{
	// 	el.target.classList.add('wrong');
	// 	updateAnswerTracker('wrong');
	// }
	disabledOptions();
}

for(option of optionElements) {
	option.addEventListener('click', e => checkAnswer(e));
}

const disabledOptions = () => {
	optionElements.forEach(item => {
		item.classList.add('disabled');
		if(item.dataset.id == questions[indexOfQuestion].rightAnswer){
			item.classList.add('correct');
		}
	})
}

const enableOptions = () => {
	optionElements.forEach(item => {
		item.classList.remove('disabled', 'correct', 'wrong')
	})
}

const answerTracker = () => {
	questions.forEach(() => {
		const div = document.createElement('div');
		answersTracker.appendChild(div);
	})
} 

const updateAnswerTracker = () => {
	answersTracker.children[indexOfPage - 1].classList.add(`correct`);
}

const validate = () => {
	if (!optionElements[0].classList.contains('disabled')) {
		alert('Выбирите один из вариантов ответа')
	}
	else{
		randomQuestion();
		enableOptions();
	}
}

const scoreCheck = () => {
    (score >= 48) ? (textResult.innerHTML = textOfResult[0]) : 
    (score < 48 && score > 36) ? (textResult.innerHTML = textOfResult[1]) : 
    (score <= 36 && score > 24) ? (textResult.innerHTML = textOfResult[2]) : 
    (score <= 24 && score > 13) ? (textResult.innerHTML = textOfResult[3]) : 
    (score <= 12) ? (textResult.innerHTML = textOfResult[4]) : (alert("Ya obosralsya"))
}

const quizOver = () => {
	quiz_over_modal.classList.add('active');
	correctAnswer.innerHTML = score;
    scoreCheck();
	numberOfAllQuestions2.innerHTML = 54;
};

const tryAgain = () => {
	window.location.reload();
}

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
	validate();
})

window.addEventListener('load', () => {
	randomQuestion();
	answerTracker();
})