// CareerStack 管理后台 - 数据看板模块

document.addEventListener('DOMContentLoaded', function() {
    // 加载统计数据
    loadStats();
    
    // 加载最近订阅
    loadRecentSubscribers();
});

// 加载统计数据
function loadStats() {
    const stats = getStats();
    
    document.getElementById('totalSubscribers').textContent = stats.totalSubscribers;
    document.getElementById('monthlyRevenue').textContent = '$' + stats.monthlyRevenue.toFixed(2);
    document.getElementById('todayNew').textContent = stats.todayNew;
    document.getElementById('activeSubscribers').textContent = stats.activeSubscribers;
}

// 加载最近订阅
function loadRecentSubscribers() {
    const subscribers = getRecentSubscribers(5);
    const tbody = document.getElementById('recentSubscribers');
    
    if (subscribers.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" class="empty-state">
                    <div class="empty-state-icon">📭</div>
                    <h3>暂无订阅数据</h3>
                    <p>当有用户订阅时，数据将显示在这里</p>
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = subscribers.map(sub => `
        <tr>
            <td>${sub.email}</td>
            <td>${formatDate(sub.subscriptionDate)}</td>
            <td><code>${sub.id}</code></td>
            <td>
                <span class="status-badge ${sub.status === 'active' ? 'status-active' : 'status-cancelled'}">
                    ${sub.status === 'active' ? '活跃' : '已取消'}
                </span>
            </td>
        </tr>
    `).join('');
}
