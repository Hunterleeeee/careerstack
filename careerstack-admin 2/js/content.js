// CareerStack 管理后台 - 内容管理模块

document.addEventListener('DOMContentLoaded', function() {
    // 加载现有内容
    loadContent();
    
    // 绑定表单提交事件
    const siteTitleForm = document.getElementById('siteTitleForm');
    const proSettingsForm = document.getElementById('proSettingsForm');
    const pageContentForm = document.getElementById('pageContentForm');
    
    if (siteTitleForm) {
        siteTitleForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveSiteTitle();
        });
    }
    
    if (proSettingsForm) {
        proSettingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveProSettings();
        });
    }
    
    if (pageContentForm) {
        pageContentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            savePageContent();
        });
    }
});

// 加载内容
function loadContent() {
    const content = getContent();
    
    // 网站标题
    document.getElementById('siteTitle').value = content.siteTitle || '';
    document.getElementById('siteSubtitle').value = content.siteSubtitle || '';
    
    // Pro 设置
    document.getElementById('proPrice').value = content.proPrice || '';
    document.getElementById('proPeriod').value = content.proPeriod || 'month';
    document.getElementById('proDescription').value = content.proDescription || '';
    document.getElementById('proFeatures').value = content.proFeatures || '';
    
    // 页面内容
    document.getElementById('resumePageTitle').value = content.resumePageTitle || '';
    document.getElementById('resumePageDesc').value = content.resumePageDesc || '';
    document.getElementById('coverPageTitle').value = content.coverPageTitle || '';
    document.getElementById('coverPageDesc').value = content.coverPageDesc || '';
    document.getElementById('interviewPageTitle').value = content.interviewPageTitle || '';
    document.getElementById('interviewPageDesc').value = content.interviewPageDesc || '';
}

// 保存网站标题
function saveSiteTitle() {
    const content = getContent();
    content.siteTitle = document.getElementById('siteTitle').value.trim();
    content.siteSubtitle = document.getElementById('siteSubtitle').value.trim();
    
    if (saveContent(content)) {
        showToast('网站标题已保存');
    }
}

// 保存 Pro 设置
function saveProSettings() {
    const content = getContent();
    content.proPrice = parseFloat(document.getElementById('proPrice').value) || 9.99;
    content.proPeriod = document.getElementById('proPeriod').value;
    content.proDescription = document.getElementById('proDescription').value.trim();
    content.proFeatures = document.getElementById('proFeatures').value.trim();
    
    if (saveContent(content)) {
        showToast('Pro 订阅设置已保存');
    }
}

// 保存页面内容
function savePageContent() {
    const content = getContent();
    content.resumePageTitle = document.getElementById('resumePageTitle').value.trim();
    content.resumePageDesc = document.getElementById('resumePageDesc').value.trim();
    content.coverPageTitle = document.getElementById('coverPageTitle').value.trim();
    content.coverPageDesc = document.getElementById('coverPageDesc').value.trim();
    content.interviewPageTitle = document.getElementById('interviewPageTitle').value.trim();
    content.interviewPageDesc = document.getElementById('interviewPageDesc').value.trim();
    
    if (saveContent(content)) {
        showToast('页面内容已保存');
    }
}

// 显示提示
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.classList.add('active');
        
        setTimeout(() => {
            toast.classList.remove('active');
        }, 3000);
    } else {
        alert(message);
    }
}
