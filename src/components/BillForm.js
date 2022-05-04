import { useState } from 'react'

const BillForm = (props) => {
    return (
        <div className="bill-form-container">
            <form action="">
                <label htmlFor="restaurant-name" className="form-label">Restaurant Name</label>
                <input type="text" className="form-text-input restaurant-name-input" placeholder='ABC Restaurant' value={props.restaurantNameState} onChange={props.updateRestaurantName}/>
                <label htmlFor="bill-amount" className="form-label">Bill Amount</label>
                <input type="number" className="form-text-input" name="bill-amount" value={props.grossBillAmountState} placeholder={0} onChange={props.updateGrossBillAmount}/>
                <fieldset onChange={props.updateGrossTipAmount}>
                    <legend className="form-label">Select Tip %</legend>
                    <div className="tip-button-container">
                        <input type="radio" id="0%" name="tip-percentage" value={0.00} />
                        <label htmlFor="5%" className="sr-only">0%</label>
                        <input type="radio" id="5%" name="tip-percentage" value={0.05} />
                        <label htmlFor="5%">5%</label>
                        <input type="radio" id="10%" name="tip-percentage" value={0.10} />
                        <label htmlFor="10%">10%</label>
                        <input type="radio" id="15%" name="tip-percentage" value={0.15} />
                        <label htmlFor="15%">15%</label>
                        <input type="radio" id="25%" name="tip-percentage" value={0.25} />
                        <label htmlFor="25%">25%</label>
                        <input type="radio" id="50%" name="tip-percentage" value={0.5} />
                        <label htmlFor="50%">50%</label>
                        <input type="radio" id="custom" name="tip-percentage" value="custom" checked={props.customTipEnabledState} />
                        <label htmlFor="custom" className="custom-label">Custom</label>
                        <input type="number" name="other-amount" className="custom-input" value={props.tipTextInputValueState} placeholder='Custom' onChange={props.updateTipAmount} />
                    </div>
                </fieldset>
                <label htmlFor="group-size" className="form-label">Number of People</label>
                <input type="number" className="form-text-input" name="group-size" value={props.groupSizeState} placeholder={1} onChange={props.updateGroupSize}/>
            </form>
        </div>
    )
}

export default BillForm