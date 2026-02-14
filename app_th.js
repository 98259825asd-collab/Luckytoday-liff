const result = document.getElementById("result");

function generateThaiLotto() {
  let num = "";
  for (let i = 0; i < 6; i++) num += Math.floor(Math.random() * 10);
  return num;
}

// ✅ 저장된 결제상태(브라우저에 저장)
let isPaid = localStorage.getItem("isPaid") === "true";

// ✅ 오늘 날짜로 매일 바뀌는 코드 생성 (태국시간 기준으로 쓰고 싶으면 +7로 맞춰도 됨)
function getDailyCode() {
  const now = new Date();

  // YYYYMMDD (로컬 시간 기준)
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const ymd = `${y}${m}${d}`;

  // 간단 해시 → 4자리 코드
  let hash = 0;
  for (let i = 0; i < ymd.length; i++) hash = (hash * 31 + ymd.charCodeAt(i)) % 10000;

  return String(hash).padStart(4, "0");
}

// ✅ 관리자(너)가 오늘 유저에게 줄 코드
const DAILY_CODE = getDailyCode();

// 무료
document.getElementById("fortuneBtn").onclick = function () {
  const lotto = generateThaiLotto();
  result.innerHTML = `
    🎟️ <b>เลขเด็ดฟรี</b><br>
    ${lotto}<br>
    <small>ดวงวันนี้ปานกลาง อย่าเสี่ยงมาก</small>
  `;
};

// 프리미엄
document.getElementById("payBtn").onclick = function () {
  if (!isPaid) {
    alert("กรุณาชำระเงินและส่งสลิปก่อน แล้วใส่รหัสเพื่อปลดล็อก");
    return;
  }

  const premium = generateThaiLotto();
  result.innerHTML = `
    💎 <b>เลขเด็ดพรีเมียม</b><br>
    ${premium}<br>
    <small>ดวงการเงินดีมาก มีโชคใหญ่</small>
  `;
};

// ✅ 코드 확인
document.getElementById("verifyBtn").onclick = function () {
  const code = document.getElementById("codeInput").value.trim();

  if (code === DAILY_CODE) {
    isPaid = true;
    localStorage.setItem("isPaid", "true");
    alert("✅ ปลดล็อกพรีเมียมสำเร็จ! ตอนนี้กด 'ดูดวงแบบพรีเมียม' ได้เลย");
    return;
  }

  alert("❌ รหัสไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง");
};