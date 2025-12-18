

export const currencyFormatter = (value:number)=>{

    const result = value.toLocaleString('en-EN',{
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})
    return result;
}