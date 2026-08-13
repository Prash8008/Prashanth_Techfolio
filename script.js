/**
 * PRASHANTH SHAPURAM - QA Engineer & AI Testing Portfolio
 * Core JavaScript Logic: Single Button Theme Toggle, Copy Toast, Scroll-to-Top, Project Filters, Modals, Terminal Commands
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initStatsCounter();
    initProjectModals();
    initProjectFilters();
    initResumeModal();
    initTerminal();
    initMobileMenu();
    initScrollAnimations();
    initCopyToast();
    initScrollToTop();
    initScrollSpy();
    initParticleCanvas();
    initKeyboardNav();
});


/* =========================================================
   1. SINGLE BUTTON THEME TOGGLE (LIGHT MODE DEFAULT)
========================================================= */
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;

    if (!themeToggleBtn || !themeIcon) return;

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(nextTheme);
        localStorage.setItem('theme', nextTheme);
    });

    function applyTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
    }
}


/* =========================================================
   2. ANIMATED STATISTICS COUNTER
========================================================= */
function initStatsCounter() {
    const counters = document.querySelectorAll('.counter');
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 1200; // ms
                    const step = Math.max(1, Math.floor(target / (duration / 16)));
                    let current = 0;

                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            counter.textContent = target;
                            clearInterval(timer);
                        } else {
                            counter.textContent = current;
                        }
                    }, 16);
                });
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-bar-section');
    if (statsSection) observer.observe(statsSection);
}


/* =========================================================
   3. PROJECT CATEGORY FILTER PILLS
========================================================= */
function initProjectFilters() {
    const filterPills = document.querySelectorAll('.filter-pill');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterPills.length) return;

    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            const filterValue = pill.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}


/* =========================================================
   4. PROJECT DETAILS MODAL & CODE SNIPPET PREVIEW
========================================================= */
const projectData = {
    'fnet': {
        title: 'FNET Portal Automation',
        tag: 'TELECOM & ENTERPRISE',
        description: 'Comprehensive QA testing and automation for a high-traffic customer self-service telecom portal.',
        details: [
            'Architected automated test suites covering Web UI, REST APIs, and end-to-end user workflows.',
            'Executed functional, regression, smoke, and edge-case testing across cross-browser environments.',
            'Integrated post-build test runs using Jenkins and Sauce Labs to maintain high deployment quality.',
            'Reduced manual regression cycle duration by 65% while maintaining 99%+ pass rate reliability.'
        ],
        code: `// Sample Java Selenium Page Object Model snippet
@FindBy(id = "account-number-input")
private WebElement accountNumberInput;

@FindBy(css = "button.submit-billing")
private WebElement submitBillingBtn;

public void verifySelfServiceBilling(String accNum) {
    wait.until(ExpectedConditions.visibilityOf(accountNumberInput));
    accountNumberInput.sendKeys(accNum);
    submitBillingBtn.click();
    Assert.assertTrue(driver.getCurrentUrl().contains("/billing-dashboard"));
}`,
        tech: ['Java', 'Selenium WebDriver', 'TestNG', 'Postman', 'Sauce Labs', 'Jira']
    },
    'paymentus': {
        title: 'Paymentus Migration Testing',
        tag: 'FINTECH & BILLING',
        description: 'End-to-end API and UI validation for enterprise billing, autopay, payment profiles, and database migration.',
        details: [
            'Validated critical payment pathways including Autopay enrollment, billing calculations, and payment gateway responses.',
            'Automated 120+ REST API endpoints using REST Assured and Postman for pre- and post-migration validation.',
            'Performed complex SQL query verification to validate data integrity across legacy and new billing databases.',
            'Ensured zero critical defects during production cutover.'
        ],
        code: `// REST Assured API Validation snippet
given()
    .header("Authorization", "Bearer " + token)
    .contentType(ContentType.JSON)
    .body("{\\"autopay_enabled\\": true, \\"account_id\\": \\"ACC-9821\\\"}")
.when()
    .post("/api/v1/payment/autopay/enroll")
.then()
    .statusCode(200)
    .body("status", equalTo("SUCCESS"))
    .body("confirmation_code", notNullValue());`,
        tech: ['REST Assured', 'Postman', 'SQL', 'REST API', 'JSON Validation', 'Zephyr']
    },
    'ai-agent': {
        title: 'AI Agent & MCP Protocol Testing',
        tag: 'AI & EMERGING TECH',
        description: 'Pioneering quality assurance framework and testing methodologies for autonomous AI agents and MCP servers.',
        details: [
            'Developed test strategies for non-deterministic AI agent behaviors, tool calling accuracy, and multi-agent coordination.',
            'Tested Model Context Protocol (MCP) server integration to verify tool schema enforcement and response integrity.',
            'Evaluated prompt engineering outputs for hallucinations, context windows, and safety compliance.',
            'Built Python-based evaluation scripts to benchmark model response times and token efficiency.'
        ],
        code: `# Python MCP Tool Schema Validation snippet
import pytest
from mcp_client import MCPTestClient

def test_mcp_tool_execution():
    client = MCPTestClient(server_url="http://localhost:8000")
    response = client.call_tool(tool_name="database_query", args={"query": "SELECT count(*) FROM users"})
    assert response.status_code == 200
    assert "result" in response.json()
    assert response.json()["error"] is None`,
        tech: ['AI Agents', 'Model Context Protocol (MCP)', 'Prompt Engineering', 'Python', 'LLM Benchmarking']
    },
    'framework': {
        title: 'Test Automation Framework',
        tag: 'AUTOMATION ARCHITECTURE',
        description: 'Modular, scalable enterprise test automation framework built using Java, Selenium, TestNG, and Cucumber BDD.',
        details: [
            'Designed Page Object Model (POM) architecture with thread-safe driver management for parallel execution.',
            'Incorporated Cucumber BDD Gherkin feature files for clear business-facing test scenario documentation.',
            'Implemented custom ExtentReports & HTML log generation with automated screenshot capture on failure.',
            'Configured Maven build profiles for seamless CI/CD pipeline integration.'
        ],
        code: `// Cucumber BDD Feature Scenario Example
Scenario: Verify automated user checkout pipeline
    Given User is on the login page
    When User inputs valid credentials and submits
    Then User should see dashboard with status 200 OK
    And Automated test report is attached to ExtentManager`,
        tech: ['Java', 'Selenium WebDriver', 'TestNG', 'Cucumber BDD', 'Maven', 'ExtentReports', 'Git']
    }
};

function initProjectModals() {
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.getElementById('modal-close');
    const detailButtons = document.querySelectorAll('.project-details-btn');

    if (!modal || !modalBody) return;

    detailButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-project');
            const data = projectData[key];

            if (data) {
                modalBody.innerHTML = `
                    <div style="margin-bottom: 10px; font-family: var(--font-mono); font-size: 11px; color: var(--accent-secondary); letter-spacing: 2px;">
                        ${data.tag}
                    </div>
                    <h2 style="font-family: var(--font-heading); font-size: 26px; margin-bottom: 14px; color: var(--text-primary);">
                        ${data.title}
                    </h2>
                    <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 20px; line-height: 1.6;">
                        ${data.description}
                    </p>
                    <h3 style="font-family: var(--font-heading); font-size: 15px; margin-bottom: 10px; color: var(--text-primary);">
                        KEY HIGHLIGHTS & DELIVERABLES
                    </h3>
                    <ul style="padding-left: 18px; font-size: 13px; color: var(--text-secondary); display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;">
                        ${data.details.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                    <h3 style="font-family: var(--font-heading); font-size: 15px; margin-bottom: 8px; color: var(--text-primary);">
                        SAMPLE TEST CODE ARCHITECTURE
                    </h3>
                    <div class="modal-code-block" style="border: 1px solid #30363D; border-radius: 8px; overflow: hidden; margin-bottom: 16px;">
                        <div class="modal-code-header">
                            <span>Snippet Preview</span>
                            <button class="btn-copy-code" id="modal-copy-code-btn">📋 Copy Code</button>
                        </div>
                        <pre style="margin: 0; padding: 14px; background: #0D1117; color: #C9D1D9; font-family: var(--font-mono); font-size: 12px; overflow-x: auto;"><code>${escapeHtml(data.code)}</code></pre>
                    </div>
                    <h3 style="font-family: var(--font-heading); font-size: 15px; margin: 16px 0 10px 0; color: var(--text-primary);">
                        TECHNOLOGIES UTILIZED
                    </h3>
                    <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                        ${data.tech.map(t => `<span style="font-family: var(--font-mono); font-size: 11px; background: var(--bg-primary); border: 1px solid var(--border-color); color: var(--text-primary); padding: 4px 10px; border-radius: 4px;">${t}</span>`).join('')}
                    </div>
                `;
                modal.classList.add('active');

                // Attach copy code listener
                const copyCodeBtn = document.getElementById('modal-copy-code-btn');
                if (copyCodeBtn) {
                    copyCodeBtn.addEventListener('click', () => {
                        if (navigator.clipboard) {
                            navigator.clipboard.writeText(data.code).then(() => {
                                copyCodeBtn.textContent = '✓ Copied!';
                                setTimeout(() => copyCodeBtn.textContent = '📋 Copy Code', 2000);
                            });
                        }
                    });
                }
            }
        });
    });

    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    function escapeHtml(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
}


/* =========================================================
   5. RESUME MODAL
========================================================= */
function initResumeModal() {
    const resumeModal = document.getElementById('resume-modal');
    const closeBtn = document.getElementById('resume-modal-close');
    const triggers = document.querySelectorAll('.resume-modal-trigger, #resume-nav-btn');

    if (!resumeModal) return;

    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            resumeModal.classList.add('active');
        });
    });

    closeBtn.addEventListener('click', () => resumeModal.classList.remove('active'));
    resumeModal.addEventListener('click', (e) => {
        if (e.target === resumeModal) resumeModal.classList.remove('active');
    });
}


/* =========================================================
   6. INTERACTIVE TERMINAL (BUTTONS & TYPED INPUT)
========================================================= */
function initTerminal() {
    const terminalOutput = document.getElementById('terminal-output');
    const cmdButtons = document.querySelectorAll('.term-cmd-btn');
    const inputForm = document.getElementById('terminal-input-form');
    const inputField = document.getElementById('terminal-input');

    if (!terminalOutput) return;

    const commandResponses = {
        'help': `
            <div class="terminal-line"><span class="term-prompt">$</span> <span class="term-cmd">help</span></div>
            <div class="terminal-response">
                <div class="term-item">Available commands:</div>
                <div class="term-item"> ▫ <strong class="term-cmd">skills</strong> — Print technical stack</div>
                <div class="term-item"> ▫ <strong class="term-cmd">projects</strong> — View featured engineering projects</div>
                <div class="term-item"> ▫ <strong class="term-cmd">test</strong> — Trigger Live QA Automated Test Engine</div>
                <div class="term-item"> ▫ <strong class="term-cmd">contact</strong> — Display contact & social details</div>
                <div class="term-item"> ▫ <strong class="term-cmd">hire</strong> — Execute hiring protocol!</div>
                <div class="term-item"> ▫ <strong class="term-cmd">theme</strong> — Toggle dark/light theme</div>
                <div class="term-item"> ▫ <strong class="term-cmd">clear</strong> — Clear terminal window</div>
            </div>
        `,
        'skills': `
            <div class="terminal-line"><span class="term-prompt">$</span> <span class="term-cmd">skills</span></div>
            <div class="terminal-response">
                <div class="term-item">Languages: <span class="term-highlight">Java, Python, C#, SQL</span></div>
                <div class="term-item">Automation: <span class="term-highlight">Selenium, Playwright, TestNG, Cucumber, Maven</span></div>
                <div class="term-item">APIs: <span class="term-highlight">Postman, REST Assured, Swagger</span></div>
                <div class="term-item">AI & MCP: <span class="term-highlight">AI Agents, Model Context Protocol, Prompt Engineering</span></div>
            </div>
        `,
        'projects': `
            <div class="terminal-line"><span class="term-prompt">$</span> <span class="term-cmd">projects</span></div>
            <div class="terminal-response">
                <div class="term-item">1. <strong class="term-highlight">FNET Portal</strong> — Customer self-service automation</div>
                <div class="term-item">2. <strong class="term-highlight">Paymentus Migration</strong> — Fintech REST API & SQL testing</div>
                <div class="term-item">3. <strong class="term-highlight">AI Agent & MCP</strong> — Non-deterministic AI quality engineering</div>
                <div class="term-item">4. <strong class="term-highlight">Automation Framework</strong> — Selenium + Java + BDD Cucumber</div>
            </div>
        `,
        'contact': `
            <div class="terminal-line"><span class="term-prompt">$</span> <span class="term-cmd">contact</span></div>
            <div class="terminal-response">
                <div class="term-item">Email: <span class="term-highlight">shapuramprashanth6@gmail.com</span></div>
                <div class="term-item">GitHub: <span class="term-highlight">github.com/prash8008</span></div>
                <div class="term-item">LinkedIn: <span class="term-highlight">linkedin.com/in/prashanth-shapuram</span></div>
            </div>
        `,
        'hire': `
            <div class="terminal-line"><span class="term-prompt">$</span> <span class="term-cmd">sudo hire --candidate="Prashanth"</span></div>
            <div class="terminal-response">
                <div class="term-item"><span class="term-check">[SUCCESS]</span> Candidate match: <strong class="term-highlight">QA Engineer & AI Quality Specialist</strong></div>
                <div class="term-item">Initiating interview sequence... Emailing shapuramprashanth6@gmail.com! 🚀</div>
            </div>
        `,
        'about': `
            <div class="terminal-line"><span class="term-prompt">$</span> <span class="term-cmd">whoami</span></div>
            <div class="terminal-response">
                <div class="term-item">Prashanth Shapuram — QA Engineer & AI Testing Specialist</div>
                <div class="term-item">Specializing in Test Automation, API Testing, Performance Analysis & AI Agent Protocols.</div>
            </div>
        `
    };

    function executeCommand(cmdRaw) {
        const cmd = cmdRaw.trim().toLowerCase();
        if (!cmd) return;

        if (cmd === 'clear') {
            terminalOutput.innerHTML = `
                <div class="terminal-line"><span class="term-prompt">$</span> <span class="term-cmd">terminal</span> <span class="term-flag">--cleared</span></div>
            `;
        } else if (cmd === 'test' || cmd === 'run') {
            terminalOutput.innerHTML += `
                <div class="terminal-line"><span class="term-prompt">$</span> <span class="term-cmd">test</span></div>
                <div class="terminal-response">
                    <div class="term-item"><span class="term-check">[PASS]</span> UI Test Automation: <strong class="term-highlight">Selenium & Playwright POM Frameworks</strong></div>
                    <div class="term-item"><span class="term-check">[PASS]</span> API Testing: <strong class="term-highlight">REST Assured, Postman & JSON Schema Validation</strong></div>
                    <div class="term-item"><span class="term-check">[PASS]</span> AI Agent Protocols: <strong class="term-highlight">MCP Tool Routing & Prompt Validation</strong></div>
                    <div class="term-item"><span class="term-check">[PASS]</span> Performance: <strong class="term-highlight">Apache JMeter Load & Stress Testing</strong></div>
                </div>
            `;
        } else if (cmd === 'theme') {
            const themeBtn = document.getElementById('theme-toggle');
            if (themeBtn) themeBtn.click();
            terminalOutput.innerHTML += `
                <div class="terminal-line"><span class="term-prompt">$</span> <span class="term-cmd">theme</span></div>
                <div class="terminal-response"><div class="term-item">Theme toggled successfully!</div></div>
            `;
        } else if (commandResponses[cmd]) {
            terminalOutput.innerHTML += commandResponses[cmd];
        } else {
            terminalOutput.innerHTML += `
                <div class="terminal-line"><span class="term-prompt">$</span> <span class="term-cmd">${escapeHtml(cmd)}</span></div>
                <div class="terminal-response">
                    <div class="term-item" style="color: #EF4444;">Command not recognized: '${escapeHtml(cmd)}'. Type <strong class="term-cmd">help</strong> for available commands.</div>
                </div>
            `;
        }
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    cmdButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            executeCommand(btn.getAttribute('data-cmd'));
        });
    });

    if (inputForm && inputField) {
        inputForm.addEventListener('submit', (e) => {
            e.preventDefault();
            executeCommand(inputField.value);
            inputField.value = '';
        });
    }

    function escapeHtml(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
}


/* =========================================================
   7. EMAIL COPY TOAST NOTIFICATION
========================================================= */
function initCopyToast() {
    const copyBtns = document.querySelectorAll('.copy-email-btn');
    const toast = document.getElementById('toast-notification');
    const email = 'shapuramprashanth6@gmail.com';

    if (!copyBtns.length || !toast) return;

    copyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Prevent default navigation if clicking email link to allow copy
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    showToast();
                }).catch(() => {
                    showToast();
                });
            } else {
                showToast();
            }
        });
    });

    function showToast() {
        toast.classList.add('active');
        setTimeout(() => {
            toast.classList.remove('active');
        }, 2500);
    }
}


/* =========================================================
   8. SCROLL TO TOP BUTTON
========================================================= */
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-to-top');
    if (!scrollTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 350) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


/* =========================================================
   9. MOBILE HAMBURGER MENU & SCROLL ANIMATIONS
========================================================= */
function initMobileMenu() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu-cta a');

    if (!hamburgerBtn) return;

    hamburgerBtn.addEventListener('click', () => {
        header.classList.toggle('mobile-menu-active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            header.classList.remove('mobile-menu-active');
        });
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px"
    };

    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                animateObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.section-title, .about-content, .service-card, .project-card, .stack-category, .timeline-item, .cert-card, .terminal-window');

    animatedElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        animateObserver.observe(el);
    });
}


/* =========================================================
   10. SCROLLSPY NAV ACTIVE STATE
========================================================= */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (!sections.length || !navLinks.length) return;

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
}


/* =========================================================
   11. HERO PARTICLE NEURAL NETWORK CANVAS
========================================================= */
function initParticleCanvas() {
    const canvas = document.getElementById('hero-particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    window.addEventListener('resize', () => {
        if (!canvas) return;
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    });

    const particles = [];
    const particleCount = Math.min(45, Math.floor(width / 30));

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            radius: Math.random() * 2 + 1
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const nodeColor = isDark ? 'rgba(0, 217, 255, 0.6)' : 'rgba(79, 70, 229, 0.5)';
        const lineColor = isDark ? 'rgba(0, 217, 255, 0.12)' : 'rgba(79, 70, 229, 0.1)';

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = nodeColor;
            ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = lineColor;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}


/* =========================================================
   12. KEYBOARD NAV & ESCAPE KEY MODAL CLOSE
========================================================= */
function initKeyboardNav() {
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === 'Esc') {
            const projectModal = document.getElementById('project-modal');
            const resumeModal = document.getElementById('resume-modal');

            if (projectModal && projectModal.classList.contains('active')) {
                projectModal.classList.remove('active');
            }
            if (resumeModal && resumeModal.classList.contains('active')) {
                resumeModal.classList.remove('active');
            }
        }
    });
}

