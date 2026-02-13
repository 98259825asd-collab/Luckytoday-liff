const result = document.getElementById("result");

let isPaid = false;

// 태국 로또 6자리 생성
function generateThaiLotto() {
  let num = "";
  for (let i = 0; i < 6; i++) {
    num += Math.floor(Math.random() * 10);
  }
  return num;
}

// 무료
document.getElementById("fortuneBtn").onclick = () => {
  const lotto = generateThaiLotto();
  result.innerHTML = `
    🎟️ <b>เลขเด็ดฟรี</b><br>
    ${lotto}<br>
    <small>ดวงวันนี้ปานกลาง อย่าเสี่ยงมาก</small>
  `;
};

// 유료
document.getElementById("payBtn").onclick = () => {
  if (!isPaid) {
    alert("กรุณาชำระเงินเพื่อดูเลขเด็ดทั้งหมด");
    return;
  }

  let output = "💰 <b>เลขเด็ดพรีเมียม</b><br>";
  for (let i = 0; i < 5; i++) {
    output += generateThaiLotto() + "<br>";
  }
  output += "<small>โชคแรง! การเงินเด่น</small>";

  result.innerHTML = output;
};