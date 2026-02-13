const result = document.getElementById("result");

let isPaid = false; // 결제 후 true로 변경

document.getElementById("fortuneBtn").onclick = () => {
  result.innerHTML = "오늘은 무난한 하루입니다 🙂";
};

document.getElementById("payBtn").onclick = () => {
  if (!isPaid) {
    alert("유료 결제 후 이용 가능합니다");
    return;
  }
  result.innerHTML = "💰 대길! 재물운 상승, 귀인 등장!";
};