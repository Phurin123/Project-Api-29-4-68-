// รับ email จาก URL ถ้ามี
const urlParams = new URLSearchParams(window.location.search);
const emailFromURL = urlParams.get('email');

// ถ้ายังไม่มี email ใน sessionStorage แต่มีใน URL ให้เก็บไว้
if (emailFromURL && !sessionStorage.getItem('userEmail')) {
    sessionStorage.setItem('userEmail', emailFromURL);
}

// ฟังก์ชันในการดึงข้อมูล API Keys ของผู้ใช้
function fetchApiKeys() {
    // ดึงอีเมลจาก sessionStorage ที่เก็บไว้ในระหว่างการ login
    const email = sessionStorage.getItem('userEmail');

    if (!email) {
        document.getElementById("apiKeysList").innerHTML = "<p>กรุณาเข้าสู่ระบบก่อน</p>";
        return;
    }

    fetch(`https://project-api-objectxify.onrender.com/get-api-keys?email=${email}`)  // แนะนำให้เปลี่ยน URL ให้เรียก Render จริง
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById("apiKeysList").innerHTML = `<p>${data.error}</p>`;
            } else {
                let apiKeysHtml = "";
                data.api_keys.forEach(key => {
                    apiKeysHtml += `
                        <div class="api-key">
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>API Key:</strong> ${key.api_key}</p>
                            <p><strong>Analysis Types:</strong> ${key.analysis_types.join(", ")}</p>
                            <p><strong>Quota:</strong> ${key.quota}</p>
                        </div>
                    `;
                });
                document.getElementById("apiKeysList").innerHTML = apiKeysHtml;
            }
        })
        .catch(error => {
            console.error("Error fetching API keys:", error);
            document.getElementById("apiKeysList").innerHTML = "<p>เกิดข้อผิดพลาดในการดึงข้อมูล API Keys</p>";
        });
}

// เรียกใช้งานฟังก์ชันเมื่อโหลดหน้า
window.onload = function () {
    fetchApiKeys();
};
