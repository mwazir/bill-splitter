const BillForm = () => {
    return (
        <>
            <form action="">
                <label htmlFor="restaurant-name">Restaurant Name</label>
                <input type="text" />
                <label htmlFor="bill-amount">Bill Amount</label>
                <input type="text" />
                <fieldset>
                    <legend>Select Tip %</legend>
                    <label htmlFor="5%">5%</label>
                    <input type="radio" id="5%" name="tip-percentage" />
                    <label htmlFor="10%">10%</label>
                    <input type="radio" id="10%" name="tip-percentage" />
                    <label htmlFor="15%">15%</label>
                    <input type="radio" id="15%" name="tip-percentage" />
                    <label htmlFor="25%">25%</label>
                    <input type="radio" id="25%" name="tip-percentage" />
                    <label htmlFor="50%">50%</label>
                    <input type="radio" id="50%" name="tip-percentage" />
                    <label htmlFor="custom">Custom</label>
                    <input type="radio" id="other" name="tip-percentage" />
                    <input type="text" name="other" />
                </fieldset>
                <label htmlFor="group-size">Number of People</label>
                <input type="text" name="group-size" />
            </form>
        </>
    )
}

export default BillForm