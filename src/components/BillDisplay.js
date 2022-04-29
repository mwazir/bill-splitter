const BillDisplay = (props) => {
    //console.log(props)
    return (
        <>
            <div className="gross-bill-per-person">
                <p>Gross Bill</p>
                <p>/ Person</p>
                <p>{props.grossBill}</p>
            </div>
            <div className="tip-per-person">
                <p>Tip Amount</p>
                <p>/ Person</p>
                <p>$0.00</p>
            </div>
            <div className="total-bill-per-person">
                <p>Total Bill</p>
                <p>/ Person</p>
                <p>$0.00</p>
            </div>
            <button>Save</button>
            <button>Reset</button>
        </>
    )
}

export default BillDisplay