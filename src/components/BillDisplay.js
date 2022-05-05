const BillDisplay = (props) => {
    return (
        <div className="bill-display-container">
            <div className="gross-bill-per-person">
                <div className="display-label-container">
                        <p>Gross Bill</p>
                        <p className="per-person-label">/ Person</p>
                </div>
                <p className="amount-display">{props.grossBillPerPersonState}</p>
            </div>
            <div className="tip-per-person">
                <div className="display-label-container">
                    <p>Tip Amount</p>
                    <p className="per-person-label">/ Person</p>
                </div>
                <p className="amount-display">{props.tipPerPersonState}</p>
            </div>
            <div className="total-bill-per-person">
                <div className="display-label-container">
                    <p>Total Bill</p>
                    <p className="per-person-label">/ Person</p>
                </div>
                <p className="amount-display">{props.totalBillPerPersonState}</p>
            </div>
            <div className="button-container">
                <button className="save-btn" onClick={props.updateDatabase}>SAVE</button>
                <button className="reset-btn" onClick={props.resetForm}>RESET</button>
            </div>
        </div>
    )
}

export default BillDisplay