const result = document.getElementById("result");

let isPaid = false; // 결제 후 true

document.getElementById("fortuneBtn").onclick = () => {
  result.innerHTML = "วันนี้เป็นวันที่ดีปานกลาง 😊";
};

document.getElementById("payBtn").onclick = () => {
  if (!isPaid) {
    alert("กรุณาชำระเงินก่อนใช้งาน");
    return;
  }
  result.innerHTML = "💰 โชคดีมาก! การเงินดี มีโอกาสรับทรัพย์";
};