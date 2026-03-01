// CareerStack 管理后台 - 用户管理模块

let currentPage = 1;
const pageSize = 10;
let currentSubscribers = [];

document.addEventListener('DOMContentLoaded', function() {
    // 加载用户列表
    loadUsers();
    
    // 添加用户表单
    const addUserForm = document.getElementById('addUserForm');
    if (addUserForm) {
        addUserForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleAddUser();
        });
    }
});

// 加载用户列表
function loadUsers() {
    currentSubscribers = getSubscribers();
    renderUsers();
}

// 渲染用户列表
function renderUsers() {
    const tbody = document.getElementById('usersTableBody');
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const pageData = currentSubscribers.slice(start, end);
    
    if (pageData.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="empty-state">
                    <div class="empty-state-icon">👤</div>
                    <h3>暂无用户数据</h3>
                    <p>点击"添加用户"按钮手动添加订阅用户</p>
                </td>
            </tr>
        `;
        renderPagination(0);
        return;
    }
    
    tbody.innerHTML = pageData.map(sub => `
        <tr>
            <td>${sub.email}</td>
            <td>${formatDate(sub.subscriptionDate)}</td>
            <td><code>${sub.id}</code></td>
            <td>
                <span class="status-badge ${sub.status === 'active' ? 'status-active' : 'status-cancelled'}">
                    ${sub.status === 'active' ? '活跃' : '已取消'}
                </span>
            </td>
            <td>
                <button class="btn-secondary" onclick="toggleStatus('${sub.id}', '${sub.status}')" style="padding: 6px 12px; font-size: 12px;">
                    ${sub.status === 'active' ? '取消' : '激活'}
                </button>
                <button class="btn-secondary" onclick="deleteUser('${sub.id}')" style="padding: 6px 12px; font-size: 12px; margin-left: 8px; color: #FF4D4F;">
                    删除
                </button>
            </td>
        </tr>
    `).join('');
    
    renderPagination(currentSubscribers.length);
}

// 渲染分页
function renderPagination(total) {
    const totalPages = Math.ceil(total / pageSize);
    const pagination = document.getElementById('pagination');
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let html = '';
    
    // 上一页
    html += `<button ${currentPage === 1 ? 'disabled' : ''} onclick="goToPage(${currentPage - 1})">上一页</button>`;
    
    // 页码
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            html += `<button class="${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            html += `<span>...</span>`;
        }
    }
    
    // 下一页
    html += `<button ${currentPage === totalPages ? 'disabled' : ''} onclick="goToPage(${currentPage + 1})">下一页</button>`;
    
    pagination.innerHTML = html;
}

// 跳转页面
function goToPage(page) {
    currentPage = page;
    renderUsers();
}

// 搜索用户
function searchUsers() {
    const query = document.getElementById('searchInput').value.trim();
    currentSubscribers = searchSubscribers(query);
    currentPage = 1;
    renderUsers();
}

// 筛选用户
function filterUsers() {
    const status = document.getElementById('statusFilter').value;
    currentSubscribers = filterSubscribersByStatus(status);
    currentPage = 1;
    renderUsers();
}

// 切换状态
function toggleStatus(id, currentStatus) {
    const newStatus = currentStatus === 'active' ? 'cancelled' : 'active';
    if (updateSubscriberStatus(id, newStatus)) {
        loadUsers();
        showToast('状态更新成功');
    }
}

// 删除用户
function deleteUser(id) {
    if (confirm('确定要删除这个用户吗？此操作不可恢复。')) {
        if (deleteSubscriber(id)) {
            loadUsers();
            showToast('用户已删除');
        }
    }
}

// 打开添加弹窗
function openAddModal() {
    document.getElementById('addModal').classList.add('active');
}

// 关闭添加弹窗
function closeAddModal() {
    document.getElementById('addModal').classList.remove('active');
    document.getElementById('addUserForm').reset();
}

// 处理添加用户
function handleAddUser() {
    const email = document.getElementById('newUserEmail').value.trim();
    const subscriptionId = document.getElementById('newUserSubscriptionId').value.trim();
    const status = document.getElementById('newUserStatus').value;
    
    if (!email || !subscriptionId) {
        alert('请填写完整信息');
        return;
    }
    
    const subscriber = {
        id: subscriptionId,
        email: email,
        status: status,
        amount: 9.99
    };
    
    if (addSubscriber(subscriber)) {
        closeAddModal();
        loadUsers();
        showToast('用户添加成功');
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
