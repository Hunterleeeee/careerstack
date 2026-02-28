// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Keyword Optimizer Form
    const keywordForm = document.getElementById('keywordForm');
    const keywordsResult = document.getElementById('keywordsResult');

    if (keywordForm && keywordsResult) {
        keywordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const jobTitle = document.getElementById('jobTitle').value;
            
            // Sample keywords for demonstration
            const sampleKeywords = {
                'software engineer': [
                    'JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'Docker', 'Git', 'API', 'SQL', 'Agile',
                    'TypeScript', 'Java', 'C++', 'DevOps', 'CI/CD', 'Testing', 'Frontend', 'Backend', 'Full Stack', 'Cloud'
                ],
                'marketing manager': [
                    'SEO', 'Content Marketing', 'Social Media', 'Analytics', 'Campaign Management', 'Brand Strategy',
                    'Digital Marketing', 'Email Marketing', 'CRM', 'Google Analytics', 'PPC', 'Copywriting',
                    'Market Research', 'Lead Generation', 'Conversion Optimization', 'Team Management',
                    'Budgeting', 'ROI', 'KPI', 'Content Creation'
                ],
                'data analyst': [
                    'SQL', 'Python', 'Excel', 'Tableau', 'Power BI', 'Data Visualization', 'Statistics',
                    'Machine Learning', 'Data Cleaning', 'ETL', 'Business Intelligence', 'Predictive Analytics',
                    'R', 'Big Data', 'Data Mining', 'Dashboard', 'Reporting', 'Data Warehousing', 'Quantitative Analysis',
                    'Business Acumen'
                ],
                'project manager': [
                    'Agile', 'Scrum', 'Waterfall', 'Project Planning', 'Risk Management', 'Budgeting',
                    'Resource Allocation', 'Stakeholder Management', 'Communication', 'Leadership', 'Scheduling',
                    'Quality Assurance', 'Problem Solving', 'Team Management', 'Critical Path', 'Change Management',
                    'Documentation', 'Meeting Facilitation', 'Conflict Resolution', 'Deliverables'
                ],
                'human resources': [
                    'Recruitment', 'Onboarding', 'Employee Relations', 'Performance Management', 'Benefits Administration',
                    'Talent Development', 'HR Policies', 'Compliance', 'Training', 'Retention', 'Diversity and Inclusion',
                    'Payroll', 'Employee Engagement', 'HRIS', 'Conflict Resolution', 'Labor Laws', 'Succession Planning',
                    'Compensation', 'Workforce Planning', 'Employee Wellness'
                ]
            };

            // Default keywords if job title not found
            let keywords = sampleKeywords['software engineer'];
            
            // Check if job title exists in sample keywords
            for (const key in sampleKeywords) {
                if (jobTitle.toLowerCase().includes(key)) {
                    keywords = sampleKeywords[key];
                    break;
                }
            }

            // Display keywords
            keywordsResult.innerHTML = `
                <h3>Top 20 Keywords for ${jobTitle}</h3>
                <div class="keywords-list">
                    ${keywords.map(keyword => `<span class="keyword-tag">${keyword}</span>`).join('')}
                </div>
            `;
        });
    }

    // Stripe Payment Button
    const stripeButton = document.getElementById('stripe-button');

    if (stripeButton) {
        stripeButton.addEventListener('click', function() {
            // This is a placeholder for Stripe integration
            // In a real implementation, you would initialize Stripe and create a payment intent
            alert('Stripe payment processing would be initiated here');
        });
    }
});