import './SelectColor.css';

function SelectColor({colors}) {
  return (
   <div className='select-camp'>
    <label htmlFor="select-color"> Seleccione el Color:</label>
     <select id='select-color'>
      {colors.map(color=><OptionColor  key={color.name} color={color}/>)}
    </select>
   </div>
  )
}


function OptionColor({color}){
    return (
    <option value={color.value}>
        {color.name}
    </option>)
}

export default SelectColor
