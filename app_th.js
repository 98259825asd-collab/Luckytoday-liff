const result = document.getElementById("result");

function generateThaiLotto() {
  let num = "";
  for (let i = 0; i < 6; i++) num += Math.floor(Math.random() * 10);
  return num;
}

// ✅ 저장된 결제상태(브라우저에 저장)
let isPaid = localStorage.getItem("isPaid") === "true";

// ✅ 관리자 승인코드 (너가 유저에게 알려줄 코드)
const ADMIN_CODE = "9999";

// 무료
document.getElementById("fortuneBtn").onclick = function () {
  const lotto = generateThaiLotto();
  result.innerHTML = `
    🎟️ <b>เลขเด็ดฟรี</b><br>
    ${lotto}<br>
    <small>ดวงวันนี้ปานกลาง อย่าเสี่ยงมาก</small>
  `;
};

// 프리미엄 버튼
document.getElementById("payBtn").onclick = function () {
  if (!isPaid) {
    alert("กรุณาชำระเงินและส่งสลิปก่อน แล้วใส่รหัสเพื่อปลดล็อก");
    return;
  }

  // ✅ 프리미엄 결과
  const premium = generateThaiLotto();
  result.innerHTML = `
    💎 <b>เลขเด็ดพรีเมียม</b><br>
    ${premium}<br>
    <small>ดวงการเงินดีมาก มีโชคใหญ่</small>
  `;
};

// ✅ 코드 확인 버튼
document.getElementById("verifyBtn").onclick = function () {
  const code = document.getElementById("codeInput").value.trim();

  if (code === ADMIN_CODE) {
    isPaid = true;
    localStorage.setItem("isPaid", "true");
    alert("✅ ปลดล็อกพรีเมียมสำเร็จ! ตอนนี้กด 'ดูดวงแบบพรีเมียม' ได้เลย");
    return;
  }

  alert("❌ รหัสไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง");
};