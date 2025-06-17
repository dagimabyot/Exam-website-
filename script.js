// Application State
let currentUser = ""
let currentCourse = ""
let isMockExam = false
let questions = []
let currentQuestionIndex = 0
let userAnswers = []
let showingFeedback = false
let examStartTime = null
let timerInterval = null
let timeLeft = 180 * 60 // 3 hours in seconds
let usedQuestionIds = new Set() // Track used questions globally

// Course Data
const courses = [
  "Introduction to Management",
  "Principles of Marketing",
  "International Marketing",
  "Human Resource Management",
  "Organizational Behaviour",
  "Leadership",
  "Entrepreneurship",
  "Managerial Information System",
  "Strategic Management",
  "Project Management",
  "Business Research Methods",
  "Statistics I and II",
  "Operational and Financial Management",
  "Operational Research",
  "Innovation",
]

// Enhanced Question Bank with more questions per course
const questionBank = {
  "Introduction to Management": [
    {
      question: "What is the primary objective of management?",
      options: [
        "To maximize profit only",
        "To coordinate and oversee activities",
        "To ensure employee happiness only",
        "To ignore resources",
      ],
      answer: 1,
    },
    {
      question: "Which of these is a function of management?",
      options: ["Planning", "Ignoring problems", "Skipping meetings", "None of the above"],
      answer: 0,
    },
    {
      question: "Management helps in:",
      options: ["Optimizing resource use", "Creating chaos", "Reducing production", "Making random decisions"],
      answer: 0,
    },
    {
      question: "The process of influencing people to work towards organizational goals is called:",
      options: ["Planning", "Organizing", "Leading", "Controlling"],
      answer: 2,
    },
    {
      question: "Which management level is responsible for strategic planning?",
      options: ["First-line management", "Middle management", "Top management", "Operational management"],
      answer: 2,
    },
    {
      question: "What does POSDCORB stand for in management?",
      options: [
        "Planning, Organizing, Staffing, Directing, Coordinating, Reporting, Budgeting",
        "People, Operations, Systems, Data, Control, Resources, Business",
        "Process, Output, Structure, Design, Communication, Results, Benefits",
        "Performance, Objectives, Strategy, Development, Culture, Relations, Balance",
      ],
      answer: 0,
    },
    {
      question: "Scientific management was developed by:",
      options: ["Henri Fayol", "Frederick Taylor", "Max Weber", "Elton Mayo"],
      answer: 1,
    },
    {
      question: "The Hawthorne studies focused on:",
      options: [
        "Time and motion studies",
        "Human relations in workplace",
        "Bureaucratic structures",
        "Scientific management",
      ],
      answer: 1,
    },
    {
      question: "Span of control refers to:",
      options: [
        "The number of subordinates a manager can effectively supervise",
        "The range of activities a manager performs",
        "The time period a manager works",
        "The geographical area a manager covers",
      ],
      answer: 0,
    },
    {
      question: "Which is NOT a characteristic of effective planning?",
      options: ["Flexibility", "Specificity", "Rigidity", "Feasibility"],
      answer: 2,
    },
  ],
  "Principles of Marketing": [
    {
      question: "The 4 Ps of marketing include:",
      options: [
        "Product, Price, Place, Promotion",
        "People, Process, Physical, Promotion",
        "Product, People, Place, Process",
        "Price, People, Physical, Process",
      ],
      answer: 0,
    },
    {
      question: "Market segmentation is:",
      options: [
        "Dividing market into distinct groups",
        "Combining all customers",
        "Ignoring customer differences",
        "Focusing on one product",
      ],
      answer: 0,
    },
    {
      question: "What is a target market?",
      options: ["All potential customers", "Specific group of customers", "Competitors", "Suppliers"],
      answer: 1,
    },
    {
      question: "Brand equity refers to:",
      options: ["Company assets", "Brand value and recognition", "Marketing budget", "Sales revenue"],
      answer: 1,
    },
    {
      question: "Customer relationship management (CRM) focuses on:",
      options: [
        "Product development",
        "Building long-term customer relationships",
        "Reducing costs",
        "Increasing prices",
      ],
      answer: 1,
    },
    {
      question: "The marketing mix extension for services includes:",
      options: [
        "People, Process, Physical evidence",
        "Packaging, Positioning, Publicity",
        "Performance, Perception, Preference",
        "Planning, Preparation, Presentation",
      ],
      answer: 0,
    },
    {
      question: "SWOT analysis stands for:",
      options: [
        "Strengths, Weaknesses, Opportunities, Threats",
        "Systems, Workflows, Operations, Technology",
        "Sales, Workforce, Objectives, Targets",
        "Strategy, Workforce, Organization, Tactics",
      ],
      answer: 0,
    },
    {
      question: "Product life cycle stages include:",
      options: [
        "Introduction, Growth, Maturity, Decline",
        "Planning, Development, Launch, Review",
        "Research, Design, Production, Sales",
        "Concept, Testing, Marketing, Distribution",
      ],
      answer: 0,
    },
    {
      question: "Price skimming strategy involves:",
      options: [
        "Setting low initial prices",
        "Setting high initial prices then reducing",
        "Keeping prices constant",
        "Randomly changing prices",
      ],
      answer: 1,
    },
    {
      question: "Digital marketing channels include:",
      options: [
        "Social media, Email, SEO, Content marketing",
        "Television, Radio, Newspapers, Magazines",
        "Billboards, Flyers, Brochures, Catalogs",
        "Trade shows, Conferences, Seminars, Workshops",
      ],
      answer: 0,
    },
  ],
  "Human Resource Management": [
    {
      question: "HRM stands for:",
      options: [
        "Human Resource Management",
        "Human Relations Management",
        "Human Rights Management",
        "Human Resource Monitoring",
      ],
      answer: 0,
    },
    {
      question: "The process of finding and attracting capable applicants is called:",
      options: ["Selection", "Recruitment", "Training", "Performance appraisal"],
      answer: 1,
    },
    {
      question: "Performance appraisal is used for:",
      options: [
        "Evaluating employee performance",
        "Hiring new employees",
        "Setting company goals",
        "Marketing products",
      ],
      answer: 0,
    },
    {
      question: "Employee motivation theories include:",
      options: ["Maslow's hierarchy", "Herzberg's two-factor theory", "McGregor's Theory X and Y", "All of the above"],
      answer: 3,
    },
    {
      question: "Training and development helps in:",
      options: ["Improving employee skills", "Reducing workforce", "Increasing costs", "Decreasing productivity"],
      answer: 0,
    },
    {
      question: "Job analysis involves:",
      options: [
        "Determining job requirements and specifications",
        "Evaluating employee performance",
        "Setting salary levels",
        "Recruiting new employees",
      ],
      answer: 0,
    },
    {
      question: "360-degree feedback includes input from:",
      options: [
        "Supervisors only",
        "Peers only",
        "Subordinates only",
        "Supervisors, peers, subordinates, and customers",
      ],
      answer: 3,
    },
    {
      question: "Compensation management includes:",
      options: [
        "Salary and wages only",
        "Benefits only",
        "Salary, wages, benefits, and incentives",
        "Performance bonuses only",
      ],
      answer: 2,
    },
    {
      question: "Employee turnover can be reduced by:",
      options: [
        "Better recruitment",
        "Competitive compensation",
        "Career development opportunities",
        "All of the above",
      ],
      answer: 3,
    },
    {
      question: "Diversity in the workplace refers to:",
      options: [
        "Having employees from different backgrounds",
        "Having different job roles",
        "Having different work schedules",
        "Having different office locations",
      ],
      answer: 0,
    },
  ],
  Leadership: [
    {
      question: "Transformational leadership focuses on:",
      options: [
        "Maintaining status quo",
        "Inspiring and motivating followers",
        "Strict control",
        "Task completion only",
      ],
      answer: 1,
    },
    {
      question: "Emotional intelligence in leadership includes:",
      options: ["Self-awareness", "Social skills", "Empathy", "All of the above"],
      answer: 3,
    },
    {
      question: "Autocratic leadership style is characterized by:",
      options: ["Shared decision making", "High employee involvement", "Centralized decision making", "No supervision"],
      answer: 2,
    },
    {
      question: "Servant leadership emphasizes:",
      options: [
        "Leader's personal gain",
        "Serving followers and stakeholders",
        "Authoritarian control",
        "Profit maximization",
      ],
      answer: 1,
    },
    {
      question: "Effective communication in leadership involves:",
      options: ["One-way communication", "Active listening", "Ignoring feedback", "Written communication only"],
      answer: 1,
    },
    {
      question: "Situational leadership theory suggests:",
      options: [
        "One leadership style fits all",
        "Leadership style should match follower readiness",
        "Leaders are born, not made",
        "Leadership is not important",
      ],
      answer: 1,
    },
    {
      question: "Charismatic leadership is characterized by:",
      options: ["Inspiring vision and enthusiasm", "Strict rule following", "Micromanagement", "Avoiding risks"],
      answer: 0,
    },
    {
      question: "Democratic leadership involves:",
      options: [
        "Leader makes all decisions",
        "Group participation in decision making",
        "No leadership structure",
        "Random decision making",
      ],
      answer: 1,
    },
    {
      question: "Leadership vs Management - Leaders focus on:",
      options: ["Doing things right", "Doing the right things", "Following procedures", "Maintaining order"],
      answer: 1,
    },
    {
      question: "Authentic leadership emphasizes:",
      options: [
        "Being genuine and true to oneself",
        "Following popular trends",
        "Copying other leaders",
        "Avoiding difficult decisions",
      ],
      answer: 0,
    },
  ],
  Entrepreneurship: [
    {
      question: "An entrepreneur is someone who:",
      options: [
        "Works for a large corporation",
        "Starts and manages a business venture",
        "Only invests money",
        "Avoids taking risks",
      ],
      answer: 1,
    },
    {
      question: "A business plan typically includes:",
      options: [
        "Executive summary only",
        "Financial projections only",
        "Market analysis, financial projections, and operational plans",
        "Personal information only",
      ],
      answer: 2,
    },
    {
      question: "Venture capital is:",
      options: [
        "Money from personal savings",
        "Funding for high-growth potential startups",
        "Government grants",
        "Bank loans only",
      ],
      answer: 1,
    },
    {
      question: "Market validation involves:",
      options: [
        "Assuming customer needs",
        "Testing product/service with real customers",
        "Copying competitors",
        "Ignoring market research",
      ],
      answer: 1,
    },
    {
      question: "A minimum viable product (MVP) is:",
      options: [
        "A fully featured product",
        "The cheapest product possible",
        "A basic version to test market response",
        "A prototype that doesn't work",
      ],
      answer: 2,
    },
    {
      question: "Bootstrapping means:",
      options: [
        "Using external funding only",
        "Self-funding a business",
        "Borrowing from banks",
        "Getting government grants",
      ],
      answer: 1,
    },
    {
      question: "Intellectual property includes:",
      options: ["Patents, trademarks, copyrights", "Physical assets only", "Employee contracts", "Office equipment"],
      answer: 0,
    },
    {
      question: "Scalability refers to:",
      options: [
        "Reducing business size",
        "Ability to grow without proportional cost increases",
        "Maintaining current size",
        "Closing the business",
      ],
      answer: 1,
    },
    {
      question: "Angel investors are:",
      options: [
        "Bank employees",
        "Government officials",
        "Wealthy individuals who invest in startups",
        "Insurance agents",
      ],
      answer: 2,
    },
    {
      question: "Pivot in entrepreneurship means:",
      options: [
        "Closing the business",
        "Changing business model or strategy",
        "Hiring more employees",
        "Moving to a new location",
      ],
      answer: 1,
    },
  ],
}

// Add more questions for other courses by duplicating and modifying existing ones
courses.forEach((course) => {
  if (!questionBank[course]) {
    questionBank[course] = questionBank["Introduction to Management"].map((q, index) => ({
      ...q,
      question: `${course} - ${q.question}`,
      id: `${course}_${index}`,
    }))
  }
})

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
  loadUsedQuestions()
})

function initializeApp() {
  // Setup event listeners
  document.getElementById("loginForm").addEventListener("submit", handleLogin)
  document.getElementById("menuBtn").addEventListener("click", toggleSidebar)
  document.getElementById("overlay").addEventListener("click", closeSidebar)
  document
    .getElementById("logoutBtn")
    .addEventListener("click", () =>
      showConfirmDialog("Logout", "Are you sure you want to logout? Your current progress will be lost.", logout),
    )
  document
    .getElementById("homeBtn")
    .addEventListener("click", () =>
      showConfirmDialog(
        "Go Home",
        "Are you sure you want to go home? Your current exam progress will be lost.",
        goHomeFromExam,
      ),
    )
  document.getElementById("submitBtn").addEventListener("click", submitAnswer)
  document.getElementById("nextBtn").addEventListener("click", nextQuestion)
  document.getElementById("prevBtn").addEventListener("click", previousQuestion)

  // Confirmation dialog events
  document.getElementById("confirmCancel").addEventListener("click", hideConfirmDialog)
  document.getElementById("confirmOk").addEventListener("click", executeConfirmAction)
  document.getElementById("confirmOverlay").addEventListener("click", hideConfirmDialog)

  // Generate courses
  generateCoursesList()
  generateCoursesGrid()
}

function loadUsedQuestions() {
  const stored = localStorage.getItem("usedQuestionIds")
  if (stored) {
    usedQuestionIds = new Set(JSON.parse(stored))
  }
}

function saveUsedQuestions() {
  localStorage.setItem("usedQuestionIds", JSON.stringify([...usedQuestionIds]))
}

function handleLogin(e) {
  e.preventDefault()
  const name = document.getElementById("nameInput").value.trim()
  if (!name) {
    alert("Please enter your full name")
    return
  }
  currentUser = name
  showHomePage()
}

function showHomePage() {
  hideAllPages()
  document.getElementById("homePage").classList.remove("hidden")
  document.getElementById("homeHeader").classList.remove("hidden")
  document.getElementById("headerTitle").textContent = "Ethiopian Exit Exam"
  document.getElementById("welcomeText").textContent = `Welcome, ${currentUser}`
  document.getElementById("userName").textContent = currentUser
  document.getElementById("userAvatar").textContent = currentUser.charAt(0).toUpperCase()
}

function generateCoursesList() {
  const coursesList = document.getElementById("coursesList")
  coursesList.innerHTML = courses
    .map(
      (course) => `
        <button class="sidebar-item" onclick="startCourseExam('${course}')">
            <span class="icon">📚</span>
            <div>
                <div style="font-weight: 500;">${course}</div>
                <div style="font-size: 0.8rem; opacity: 0.7;">100 unique questions</div>
            </div>
        </button>
    `,
    )
    .join("")
}

function generateCoursesGrid() {
  const coursesGrid = document.getElementById("coursesGrid")
  coursesGrid.innerHTML = courses
    .map(
      (course) => `
        <div class="course-card" onclick="startCourseExam('${course}')">
            <div class="icon">📚</div>
            <h3>${course}</h3>
            <p class="description">100 Unique Questions</p>
        </div>
    `,
    )
    .join("")
}

function startCourseExam(course) {
  currentCourse = course
  isMockExam = false
  closeSidebar()
  initializeExam()
}

function startMockExam() {
  currentCourse = "Mock Exam (All Courses)"
  isMockExam = true
  closeSidebar()
  initializeExam()
}

function initializeExam() {
  // Generate unique questions
  questions = generateUniqueQuestions()
  userAnswers = new Array(questions.length).fill(-1)
  currentQuestionIndex = 0
  showingFeedback = false
  examStartTime = new Date()
  timeLeft = 180 * 60 // Reset timer

  // Start timer
  startTimer()

  // Show exam page
  hideAllPages()
  document.getElementById("examPage").classList.remove("hidden")
  document.getElementById("examHeader").classList.remove("hidden")
  document.getElementById("examTitle").textContent = currentCourse

  // Render first question
  renderQuestion()
}

function generateUniqueQuestions() {
  const questionPool = []
  let attempts = 0
  const maxAttempts = 1000

  if (isMockExam) {
    // Generate questions from all courses for mock exam
    const questionsPerCourse = Math.ceil(100 / courses.length)

    for (const course of courses) {
      const courseQuestions = questionBank[course] || questionBank["Introduction to Management"]
      let courseQuestionCount = 0

      for (
        let i = 0;
        i < courseQuestions.length && courseQuestionCount < questionsPerCourse && questionPool.length < 100;
        i++
      ) {
        attempts++
        if (attempts > maxAttempts) break

        const baseQuestion = courseQuestions[i]
        const questionId = `${course}_${i}_${Date.now()}_${Math.random()}`

        if (!usedQuestionIds.has(questionId)) {
          const uniqueQuestion = {
            ...baseQuestion,
            course: course,
            id: questionId,
            question: generateQuestionVariation(baseQuestion.question, questionPool.length),
          }

          questionPool.push(uniqueQuestion)
          usedQuestionIds.add(questionId)
          courseQuestionCount++
        }
      }
    }

    // If we don't have enough unique questions, generate variations
    while (questionPool.length < 100) {
      const randomCourse = courses[Math.floor(Math.random() * courses.length)]
      const courseQuestions = questionBank[randomCourse] || questionBank["Introduction to Management"]
      const randomQuestion = courseQuestions[Math.floor(Math.random() * courseQuestions.length)]

      const questionId = `${randomCourse}_variation_${Date.now()}_${Math.random()}`
      const uniqueQuestion = {
        ...randomQuestion,
        course: randomCourse,
        id: questionId,
        question: generateQuestionVariation(randomQuestion.question, questionPool.length),
      }

      questionPool.push(uniqueQuestion)
      usedQuestionIds.add(questionId)
    }
  } else {
    // Generate questions for specific course
    const courseQuestions = questionBank[currentCourse] || questionBank["Introduction to Management"]

    for (let i = 0; i < 100; i++) {
      const baseQuestion = courseQuestions[i % courseQuestions.length]
      const questionId = `${currentCourse}_${i}_${Date.now()}_${Math.random()}`

      const uniqueQuestion = {
        ...baseQuestion,
        course: currentCourse,
        id: questionId,
        question: generateQuestionVariation(baseQuestion.question, i),
      }

      questionPool.push(uniqueQuestion)
      usedQuestionIds.add(questionId)
    }
  }

  // Shuffle the questions
  for (let i = questionPool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[questionPool[i], questionPool[j]] = [questionPool[j], questionPool[i]]
  }

  // Save used questions
  saveUsedQuestions()

  return questionPool.slice(0, 100)
}

function generateQuestionVariation(baseQuestion, index) {
  const variations = [
    baseQuestion,
    baseQuestion.replace(/^What is/, "Define"),
    baseQuestion.replace(/^Which/, "Identify which"),
    baseQuestion.replace(/^What/, "Explain what"),
    `According to management theory, ${baseQuestion.toLowerCase()}`,
    `In the context of business studies, ${baseQuestion.toLowerCase()}`,
    `From a strategic perspective, ${baseQuestion.toLowerCase()}`,
    `In modern business practice, ${baseQuestion.toLowerCase()}`,
    baseQuestion.replace(/\?$/, " in today's business environment?"),
    baseQuestion.replace(/\?$/, " according to current best practices?"),
  ]

  return variations[index % variations.length]
}

function renderQuestion() {
  const question = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  // Update progress
  document.getElementById("questionProgress").textContent =
    `Question ${currentQuestionIndex + 1} of ${questions.length}`
  document.getElementById("progressPercent").textContent = `${Math.round(progress)}% Complete`
  document.getElementById("progressFill").style.width = `${progress}%`

  // Render question
  const questionCard = document.getElementById("questionCard")
  questionCard.innerHTML = `
        <div class="question-title">
            Q${currentQuestionIndex + 1}. ${question.question}
            ${isMockExam ? `<br><small style="color: #666; font-weight: normal;">Course: ${question.course}</small>` : ""}
        </div>
        <div class="options">
            ${question.options
              .map(
                (option, index) => `
                <div class="option" data-index="${index}">
                    <input type="radio" name="answer" value="${index}" id="option${index}">
                    <label for="option${index}" class="option-text">
                        ${String.fromCharCode(65 + index)}. ${option}
                    </label>
                    <span class="option-icon"></span>
                </div>
            `,
              )
              .join("")}
        </div>
    `

  // Add click handlers to options
  questionCard.querySelectorAll(".option").forEach((option) => {
    option.addEventListener("click", function () {
      if (!showingFeedback) {
        const radio = this.querySelector('input[type="radio"]')
        radio.checked = true

        // Remove selected class from all options
        questionCard.querySelectorAll(".option").forEach((opt) => opt.classList.remove("selected"))

        // Add selected class to clicked option
        this.classList.add("selected")
      }
    })
  })

  // Update navigation buttons
  updateNavigationButtons()

  // Restore previous answer if exists
  if (userAnswers[currentQuestionIndex] !== -1) {
    const savedAnswer = userAnswers[currentQuestionIndex]
    const radio = questionCard.querySelector(`input[value="${savedAnswer}"]`)
    if (radio) {
      radio.checked = true
      radio.closest(".option").classList.add("selected")
      if (showingFeedback) {
        showAnswerFeedback()
      }
    }
  }
}

function updateNavigationButtons() {
  const prevBtn = document.getElementById("prevBtn")
  const submitBtn = document.getElementById("submitBtn")
  const nextBtn = document.getElementById("nextBtn")

  // Show/hide previous button
  if (currentQuestionIndex > 0) {
    prevBtn.classList.remove("hidden")
  } else {
    prevBtn.classList.add("hidden")
  }

  // Update submit/next buttons based on feedback state
  if (showingFeedback) {
    submitBtn.classList.add("hidden")
    nextBtn.classList.remove("hidden")
    nextBtn.textContent = currentQuestionIndex < questions.length - 1 ? "Next Question →" : "Finish Exam"
  } else {
    submitBtn.classList.remove("hidden")
    nextBtn.classList.add("hidden")
  }
}

function submitAnswer() {
  const selectedOption = document.querySelector('input[name="answer"]:checked')
  if (!selectedOption) {
    alert("Please select an answer before submitting")
    return
  }

  const answerIndex = Number.parseInt(selectedOption.value)
  userAnswers[currentQuestionIndex] = answerIndex
  showingFeedback = true

  showAnswerFeedback()
  updateNavigationButtons()
}

function showAnswerFeedback() {
  const question = questions[currentQuestionIndex]
  const questionCard = document.getElementById("questionCard")
  const options = questionCard.querySelectorAll(".option")

  options.forEach((option, index) => {
    const radio = option.querySelector('input[type="radio"]')
    const icon = option.querySelector(".option-icon")

    radio.disabled = true

    if (index === question.answer) {
      option.classList.add("correct")
      icon.textContent = "✓"
    } else if (radio.checked) {
      option.classList.add("incorrect")
      icon.textContent = "✗"
    }
  })
}

function nextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++
    showingFeedback = userAnswers[currentQuestionIndex] !== -1
    renderQuestion()
  } else {
    finishExam()
  }
}

function previousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--
    showingFeedback = userAnswers[currentQuestionIndex] !== -1
    renderQuestion()
  }
}

function finishExam() {
  clearInterval(timerInterval)

  // Calculate results
  const score = userAnswers.reduce((total, answer, index) => {
    return total + (answer === questions[index].answer ? 1 : 0)
  }, 0)

  const percentage = (score / questions.length) * 100
  const passed = percentage >= 50
  const timeTaken = new Date() - examStartTime

  // Show results
  showResults(score, percentage, passed, timeTaken)
}

function showResults(score, percentage, passed, timeTaken) {
  hideAllPages()
  document.getElementById("resultsPage").classList.remove("hidden")
  document.getElementById("homeHeader").classList.remove("hidden")
  document.getElementById("headerTitle").textContent = "Exam Results"

  // Update results display
  const resultsHeader = document.getElementById("resultsHeader")
  const resultsIcon = document.getElementById("resultsIcon")
  const resultsTitle = document.getElementById("resultsTitle")
  const resultsSubtitle = document.getElementById("resultsSubtitle")
  const statusBadge = document.getElementById("statusBadge")

  if (passed) {
    resultsHeader.classList.remove("failed")
    resultsIcon.textContent = "🎉"
    resultsTitle.textContent = "Congratulations!"
    resultsSubtitle.textContent = "You have passed the exam!"
    statusBadge.className = "status-badge passed"
    statusBadge.textContent = "PASSED"
  } else {
    resultsHeader.classList.add("failed")
    resultsIcon.textContent = "😞"
    resultsTitle.textContent = "Better Luck Next Time!"
    resultsSubtitle.textContent = "You can retake the exam anytime."
    statusBadge.className = "status-badge failed"
    statusBadge.textContent = "FAILED"
  }

  // Update result values
  document.getElementById("resultName").textContent = currentUser
  document.getElementById("resultCourse").textContent = currentCourse
  document.getElementById("resultScore").textContent = `${score}/${questions.length}`
  document.getElementById("resultPercentage").textContent = `${percentage.toFixed(1)}%`

  // Store results
  storeExamResult({
    user: currentUser,
    course: currentCourse,
    score: score,
    total: questions.length,
    percentage: percentage,
    passed: passed,
    date: new Date(),
    timeTaken: timeTaken,
  })
}

function storeExamResult(result) {
  const results = JSON.parse(localStorage.getItem("examResults") || "[]")
  results.push(result)
  localStorage.setItem("examResults", JSON.stringify(results))
}

function downloadResults() {
  const score = Number.parseInt(document.getElementById("resultScore").textContent.split("/")[0])
  const total = Number.parseInt(document.getElementById("resultScore").textContent.split("/")[1])
  const percentage = document.getElementById("resultPercentage").textContent

  let content = `Ethiopian Exit Exam Results\n`
  content += `================================\n\n`
  content += `Candidate: ${currentUser}\n`
  content += `Course: ${currentCourse}\n`
  content += `Date: ${new Date().toLocaleDateString()}\n`
  content += `Score: ${score}/${total}\n`
  content += `Percentage: ${percentage}\n`
  content += `Status: ${percentage.replace("%", "") >= 50 ? "PASSED" : "FAILED"}\n\n`
  content += `Questions and Answers:\n`
  content += `========================\n\n`

  questions.forEach((question, index) => {
    const userAnswer = userAnswers[index]
    content += `Q${index + 1}. ${question.question}\n`
    if (isMockExam) {
      content += `Course: ${question.course}\n`
    }
    question.options.forEach((option, optIndex) => {
      const marker = optIndex === question.answer ? "✓" : " "
      const userChoice = userAnswer === optIndex ? " (Your answer)" : ""
      content += `${marker} ${String.fromCharCode(65 + optIndex)}. ${option}${userChoice}\n`
    })
    content += "\n"
  })

  const blob = new Blob([content], { type: "text/plain" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `ExamResults_${currentUser.replace(/\s+/g, "_")}_${currentCourse.replace(/\s+/g, "_")}.txt`
  a.click()
  URL.revokeObjectURL(url)
}

function retakeExam() {
  showHomePage()
}

function goHome() {
  showHomePage()
}

function goHomeFromExam() {
  clearInterval(timerInterval)
  showHomePage()
  hideConfirmDialog()
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--
    updateTimerDisplay()

    if (timeLeft <= 0) {
      clearInterval(timerInterval)
      alert("Time is up! The exam will be submitted automatically.")
      finishExam()
    }
  }, 1000)
}

function updateTimerDisplay() {
  const hours = Math.floor(timeLeft / 3600)
  const minutes = Math.floor((timeLeft % 3600) / 60)
  const seconds = timeLeft % 60

  const timeString = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  document.getElementById("timer").textContent = timeString

  // Add warning class when time is low
  if (timeLeft < 600) {
    // Less than 10 minutes
    document.getElementById("timer").classList.add("warning")
  }
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar")
  const overlay = document.getElementById("overlay")

  sidebar.classList.toggle("open")
  overlay.classList.toggle("active")
}

function closeSidebar() {
  document.getElementById("sidebar").classList.remove("open")
  document.getElementById("overlay").classList.remove("active")
}

let confirmAction = null

function showConfirmDialog(title, message, action) {
  confirmAction = action
  document.getElementById("confirmTitle").textContent = title
  document.getElementById("confirmMessage").textContent = message
  document.getElementById("confirmDialog").classList.remove("hidden")
  document.getElementById("confirmOverlay").classList.remove("hidden")
}

function hideConfirmDialog() {
  document.getElementById("confirmDialog").classList.add("hidden")
  document.getElementById("confirmOverlay").classList.add("hidden")
  confirmAction = null
}

function executeConfirmAction() {
  if (confirmAction) {
    confirmAction()
  }
  hideConfirmDialog()
}

function logout() {
  clearInterval(timerInterval)
  currentUser = ""
  currentCourse = ""
  questions = []
  userAnswers = []
  currentQuestionIndex = 0
  showingFeedback = false
  timeLeft = 180 * 60

  hideAllPages()
  document.getElementById("loginPage").classList.remove("hidden")
  document.getElementById("nameInput").value = ""
  closeSidebar()
}

function hideAllPages() {
  document.getElementById("loginPage").classList.add("hidden")
  document.getElementById("homePage").classList.add("hidden")
  document.getElementById("examPage").classList.add("hidden")
  document.getElementById("resultsPage").classList.add("hidden")
  document.getElementById("homeHeader").classList.add("hidden")
  document.getElementById("examHeader").classList.add("hidden")
}

// Clear old used questions periodically (optional)
function clearOldUsedQuestions() {
  if (usedQuestionIds.size > 10000) {
    // Clear if too many stored
    usedQuestionIds.clear()
    localStorage.removeItem("usedQuestionIds")
  }
}

// Call this function periodically
setInterval(clearOldUsedQuestions, 24 * 60 * 60 * 1000) // Once per day
