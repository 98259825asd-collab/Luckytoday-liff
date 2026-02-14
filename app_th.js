const result = document.getElementById("result");

const fortuneBtn = document.getElementById("fortuneBtn");
const payBtn = document.getElementById("payBtn");
const verifyBtn = document.getElementById("verifyBtn");
const codeInput = document.getElementById("codeInput");
const refreshPremiumBtn = document.getElementById("refreshPremiumBtn");

// ====== 설정 ======
const PREMIUM_HOURS = 48; // 유효시간(시간 단위)

// 매일 바뀌는 4자리 코드 생성
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

// ====== 저장값 ======
function nowMs() {
  return Date.now();
}
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

// 하루 1회 새번호 제한용
function getRefreshKey() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `refresh_${y}${m}${d}`;
}
function canRefreshToday() {
  return localStorage.getItem(getRefreshKey()) !== "1";
}
function markRefreshedToday() {
  localStorage.setItem(getRefreshKey(), "1");
}

// ====== 로또 생성 ======
function generateThaiLotto() {
  let num = "";
  for (let i = 0; i < 6; i++) num += Math.floor(Math.random() * 10);
  return num;
}

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
    <small>โชคลาภแรง มีเกณฑ์ถูกรางวัล</small>
  `;

  // 언락 성공 후 입력칸 숨김
  codeInput.style.display = "none";
  verifyBtn.style.display = "none";

  // 새번호 버튼 표시
  refreshPremiumBtn.style.display = "inline-block";
}

function showNeedUnlock() {
  // 언락 입력칸 보이기
  codeInput.style.display = "inline-block";
  verifyBtn.style.display = "inline-block";

  // 새번호 버튼 숨김
  refreshPremiumBtn.style.display = "none";
}

// ====== 이벤트 ======
fortuneBtn.onclick = () => {
  showFree();
};

payBtn.onclick = () => {
  if (isPremiumActive()) {
    showPremium();
  } else {
    showNeedUnlock();
    alert("กรุณาชำระเงินและส่งสลิปก่อน แล้วใส่รหัสเพื่อปลดล็อก");
  }
};

// 코드 확인 → 48시간 활성화
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

// 새번호(하루 1회)
refreshPremiumBtn.onclick = () => {
  if (!isPremiumActive()) {
    alert("หมดอายุแล้ว กรุณาปลดล็อกใหม่");
    showNeedUnlock();
    return;
  }
  if (!canRefreshToday()) {
    alert("วันนี้คุณสุ่มใหม่ไปแล้ว พรุ่งนี้ลองใหม่ได้");
    return;
  }
  markRefreshedToday();
  showPremium();
};

// Enter 키로 코드 확인
codeInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") verifyBtn.click();
});

// 최초 로딩
showFree();
if (isPremiumActive()) {
  showPremium();
} else {
  showNeedUnlock();
}