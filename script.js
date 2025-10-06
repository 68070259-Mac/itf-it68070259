document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------------
    // 1. Bank Operation (Deposit/Withdraw)
    // ------------------------------------------
    
    // กำหนดยอดคงเหลือเริ่มต้น
    let currentAccountBalance = 1000;
    let currentCashBalance = 1000;
    
    // อ้างอิง DOM elements
    const accountDisplay = document.getElementById('current-account-display');
    const cashDisplay = document.getElementById('current-cash-display');
    const operationType = document.getElementById('operation-type');
    const operationAmountInput = document.getElementById('operation-amount');
    const proceedButton = document.getElementById('proceed-btn');
    
    // อัพเดทยอดคงเหลือในหน้าเว็บ
    function updateBalances() {
        accountDisplay.textContent = currentAccountBalance.toFixed(0);
        cashDisplay.textContent = currentCashBalance.toFixed(0);
        document.getElementById('account-balance').value = currentAccountBalance.toFixed(0);
        document.getElementById('cash-balance').value = currentCashBalance.toFixed(0);
    }

    // ฟังก์ชันดำเนินการ (ฝาก/ถอน)
    proceedButton.addEventListener('click', () => {
        const type = operationType.value;
        const amount = parseFloat(operationAmountInput.value);

        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount.');
            return;
        }

        if (type === 'deposit') {
            currentAccountBalance += amount;
            alert(`Deposited ${amount} successfully. New balance: ${currentAccountBalance}`);
        } else if (type === 'withdraw') {
            if (currentAccountBalance >= amount) {
                currentAccountBalance -= amount;
                alert(`Withdrew ${amount} successfully. New balance: ${currentAccountBalance}`);
            } else {
                alert('Insufficient account balance.');
            }
        }
        
        updateBalances(); // อัพเดทตัวเลขบนหน้าจอ
        operationAmountInput.value = 1; // ล้างค่า
    });
    
    // อัพเดทค่าเริ่มต้นเมื่อโหลดหน้า
    updateBalances(); 

    // ------------------------------------------
    // 2. Currency Converter (USD, THB)
    // ------------------------------------------
    
    // อัตราแลกเปลี่ยน (เป็นค่าคงที่สำหรับการจำลอง, ในชีวิตจริงต้องใช้ API)
    // สมมติ: 1 USD = 35 THB
    const EXCHANGE_RATE = 35.00; 

    // อ้างอิง DOM elements สำหรับ Currency Converter
    const inputBalance = document.getElementById('input-balance');
    const outputBalance = document.getElementById('output-balance');
    const inputCurrency = document.getElementById('input-currency');
    const outputCurrency = document.getElementById('output-currency');
    const convertButton = document.getElementById('convert-btn');

    // ฟังก์ชันแปลงสกุลเงิน
    convertButton.addEventListener('click', () => {
        const amount = parseFloat(inputBalance.value);
        const fromCurr = inputCurrency.value;
        const toCurr = outputCurrency.value;
        let result = 0;

        if (isNaN(amount) || amount < 0) {
            outputBalance.value = 'Invalid Amount';
            return;
        }

        if (fromCurr === toCurr) {
            result = amount;
        } 
        // แปลงจาก THB เป็น USD
        else if (fromCurr === 'THB' && toCurr === 'USD') {
            result = amount / EXCHANGE_RATE;
        } 
        // แปลงจาก USD เป็น THB
        else if (fromCurr === 'USD' && toCurr === 'THB') {
            result = amount * EXCHANGE_RATE;
        }

        outputBalance.value = result.toFixed(2); // แสดงผลลัพธ์ทศนิยม 2 ตำแหน่ง
    });
});
