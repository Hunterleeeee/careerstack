// CareerStack 管理后台 - 认证模块
// 纯本地存储，无需后端

const AUTH_KEY = 'careerstack_admin_auth';
const DEFAULT_PASSWORD = 'admin123';

// 检查登录状态
function checkAuth() {
    const auth = localStorage.getItem(AUTH_KEY);
    if (!auth) {
        // 未登录，跳转到登录页
        if (!window.location.pathname.includes('index.html')) {
            window.location.href = 'index.html';
        }
        return false;
    }
    
    try {
        const authData = JSON.parse(auth);
        // 检查是否过期（24小时）
        if (Date.now() - authData.timestamp > 24 * 60 * 60 * 1000) {
            logout();
            return false;
        }
        return true;
    } catch (e) {
        logout();
        return false;
    }
}

// 登录
function login(password) {
    if (password === DEFAULT_PASSWORD) {
        const authData = {
            loggedIn: true,
            timestamp: Date.now()
        };
        localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
        return true;
    }
    return false;
}

// 退出登录
function logout() {
    localStorage.removeItem(AUTH_KEY);
    window.location.href = 'index.html';
}

// 登录表单处理
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const password = document.getElementById('password').value;
            
            if (login(password)) {
                window.location.href = 'dashboard.html';
            } else {
                alert('密码错误，请重试');
            }
        });
    }
    
    // 检查认证状态（登录页除外）
    if (!window.location.pathname.includes('index.html')) {
        checkAuth();
    }
});
