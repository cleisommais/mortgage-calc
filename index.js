//The interest rate per year
const rate = 6.70;
//The value of the mortgate
const homeValue = 350000;
const downPayment = 100000;
let totalHome = parseFloat(homeValue - downPayment);
const length = 30;// 30 years plan
//To test the payment bi-week or per month, just change this variable.
const isBiWeekPayment = true;
//To finish the mortgage fast, we are going to put some money for each period, to reduz the total principal debit
const extraPaymentBiWeek = isBiWeekPayment ? 1700 : 3400;
const periodPerYear = isBiWeekPayment ? 24 : 12;
const namePeriod = isBiWeekPayment ? 'Bi-week' : 'Month';
//Finding the payment per period, it could be bi-week or month
const totalMortgate = calcPaymentPerPeriod(totalHome, rate, periodPerYear, length);
const totalInterest = calcInterestPayment(totalHome, extraPaymentBiWeek, periodPerYear, length)
console.log('\n');
console.log('Total interest paied: $' + totalInterest.toFixed(2));

/**
 * 
 * @param {Double} totalHome 
 * @param {Double} rate 
 * @param {Integer} periodPerYear 
 * @param {Integer} length 
 * @returns {Double}
 */
function calcPaymentPerPeriod(totalHome = 0.0, rate = 0.0, periodPerYear = 12, length = 30) {
    const paymentPerPeriod = (totalHome * Math.pow(1 + (rate / 100 / periodPerYear), periodPerYear * length) * (rate / 100 / periodPerYear) / (Math.pow(1 + (rate / 100 / periodPerYear), periodPerYear * length) - 1));
    return paymentPerPeriod;
}

/**
 * 
 * @param {Double} totalHome 
 * @param {Double} extraPaymentBiWeek 
 * @param {Integer} periodPerYear 
 * @param {Integer} length 
 * @param {String} namePeriod 
 * @returns {Double}
 */
function calcInterestPayment(totalHome = 0.0, extraPaymentBiWeek = 0.0, periodPerYear = 12, length = 30, namePeriod = '') {
    let totalInterest = 0;
    console.log('=========================================================================');
    console.log('=========================================================================');
    console.log('=========================================================================');

    for (let year = 1; year <= length; year++) {
        console.log('\n');
        console.log('==================== Starting Year ' + year + ' =========================');
        console.log('\n');
        for (let count = 1; count <= periodPerYear; count++) {
            let totalInterestPerPeriod = parseFloat((totalHome * rate / 100) / periodPerYear);
            totalInterest = parseFloat(totalInterest) + parseFloat(totalInterestPerPeriod);
            let totalPrincipalPerPeriod = parseFloat(totalMortgate) - parseFloat(totalInterestPerPeriod);
            let totalAmountPaidPerPeriod = parseFloat(totalInterestPerPeriod) + parseFloat(totalPrincipalPerPeriod);
            console.log(`Interest amount paid ${namePeriod} ${count} => $${totalInterestPerPeriod.toFixed(2)}`);
            console.log(`Principal amount paid ${namePeriod} ${count} => $${totalPrincipalPerPeriod.toFixed(2)}`);
            console.log(`Total amout period paid: $${totalAmountPaidPerPeriod.toFixed(2)}`)
            console.log('\n');
            //If the principal amount debit is less than zero, THEN it means the debit is paid in full
            //Stop the loop.
            totalHome = parseFloat(totalHome) - parseFloat(totalPrincipalPerPeriod) - parseFloat(extraPaymentBiWeek);
            if (parseFloat(totalHome) <= 0) {
                break;
            }
        }
        console.log('==================== Finishing Year ' + year + ' =======================');
        //If the principal amount debit is less than zero, THEN it means the debit is paid in full
        //Stop the loop.
        if (parseFloat(totalHome) <= 0) {
            break;
        }
    }
    return totalInterest;
}

