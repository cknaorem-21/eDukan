
const QuantityPicker = ({quantity, setQuantity, product}) => {
  // quantity - input field out-of-focus handling
  const handleInputOnBlur = () => {
    const newQuantity = isNaN(quantity) || quantity <= 0 ? 1 : quantity 
    setQuantity(newQuantity);
  }

  // handling quantity
  const handleQuantity = (e) => {
    const name = e.target.name

    
    if(name === 'input') {
      if(e.target.value === '') {
        setQuantity('')
      } else {
        setQuantity(Number(e.target.value))
      }
    }
    // decrement button
    else if(name === 'decrement') { 
      if(quantity > 1)
        setQuantity((prev) => Number(prev-1))
      else {
        console.log('Minimum order quantity is 1 unit');
      }
    }
    // increment button
    else {
      if(quantity < product.countInStock)
        setQuantity((prev) => Number(prev+1))
      else {
        console.log("maximum stock limit excedded");
      }
    }
  }

  return (
    <>
        <div className="px-2 inline">
            <button name="decrement" className="w-8 bg-gray-100 border active:bg-gray-200" onClick={handleQuantity}>-</button>
            <input name="input" className="w-10 border text-center" type="text" min="1" value={isNaN(quantity) || quantity <= 0 ? '' : quantity} onChange={handleQuantity} onBlur={handleInputOnBlur}/>
            <button name="increment" className="w-8 bg-gray-100 border active:bg-gray-200" onClick={handleQuantity}>+</button>
        </div>
    </>
  )
}

export default QuantityPicker