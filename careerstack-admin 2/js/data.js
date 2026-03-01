// CareerStack 管理后台 - 数据管理模块
// 使用 localStorage 存储所有数据，无需数据库

const STORAGE_KEYS = {
    SUBSCRIBERS: 'careerstack_subscribers',
    CONTENT: 'careerstack_content',
    STATS: 'careerstack_stats'
};

// 初始化示例数据
function initSampleData() {
    // 初始化订阅用户数据
    if (!localStorage.getItem(STORAGE_KEYS.SUBSCRIBERS)) {
        const sampleSubscribers = [
            {
                id: 'I-ABC123456789',
                email: 'john.doe@example.com',
                subscriptionDate: '2026-02-28T10:30:00',
                status: 'active',
                amount: 9.99
            },
            {
                id: 'I-DEF987654321',
                email: 'emma.smith@example.com',
                subscriptionDate: '2026-02-27T15:45:00',
                status: 'active',
                amount: 9.99
            },
            {
                id: 'I-GHI456789123',
                email: 'michael.lee@example.com',
                subscriptionDate: '2026-02-26T09:20:00',
                status: 'cancelled',
                amount: 9.99
            },
            {
                id: 'I-JKL789123456',
                email: 'sarah.jones@example.com',
                subscriptionDate: '2026-02-25T14:10:00',
                status: 'active',
                amount: 9.99
            },
            {
                id: 'I-MNO321654987',
                email: 'david.wang@example.com',
                subscriptionDate: '2026-02-24T11:30:00',
                status: 'active',
                amount: 9.99
            }
        ];
        localStorage.setItem(STORAGE_KEYS.SUBSCRIBERS, JSON.stringify(sampleSubscribers));
    }

    // 初始化内容设置
    if (!localStorage.getItem(STORAGE_KEYS.CONTENT)) {
        const defaultContent = {
            siteTitle: 'CareerStack',
            siteSubtitle: 'Your All-in-One Job Search Toolkit',
            proPrice: 9.99,
            proPeriod: 'month',
            proDescription: '解锁所有模板 + 无限关键词工具 + 无广告',
            proFeatures: '✅ Access to all resume templates\n✅ Unlimited keyword optimization\n✅ Ad-free experience\n✅ Priority support',
            resumePageTitle: 'ATS-Friendly Resume Templates',
            resumePageDesc: '8 professionally designed templates plus 3 complete resume samples',
            coverPageTitle: 'Professional Cover Letter Templates',
            coverPageDesc: '8 customizable samples for every career stage and industry',
            interviewPageTitle: 'Interview Preparation Guide',
            interviewPageDesc: '50 common interview questions with sample answers'
        };
        localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(defaultContent));
    }
}

// 获取所有订阅用户
function getSubscribers() {
    const data = localStorage.getItem(STORAGE_KEYS.SUBSCRIBERS);
    return data ? JSON.parse(data) : [];
}

// 保存订阅用户
function saveSubscribers(subscribers) {
    localStorage.setItem(STORAGE_KEYS.SUBSCRIBERS, JSON.stringify(subscribers));
}

// 添加新订阅用户
function addSubscriber(subscriber) {
    const subscribers = getSubscribers();
    subscribers.unshift({
        ...subscriber,
        subscriptionDate: new Date().toISOString()
    });
    saveSubscribers(subscribers);
    return true;
}

// 更新订阅用户状态
function updateSubscriberStatus(id, status) {
    const subscribers = getSubscribers();
    const index = subscribers.findIndex(s => s.id === id);
    if (index !== -1) {
        subscribers[index].status = status;
        saveSubscribers(subscribers);
        return true;
    }
    return false;
}

// 删除订阅用户
function deleteSubscriber(id) {
    const subscribers = getSubscribers();
    const filtered = subscribers.filter(s => s.id !== id);
    saveSubscribers(filtered);
    return true;
}

// 搜索订阅用户
function searchSubscribers(query) {
    const subscribers = getSubscribers();
    if (!query) return subscribers;
    
    const lowerQuery = query.toLowerCase();
    return subscribers.filter(s => 
        s.email.toLowerCase().includes(lowerQuery) || 
        s.id.toLowerCase().includes(lowerQuery)
    );
}

// 按状态筛选
function filterSubscribersByStatus(status) {
    const subscribers = getSubscribers();
    if (!status) return subscribers;
    return subscribers.filter(s => s.status === status);
}

// 获取统计数据
function getStats() {
    const subscribers = getSubscribers();
    const today = new Date().toDateString();
    
    const totalSubscribers = subscribers.length;
    const activeSubscribers = subscribers.filter(s => s.status === 'active').length;
    const monthlyRevenue = activeSubscribers * 9.99;
    
    // 计算今日新增
    const todayNew = subscribers.filter(s => {
        const subDate = new Date(s.subscriptionDate);
        return subDate.toDateString() === today;
    }).length;
    
    return {
        totalSubscribers,
        activeSubscribers,
        monthlyRevenue,
        todayNew
    };
}

// 获取最近订阅（前5个）
function getRecentSubscribers(count = 5) {
    const subscribers = getSubscribers();
    return subscribers.slice(0, count);
}

// 获取内容设置
function getContent() {
    const data = localStorage.getItem(STORAGE_KEYS.CONTENT);
    return data ? JSON.parse(data) : {};
}

// 保存内容设置
function saveContent(content) {
    localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(content));
    return true;
}

// 导出数据为JSON
function exportData() {
    const data = {
        subscribers: getSubscribers(),
        content: getContent(),
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `careerstack-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// 格式化货币
function formatCurrency(amount) {
    return '$' + amount.toFixed(2);
}

// 初始化数据
document.addEventListener('DOMContentLoaded', function() {
    initSampleData();
});
