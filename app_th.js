const result = document.getElementById("result");

const fortuneBtn = document.getElementById("fortuneBtn");
const payBtn = document.getElementById("payBtn");
const verifyBtn = document.getElementById("verifyBtn");
const codeInput = document.getElementById("codeInput");

let isPaid = false;

// ====== 오늘 날짜로 4자리 코드 자동생성 ======
function getDailyCode() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const ymd = `${y}${m}${d}`;

  let hash = 0;
  for (let i = 0; i < ymd.length; i++) {
    hash = (hash * 31 + ymd.charCodeAt(i)) % 10000;
  }
  return String(hash).padStart(4, "0");
}
const DAILY_CODE = getDailyCode();

// ====== 로컬 저장(48시간 유효) ======
const PREMIUM_HOURS = 48;

function nowMs() { return Date.now(); }
function getPremiumUntil() {
  const v = localStorage.getItem("premium_until");
  return v ? Number(v) : 0;
}
function setPremiumUntil(ms) {
  localStorage.setItem("premium_until", String(ms));
}
function isPremiumActive() {
  return getPremiumUntil() > nowMs();
}

// ====== 숫자 생성 ======
function generateThaiLotto() {
  let num = "";
  for (let i = 0; i < 6; i++) {
    num += Math.floor(Math.random() * 10);
  }
  return num;
}

// ====== 화면 표시 ======
function showFree() {
  const lotto = generateThaiLotto();
  result.innerHTML = `
    🎟️ <b>เลขเด็ดฟรี</b><br>
    <b>${lotto}</b><br>
    <small>ดวงวันนี้ปานกลาง อย่าเสี่ยงมาก</small>
  `;
}

function showPremium() {
  const a = generateThaiLotto();
  const b = generateThaiLotto();
  const c = generateThaiLotto();

  result.innerHTML = `
    💎 <b>เลขเด็ดพรีเมียม</b><br>
    ✅ ชุด A: <b>${a}</b><br>
    ✅ ชุด B: <b>${b}</b><br>
    ✅ ชุด C: <b>${c}</b><br>
    <small>ดวงการเงินดีมาก มีโชคใหญ่</small>
  `;

  // ✅ 테스트용: 관리자 오늘 코드 표시(원하면 지워도 됨)
  result.innerHTML += `
    <div style="margin-top:10px;font-size:12px;color:#888">
      Admin today code: ${DAILY_CODE}
    </div>
  `;
}

// ====== 버튼 이벤트 ======
fortuneBtn.onclick = () => {
  showFree();
};

payBtn.onclick = () => {
  if (isPremiumActive()) {
    showPremium();
    return;
  }
  alert("กรุณาชำระเงินและส่งสลิปก่อน แล้วใส่รหัสเพื่อปลดล็อก");
};

// 코드 확인
verifyBtn.onclick = () => {
  const code = (codeInput.value || "").trim();

  if (code !== DAILY_CODE) {
    alert("❌ รหัสไม่ถูกต้อง");
    return;
  }

  const until = nowMs() + PREMIUM_HOURS * 60 * 60 * 1000;
  setPremiumUntil(until);

  alert("✅ ปลดล็อกสำเร็จ! ใช้งานได้ 48 ชั่วโมง");
  showPremium();
};

// Enter 키로도 확인
codeInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") verifyBtn.click();
});

// 최초 로딩
showFree();
if (isPremiumActive()) showPremium();