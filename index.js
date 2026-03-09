function accountAction()
{
    let balance=0;

    function depositAmount(num)
    {
       
        balance+=num;
        console.log(num + " deposited successfully your current balance is " + balance);
    }
    function getBalance()
    {
        return balance;
    }

    return{
        depositAmount,
        getBalance
    }
}

const account= accountAction();

account.depositAmount(100);
account.depositAmount(100);
account.depositAmount(4400);
console.log(account.getBalance());