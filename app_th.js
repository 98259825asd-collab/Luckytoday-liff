const result = document.getElementById("result");

let isPaid = false;

function generateThaiLotto() {
  let num = "";
  for (let i = 0; i < 6; i++) {
    num += Math.floor(Math.random() * 10);
  }
  return num;
}

document.getElementById("fortuneBtn").onclick = function() {
  const lotto = generateThaiLotto();
  result.innerHTML = `
  🎟️ <b>เลขเด็ดฟรี</b><br>
  ${lotto}<br>
  <small>ดวงวันนี้ปานกลาง อย่าเสี่ยงมาก</small>
  `;
};

document.getElementById("payBtn").onclick = function() {
  if (!isPaid) {
    alert("กรุณาชำระเงินและส่งหลักฐานก่อน");
    return;
  }

  result.innerHTML = `
  💰 <b>เลขเด็ดพรีเมียม</b><br>
  839241<br>
  <small>ดวงการเงินดีมาก มีโชคใหญ่</small>
  `;
};