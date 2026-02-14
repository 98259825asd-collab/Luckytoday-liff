const result = document.getElementById("result");
const paymentBox = document.getElementById("paymentBox");
const fortuneBtn = document.getElementById("fortuneBtn");
const payBtn = document.getElementById("payBtn");
const unlockBtn = document.getElementById("unlockBtn");
const unlockCodeInput = document.getElementById("unlockCode");
const closePay = document.getElementById("closePay");

// ✅ 간단 잠금 상태 (브라우저에 저장)
let isPaid = localStorage.getItem("isPaid") === "1";

// ✅ 테스트용 언락 코드 (나중에 바꿔도 됨)
const UNLOCK_CODE = "9999";

// 6자리 태국 로또 번호 생성
function generateThaiLotto() {
  let num = "";
  for (let i = 0; i < 6; i++) {
    num += Math.floor(Math.random() * 10);
  }
  return num;
}

// 프리미엄 결과 출력
function showPremium() {
  const a = generateThaiLotto();
  const b = generateThaiLotto();
  const c = generateThaiLotto();

  result.innerHTML = `
    💰 <b>เลขเด็ดพรีเมียม</b><br>
    ✅ ชุด A: <b>${a}</b><br>
    ✅ ชุด B: <b>${b}</b><br>
    ✅ ชุด C: <b>${c}</b><br>
    <small>โชคลาภแรง มีเกณฑ์ถูกรางวัล</small>
  `;
}

// 무료 버튼
fortuneBtn.onclick = () => {
  paymentBox.style.display = "none";

  const lotto = generateThaiLotto();
  result.innerHTML = `
    🎟️ <b>เลขเด็ดฟรี</b><br>
    <b>${lotto}</b><br>
    <small>ดวงวันนี้ปานกลาง อย่าเสี่ยงมาก</small>
  `;
};

// 유료 버튼
payBtn.onclick = () => {
  if (isPaid) {
    paymentBox.style.display = "none";
    showPremium();
    return;
  }

  // 잠금이면 결제/언락 박스 보여주기
  result.innerHTML = `🔒 <b>ยังไม่ปลดล็อก</b><br><small>โปรดชำระเงินก่อน แล้วใส่โค้ดเพื่อปลดล็อก</small>`;
  paymentBox.style.display = "block";
  unlockCodeInput.focus();
};

// 언락 버튼
unlockBtn.onclick = () => {
  const code = (unlockCodeInput.value || "").trim();

  if (code !== UNLOCK_CODE) {
    alert("โค้ดไม่ถูกต้อง");
    return;
  }

  isPaid = true;
  localStorage.setItem("isPaid", "1");
  paymentBox.style.display = "none";
  unlockCodeInput.value = "";
  showPremium();
};

// 결제 박스 닫기
closePay.onclick = () => {
  paymentBox.style.display = "none";
};

// 엔터키로 언락
unlockCodeInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") unlockBtn.click();
});